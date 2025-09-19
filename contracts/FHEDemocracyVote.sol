// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract FHEDemocracyVote is SepoliaConfig {
    using FHE for *;
    
    struct Proposal {
        euint32 proposalId;
        string title;
        string description;
        euint32 yesVotes;
        euint32 noVotes;
        euint32 abstainVotes;
        euint32 totalVotes;
        bool isActive;
        bool isPassed;
        address proposer;
        uint256 startTime;
        uint256 endTime;
        uint256 quorumThreshold;
    }
    
    struct Vote {
        euint32 voteId;
        euint32 proposalId;
        euint8 voteChoice; // 1 = Yes, 2 = No, 3 = Abstain
        address voter;
        uint256 timestamp;
    }
    
    struct Voter {
        euint32 votingPower;
        bool hasVoted;
        address voterAddress;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => Vote) public votes;
    mapping(address => Voter) public voters;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    
    uint256 public proposalCounter;
    uint256 public voteCounter;
    
    address public owner;
    address public verifier;
    euint32 public totalVotingPower;
    
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCast(uint256 indexed voteId, uint256 indexed proposalId, address indexed voter);
    event ProposalPassed(uint256 indexed proposalId, bool passed);
    event VoterRegistered(address indexed voter, uint32 votingPower);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createProposal(
        string memory _title,
        string memory _description,
        uint256 _duration,
        uint256 _quorumThreshold
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Proposal title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        require(_quorumThreshold > 0 && _quorumThreshold <= 100, "Invalid quorum threshold");
        
        uint256 proposalId = proposalCounter++;
        
        proposals[proposalId] = Proposal({
            proposalId: FHE.asEuint32(0), // Will be set properly later
            title: _title,
            description: _description,
            yesVotes: FHE.asEuint32(0),
            noVotes: FHE.asEuint32(0),
            abstainVotes: FHE.asEuint32(0),
            totalVotes: FHE.asEuint32(0),
            isActive: true,
            isPassed: false,
            proposer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            quorumThreshold: _quorumThreshold
        });
        
        emit ProposalCreated(proposalId, msg.sender, _title);
        return proposalId;
    }
    
    function castVote(
        uint256 proposalId,
        externalEuint8 voteChoice,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp <= proposals[proposalId].endTime, "Voting period has ended");
        require(!hasVoted[msg.sender][proposalId], "Already voted on this proposal");
        require(voters[msg.sender].voterAddress != address(0), "Voter not registered");
        
        uint256 voteId = voteCounter++;
        
        // Convert externalEuint8 to euint8 using FHE.fromExternal
        euint8 internalVoteChoice = FHE.fromExternal(voteChoice, inputProof);
        
        votes[voteId] = Vote({
            voteId: FHE.asEuint32(0), // Will be set properly later
            proposalId: FHE.asEuint32(0), // Will be set properly later
            voteChoice: internalVoteChoice,
            voter: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update proposal vote counts based on choice
        euint8 yesChoice = FHE.asEuint8(1);
        euint8 noChoice = FHE.asEuint8(2);
        euint8 abstainChoice = FHE.asEuint8(3);
        
        // Check if vote is Yes
        ebool isYes = FHE.eq(internalVoteChoice, yesChoice);
        ebool isNo = FHE.eq(internalVoteChoice, noChoice);
        ebool isAbstain = FHE.eq(internalVoteChoice, abstainChoice);
        
        // Add voting power to respective counts
        proposals[proposalId].yesVotes = FHE.add(
            proposals[proposalId].yesVotes,
            FHE.select(isYes, voters[msg.sender].votingPower, FHE.asEuint32(0))
        );
        
        proposals[proposalId].noVotes = FHE.add(
            proposals[proposalId].noVotes,
            FHE.select(isNo, voters[msg.sender].votingPower, FHE.asEuint32(0))
        );
        
        proposals[proposalId].abstainVotes = FHE.add(
            proposals[proposalId].abstainVotes,
            FHE.select(isAbstain, voters[msg.sender].votingPower, FHE.asEuint32(0))
        );
        
        // Update total votes
        proposals[proposalId].totalVotes = FHE.add(
            proposals[proposalId].totalVotes,
            voters[msg.sender].votingPower
        );
        
        hasVoted[msg.sender][proposalId] = true;
        
        emit VoteCast(voteId, proposalId, msg.sender);
        return voteId;
    }
    
    function registerVoter(
        address voter,
        externalEuint32 votingPower,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can register voters");
        require(voter != address(0), "Invalid voter address");
        require(voters[voter].voterAddress == address(0), "Voter already registered");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalVotingPower = FHE.fromExternal(votingPower, inputProof);
        
        voters[voter] = Voter({
            votingPower: internalVotingPower,
            hasVoted: false,
            voterAddress: voter
        });
        
        // Update total voting power
        totalVotingPower = FHE.add(totalVotingPower, internalVotingPower);
        
        emit VoterRegistered(voter, 0); // FHE.decrypt(internalVotingPower) - will be decrypted off-chain
    }
    
    function finalizeProposal(uint256 proposalId) public {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp > proposals[proposalId].endTime, "Voting period not ended");
        
        // Check if proposal passed (this would need to be decrypted off-chain)
        // For now, we'll set a simple condition
        proposals[proposalId].isActive = false;
        proposals[proposalId].isPassed = true; // This should be determined by FHE operations
        
        emit ProposalPassed(proposalId, true);
    }
    
    function getProposalInfo(uint256 proposalId) public view returns (
        string memory title,
        string memory description,
        uint8 yesVotes,
        uint8 noVotes,
        uint8 abstainVotes,
        uint8 totalVotes,
        bool isActive,
        bool isPassed,
        address proposer,
        uint256 startTime,
        uint256 endTime,
        uint256 quorumThreshold
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.title,
            proposal.description,
            0, // FHE.decrypt(proposal.yesVotes) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.noVotes) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.abstainVotes) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.totalVotes) - will be decrypted off-chain
            proposal.isActive,
            proposal.isPassed,
            proposal.proposer,
            proposal.startTime,
            proposal.endTime,
            proposal.quorumThreshold
        );
    }
    
    function getVoteInfo(uint256 voteId) public view returns (
        uint8 voteChoice,
        address voter,
        uint256 timestamp
    ) {
        Vote storage vote = votes[voteId];
        return (
            0, // FHE.decrypt(vote.voteChoice) - will be decrypted off-chain
            vote.voter,
            vote.timestamp
        );
    }
    
    function getVoterInfo(address voter) public view returns (
        uint8 votingPower,
        bool hasVoted
    ) {
        Voter storage voterInfo = voters[voter];
        return (
            0, // FHE.decrypt(voterInfo.votingPower) - will be decrypted off-chain
            voterInfo.hasVoted
        );
    }
    
    function getTotalVotingPower() public view returns (uint8) {
        return 0; // FHE.decrypt(totalVotingPower) - will be decrypted off-chain
    }
    
    // Emergency functions
    function emergencyPause() public {
        require(msg.sender == owner, "Only owner can pause");
        // Implementation for emergency pause
    }
    
    function emergencyUnpause() public {
        require(msg.sender == owner, "Only owner can unpause");
        // Implementation for emergency unpause
    }
    
    function updateVerifier(address newVerifier) public {
        require(msg.sender == owner, "Only owner can update verifier");
        verifier = newVerifier;
    }
}

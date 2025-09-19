import { useState, useCallback } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { toast } from '@/hooks/use-toast';

// Contract ABI for FHE Democracy Vote
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"},
      {"internalType": "uint256", "name": "_quorumThreshold", "type": "uint256"}
    ],
    "name": "createProposal",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "proposalId", "type": "uint256"},
      {"internalType": "uint8", "name": "voteChoice", "type": "uint8"}
    ],
    "name": "castVote",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "proposalId", "type": "uint256"}],
    "name": "getProposalInfo",
    "outputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint8", "name": "yesVotes", "type": "uint8"},
      {"internalType": "uint8", "name": "noVotes", "type": "uint8"},
      {"internalType": "uint8", "name": "abstainVotes", "type": "uint8"},
      {"internalType": "uint8", "name": "totalVotes", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isPassed", "type": "bool"},
      {"internalType": "address", "name": "proposer", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"},
      {"internalType": "uint256", "name": "quorumThreshold", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "proposalId", "type": "uint256"}],
    "name": "finalizeProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// Contract address (you'll need to deploy and update this)
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual deployed address

export const useContract = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending, error } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);

  // Create a new proposal
  const createProposal = useCallback(async (
    title: string,
    description: string,
    duration: number, // in seconds
    quorumThreshold: number // percentage
  ) => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to create proposals",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate FHE encryption of proposal data
      const encryptedTitle = await encryptData(title);
      const encryptedDescription = await encryptData(description);
      
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createProposal',
        args: [encryptedTitle, encryptedDescription, duration, quorumThreshold],
      });

      toast({
        title: "Proposal Created",
        description: "Your proposal has been encrypted and submitted to the blockchain",
      });

      return hash;
    } catch (error) {
      console.error('Error creating proposal:', error);
      toast({
        title: "Proposal Creation Failed",
        description: "Please try again or check your wallet connection",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, address, writeContract]);

  // Cast a vote on a proposal
  const castVote = useCallback(async (
    proposalId: number,
    voteChoice: number // 1 = Yes, 2 = No, 3 = Abstain
  ) => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to vote",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate FHE encryption of vote
      const encryptedVote = await encryptVote(voteChoice);
      
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'castVote',
        args: [proposalId, encryptedVote],
      });

      toast({
        title: "Vote Cast Successfully",
        description: "Your encrypted vote has been submitted to the blockchain",
      });

      return hash;
    } catch (error) {
      console.error('Error casting vote:', error);
      toast({
        title: "Vote Failed",
        description: "Please try again or check your wallet connection",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, address, writeContract]);

  // Finalize a proposal
  const finalizeProposal = useCallback(async (proposalId: number) => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to finalize proposals",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'finalizeProposal',
        args: [proposalId],
      });

      toast({
        title: "Proposal Finalized",
        description: "The proposal has been finalized and results are now available",
      });

      return hash;
    } catch (error) {
      console.error('Error finalizing proposal:', error);
      toast({
        title: "Finalization Failed",
        description: "Please try again or check your wallet connection",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, address, writeContract]);

  return {
    createProposal,
    castVote,
    finalizeProposal,
    isLoading: isLoading || isPending,
    isConnected,
    address,
    error,
  };
};

// Simulate FHE encryption functions
const encryptData = async (data: string): Promise<string> => {
  // In a real implementation, this would use FHE encryption
  // For now, we'll simulate with base64 encoding
  return btoa(data);
};

const encryptVote = async (vote: number): Promise<number> => {
  // In a real implementation, this would use FHE encryption
  // For now, we'll simulate with a simple transformation
  return vote * 7 + 13; // Simple obfuscation
};

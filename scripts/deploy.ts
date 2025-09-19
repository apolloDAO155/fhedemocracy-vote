import { ethers } from "hardhat";

async function main() {
  console.log("Deploying FHEDemocracyVote contract...");

  // Get the contract factory
  const FHEDemocracyVote = await ethers.getContractFactory("FHEDemocracyVote");

  // Deploy the contract with a verifier address (you can change this)
  const verifierAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual verifier address
  
  const fheDemocracyVote = await FHEDemocracyVote.deploy(verifierAddress);

  await fheDemocracyVote.waitForDeployment();

  const contractAddress = await fheDemocracyVote.getAddress();
  
  console.log("FHEDemocracyVote deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifierAddress,
    network: "sepolia",
    timestamp: new Date().toISOString(),
  };
  
  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

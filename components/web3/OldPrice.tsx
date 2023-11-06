import React from "react";
import { useGetUserData } from "../../web3/dutch-auction/use-get-user-data";
import { useAccount } from "wagmi";
import { ethers } from "ethers"; // Make sure to have ethers installed

const OldPrice = () => {
  const { address } = useAccount();
  const userData = useGetUserData(address);

  // If userData or address is undefined, it means the data is still being fetched or there was an error
  if (!userData || !address) {
    return <div>Loading...</div>;
  }

  // Convert Gwei to Ether and round to two decimal places
  const contributionInEther = parseFloat(
    ethers.formatUnits(userData.contribution, "ether")
  ).toFixed(2);

  // Display the user's data
  return (
    <div>
      <p>{contributionInEther} ETH</p>
    </div>
  );
};

export default OldPrice;

import React from "react";
import { useGetUserData } from "../../web3/dutch-auction/use-get-user-data";
import { useAccount } from "wagmi";
import { ethers } from "ethers"; // Make sure to have ethers installed

const NftBuy = () => {
  const { address } = useAccount();
  const userData = useGetUserData(address);

  if (!userData || !address) {
    return <div>Loading...</div>;
  }

  const contributionInEther = ethers.formatUnits(
    userData.contribution,
    "ether"
  );

  return (
    <div>
      <p>{userData.tokensBidded} NFTs</p>
    </div>
  );
};

export default NftBuy;

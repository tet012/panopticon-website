import React from "react";
import { useGetUserData } from "../../web3/dutch-auction/use-get-user-data";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";

const NftBuy = () => {
  const { address } = useAccount();
  const userData = useGetUserData(address);

  if (!userData || !address) {
    return <div>Loading...</div>;
  }

  const contributionInEther = formatUnits(userData.contribution, 18);

  return (
    <div>
      <p>{userData.tokensBidded} NFTs</p>
    </div>
  );
};

export default NftBuy;

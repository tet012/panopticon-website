import React from "react";
import { useGetUserData } from "../../../web3/dutch-auction/use-get-user-data";
import { useAccount } from "wagmi";

const NftBuy = () => {
  const { address } = useAccount();

  // Use a fallback address of 0x0 if address is undefined
  const effectiveAddress =
    address || "0x0000000000000000000000000000000000000000";
  const userData = useGetUserData(effectiveAddress);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{userData.tokensBidded} NFTs</p>
    </div>
  );
};

export default NftBuy;

import React from "react";
import { useGetUserData } from "../../web3/dutch-auction/use-get-user-data";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";

const OldPrice = () => {
  const { address } = useAccount();
  const effectiveAddress =
    address || "0x0000000000000000000000000000000000000000";
  const userData = useGetUserData(effectiveAddress);

  // If userData or address is undefined, it means the data is still being fetched or there was an error
  if (!userData || !address) {
    return <div>Loading...</div>;
  }

  // Convert Gwei to Ether and round to two decimal places
  const contributionInEther = parseFloat(
    formatUnits(userData.contribution, 18)
  ).toFixed(3);

  // Display the user's data
  return (
    <div>
      <p>{contributionInEther} ETH</p>
    </div>
  );
};

export default OldPrice;

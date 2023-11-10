import React from "react";
import { useGetUserData } from "../../web3/dutch-auction/use-get-user-data";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";

const UserComponent = () => {
  const { address } = useAccount();
  const effectiveAddress =
    address || "0x0000000000000000000000000000000000000000";
  const userData = useGetUserData(effectiveAddress);

  // If userData or address is undefined, it means the data is still being fetched or there was an error
  if (!userData || !address) {
    return <div>Loading...</div>;
  }

  // Convert Gwei to Ether
  const contributionInEther = formatUnits(userData.contribution, 18);

  // Display the user's data
  return (
    <div>
      <h2>User Data:</h2>
      <p>Contribution: {contributionInEther} ETH</p>
      <p>Tokens Bidded: {userData.tokensBidded}</p>
      <p>Tokens Bidded With Discount: {userData.tokensBiddedWithDiscount}</p>
      <p>Refund Claimed: {userData.refundClaimed ? "Yes" : "No"}</p>
    </div>
  );
};

export default UserComponent;

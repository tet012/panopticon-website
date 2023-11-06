import React from "react";
import { useGetUserData } from "../../web3/dutch-auction/use-get-user-data";
import { useCurrentPrice } from "../../web3/dutch-auction/use-get-current-price";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const CurrentRebate = () => {
  const { address } = useAccount();
  const {
    price: currentPrice,
    loading: loadingPrice,
    error: errorPrice,
  } = useCurrentPrice();
  const userData = useGetUserData(address);

  if (!userData || !address || loadingPrice || errorPrice) {
    return <div>Loading...</div>;
  }

  // Convert contribution from Gwei to Ether and round to two decimal places
  const contributionInEther = parseFloat(
    ethers.formatUnits(userData.contribution, "ether")
  ).toFixed(2);
  const initialQuantity = userData.tokensBidded;
  const initialTotalCost = parseFloat(contributionInEther); // Assuming this is the total cost at the initial price
  const currentTotalCost = initialQuantity * parseFloat(currentPrice);

  // Calculate the rebate
  const rebate = initialTotalCost - currentTotalCost;

  return (
    <div>
      <p className="font-semibold">{rebate.toFixed(2)} ETH</p>
    </div>
  );
};

export default CurrentRebate;

import React from "react";
import { useGetUserData } from "../../web3/dutch-auction/use-get-user-data";
import { useCurrentPrice } from "../../web3/dutch-auction/use-get-current-price";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";

const NFTsMintable = () => {
  const { address } = useAccount();
  const effectiveAddress =
    address || "0x0000000000000000000000000000000000000000";
  const {
    price: currentPrice,
    loading: loadingPrice,
    error: errorPrice,
  } = useCurrentPrice();
  const userData = useGetUserData(effectiveAddress);

  // Make sure we have all necessary data before proceeding
  if (
    !userData ||
    !address ||
    loadingPrice ||
    errorPrice ||
    currentPrice === undefined
  ) {
    return <div>Loading...</div>;
  }

  // Convert contribution from Gwei to Ether and round to two decimal places
  const contributionInEther = parseFloat(
    formatUnits(userData.contribution, 18)
  ).toFixed(3);
  const initialQuantity = userData.tokensBidded;
  const initialTotalCost = parseFloat(contributionInEther); // Assuming this is the total cost at the initial price
  const currentTotalCost = initialQuantity * parseFloat(currentPrice);

  // Calculate the rebate
  const rebate = initialTotalCost - currentTotalCost;

  // Calculate the number of NFTs mintable with the current rebate and round down to the nearest integer
  const nftsMintable = Math.floor(rebate / parseFloat(currentPrice));

  return (
    <div>
      <p className="font-semibold">Up to {nftsMintable} NFTs</p>
    </div>
  );
};

export default NFTsMintable;
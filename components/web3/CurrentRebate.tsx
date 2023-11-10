import React, { useEffect, useState } from "react";
import { useBlockNumber } from "wagmi";
import { useGetUserData } from "../../web3/dutch-auction/use-get-user-data";
import { useCurrentPrice } from "../../web3/dutch-auction/use-get-current-price";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";

const CurrentRebate = () => {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber({
    watch: true,
  });

  const [rebate, setRebate] = useState(0);

  const {
    price: currentPrice,
    loading: loadingPrice,
    error: errorPrice,
  } = useCurrentPrice();

  const effectiveAddress =
    address || "0x0000000000000000000000000000000000000000";
  const userData = useGetUserData(effectiveAddress);

  useEffect(() => {
    if (
      !userData ||
      !address ||
      loadingPrice ||
      errorPrice ||
      currentPrice === undefined
    ) {
      return;
    }

    // Convert contribution from Gwei to Ether and round to two decimal places
    const contributionInEther = parseFloat(
      formatUnits(userData.contribution, 18)
    ).toFixed(3);
    const initialQuantity = userData.tokensBidded;
    const initialTotalCost = parseFloat(contributionInEther); // Assuming this is the total cost at the initial price
    const currentTotalCost = initialQuantity * parseFloat(currentPrice);

    // Calculate the rebate
    const newRebate = initialTotalCost - currentTotalCost;

    setRebate(newRebate);
  }, [address, userData, currentPrice, loadingPrice, errorPrice, blockNumber]);

  if (loadingPrice || errorPrice) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className="font-semibold">{rebate.toFixed(2)} ETH</p>
    </div>
  );
};

export default CurrentRebate;

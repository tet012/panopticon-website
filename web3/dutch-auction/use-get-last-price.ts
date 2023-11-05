import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { abi } from "./abi";

const WEI_PER_ETHER = BigInt(10 ** 18);

const useGetLastPrice = () => {
  const {
    data: contractReadData,
    refetch: refetchContractRead,
    isIdle: contractReadIsIdle,
  } = useContractRead({
    address: process.env
      .NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "getSettledPriceInWei",
    enabled: true, // Disable automatic fetching
  });

  const request = async () => {
    await refetchContractRead();
    if (contractReadIsIdle || !contractReadData) return BigInt(0);
    const priceInWei = contractReadData.toString();
    const price = BigInt(priceInWei);
    setLastPriceInWei(priceInWei);

    if (price === BigInt(0)) return BigInt(0);
    return price;
  };

  const {
    data: price,
    status,
    refetch,
  } = useQuery(["last-price"], request, {
    enabled: Boolean(contractReadData),
    cacheTime: 0,
  });
  const [lastPrice, setLastPrice] = useState("0");
  const [lastPriceInWei, setLastPriceInWei] = useState("0");

  useEffect(() => {
    if (!price) return;
    // Simple conversion from Wei to Ether by dividing by 10^18
    setLastPrice((price / WEI_PER_ETHER).toString());
  }, [price]);

  return {
    lastPrice,
    lastPriceBN: price ?? BigInt(0),
    lastPriceInWei,
    status,
    refetch,
  };
};

export default useGetLastPrice;

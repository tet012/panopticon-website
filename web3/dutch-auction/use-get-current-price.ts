import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { abi } from "./abi";

export const useCurrentPrice = () => {
  const [price, setPrice] = useState<string>();
  const [priceInWei, setPriceInWei] = useState<BigInt>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const contractRead = useContractRead({
    address: process.env
      .NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "getCurrentPriceInWei",
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || '1'),
    watch: true // Refresh automatically on incoming block
  });

  useEffect(() => {
    if (contractRead.data) {
      const priceInWeiString = BigInt(contractRead.data.toString())
        .toString()
        .padStart(19, "0");
      const priceWithDecimal =
        priceInWeiString.slice(0, -18) + "." + priceInWeiString.slice(-18, -15);
      setPrice(priceWithDecimal);
      setPriceInWei(BigInt(contractRead.data.toString()));
      setLoading(false);
    } else if(!contractRead.error) {
      setPrice("0");
      setPriceInWei(BigInt(0));
      setLoading(false);
    }

    if (contractRead.error) {
      setError(contractRead.error);
      setLoading(false);
    }
  }, [contractRead.data, contractRead.error]);

  return { price, priceInWei, loading, error };
};

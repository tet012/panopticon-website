import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { abi } from "./abi";

export const useCurrentPrice = () => {
  const [price, setPrice] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const contractRead = useContractRead({
    address: process.env
      .NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "getCurrentPriceInWei",
  });

  useEffect(() => {
    if (contractRead.data) {
      console.log("Data received from contract read:", contractRead.data);
      const priceInWeiString = BigInt(contractRead.data.toString())
        .toString()
        .padStart(19, "0");
      const priceWithDecimal =
        priceInWeiString.slice(0, -18) + "." + priceInWeiString.slice(-18, -16);
      setPrice(priceWithDecimal);
      setLoading(false);
    }

    if (contractRead.error) {
      console.error("Error fetching data:", contractRead.error);
      setError(contractRead.error);
      setLoading(false);
    }
  }, [contractRead.data, contractRead.error]);

  return { price, loading, error };
};

import { useEffect, useState } from "react";
import { getContract } from "wagmi/actions";
import { usePublicClient } from "wagmi";
import { abi } from "./abi";

type Bid = {
  user: string;
  qty: number;
  price: number;
  withDiscount: boolean;
};

export const useBidEvent = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const provider = usePublicClient();
  const contract = getContract({
    address: process.env
      .NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
  });

  useEffect(() => {
    const onBid = (
      user: string,
      qty: number,
      price: number,
      withDiscount: boolean
    ) => {
      setBids((currentBids) => [
        ...currentBids,
        { user, qty, price, withDiscount },
      ]);
    };
  }, [contract, provider]);

  return bids;
};

import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { panopticonAbi } from "../../../web3/panopticon/panopticon-abi";

const Minted: React.FC = () => {
  const [minted, setMinted] = useState<string>();

  const contractRead = useContractRead({
    address: process.env
      .NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS as `0x${string}`,
    abi: panopticonAbi,
    functionName: "nextTokenId",
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || "1"),
    watch: true, // Refresh automatically on incoming block
  });

  useEffect(() => {
    if (contractRead.data) {
      setMinted(contractRead.data.toString());
    }

    if (contractRead.isError) {
      console.error("Error fetching data:", contractRead.isError);
    }
  }, [contractRead.data, contractRead.isError]);

  // Handle loading state
  if (contractRead.isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (contractRead.isError) {
    return <div>Error fetching data</div>;
  }

  // Display the contract data
  return (
    <div>
      <p className="font-semibold">{minted}</p>
    </div>
  );
};

export default Minted;

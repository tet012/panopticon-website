import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { abi } from "../../web3/panopticon/abi";

const MaxSupply: React.FC = () => {
  const [maxSupply, setMaxSupply] = useState<string>();

  const contractRead = useContractRead({
    address: process.env.NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: 'maxSupply',
  });

  useEffect(() => {
    if (contractRead.data) {
      console.log("Data received from contract read:", contractRead.data);
      setMaxSupply(contractRead.data.toString());
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
      <p className="font-semibold">{maxSupply}</p>
    </div>
  );
};

export default MaxSupply;

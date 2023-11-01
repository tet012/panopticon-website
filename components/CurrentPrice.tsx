import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { abi2 } from "../contract-abi-2";

const Price: React.FC = () => {
  const [price, setContractData] = useState<string>();

  const contractRead = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_2 as `0x${string}`,
    abi: abi2,
    functionName: 'getCurrentPriceInWei',
    enabled: true,
  });

  useEffect(() => {
    if (contractRead.data) {
      console.log("Data received from contract read:", contractRead.data);
      const priceInWeiString = BigInt(contractRead.data.toString()).toString().padStart(19, '0');
      const priceWithDecimal = 
        priceInWeiString.slice(0, -18) + "." + priceInWeiString.slice(-18, -16);
      setContractData(priceWithDecimal);
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
    return <div>Loading...</div>;
  }

  // Display the contract data
  return (
    <div className='flex justify-between w-full'>
      <p>Current Price</p>
      <p className="font-semibold">{price} ETH</p>
    </div>
  );
};

export default Price;

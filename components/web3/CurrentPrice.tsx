import React from "react";
import { useCurrentPrice } from "../../web3/dutch-auction/use-get-current-price";

const Price: React.FC = () => {
  const { price, priceInWei, loading, error } = useCurrentPrice();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div title={error.toString()}>Error fetching data</div>;
  }

  return (
    <div className="flex gap-2">
      <p className="font-semibold break-keep">
        {price}
      </p>
      <p className="font-semibold break-keep">
        ETH
      </p>
    </div>
  );
};

export default Price;

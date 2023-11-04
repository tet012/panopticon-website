import React from 'react';
import { useCurrentPrice } from '../../web3/dutch-auction/use-get-current-price';

const Price: React.FC = () => {
  const { price, loading, error } = useCurrentPrice();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <p className="flex font-semibold break-keep">{price}</p>
  );
};

export default Price;

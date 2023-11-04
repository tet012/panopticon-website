// import { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
// import { abi } from "./abi";

// export const useBidEvent = () => {
//   const [bids, setBids] = useState([]);

//   useEffect(() => {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const contract = new ethers.Contract(process.env.NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS, abi, provider);
    
//     const onBid = (user, qty, price, withDiscount) => {
//       setBids(currentBids => [...currentBids, { user, qty, price, withDiscount }]);
//     };

//     contract.on('Bid', onBid);

//     // Cleanup listener when the component is unmounted
//     return () => {
//       contract.off('Bid', onBid);
//     };
//   }, []);

//   return bids;
// };

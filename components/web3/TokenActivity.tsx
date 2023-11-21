import React from "react";
import { useGetNftHistory } from "../../web3/global/use-get-nft-history";
import Link from "next/link";

interface TokenActivityProps {
  tokenId: bigint;
  contractAddress: 0xa1a657de1f522f15a7336942145fa3c5432dd44e;
}

const TokenActivity: React.FC<TokenActivityProps> = ({
  tokenId,
  contractAddress,
}) => {
  const { history, loading, error } = useGetNftHistory(
    tokenId,
    contractAddress
  );

  if (loading) return <div>Loading transaction history...</div>;
  if (error) return <div>Error fetching transaction history.</div>;

  return (
    <div>
      <h2>Transaction History</h2>
      {Array.isArray(history) && history.length > 0 ? (
        history.map((tx, index) => (
          <div key={index} className="transaction-details">
            <p>
              Transaction Hash:{" "}
              <Link href={`https://etherscan.io/tx/${tx.hash}`}>
                <p>{tx.hash}</p>
              </Link>
            </p>
            <p>From: {tx.from}</p>
            <p>To: {tx.to}</p>
            <p>Type: {tx.method}</p>
            {/* Add any other relevant details */}
          </div>
        ))
      ) : (
        <div>No transaction history available.</div>
      )}
    </div>
  );
};

export default TokenActivity;

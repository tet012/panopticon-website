import React, { useEffect, useState, useCallback } from "react";
import { useGetTokenUri } from "../web3/panopticon/use-get-token-uri";

const TOTAL_NFTS = 600;

const DataComp = () => {
  const [currentTokenId, setCurrentTokenId] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { tokenData, error, loading } = useGetTokenUri(BigInt(currentTokenId));

  const processNextToken = useCallback(async () => {
    if (isProcessing || currentTokenId >= TOTAL_NFTS) {
      return;
    }

    if (tokenData && !loading && !error) {
      setIsProcessing(true);
      try {
        console.log("Sending data to backend for token ID:", currentTokenId);
        const response = await fetch("/api/saveTokenData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tokenData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        console.log("Response from backend:", responseData);

        setCurrentTokenId((prevId) => prevId + 1);
      } catch (error) {
        console.error("Error sending data to backend:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  }, [tokenData, loading, error, currentTokenId, isProcessing]);

  useEffect(() => {
    processNextToken();
  }, [processNextToken]);

  if (loading) return <div>Loading data for token ID: {currentTokenId}...</div>;
  if (error)
    return <div>Error fetching data for token ID: {currentTokenId}</div>;
  if (currentTokenId >= TOTAL_NFTS) return <div>All NFT data processed.</div>;

  return (
    <div>
      <p>Processing data for token ID: {currentTokenId}</p>
    </div>
  );
};

export default DataComp;

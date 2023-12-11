import React, { useEffect, useState } from "react";
import { useGetHtml } from "../../../web3/panopticon/use-get-html";

interface TokenDisplayProps {
  tokenId: bigint;
  collectionId: string;
}

const TokenHtml: React.FC<TokenDisplayProps> = ({ tokenId, collectionId }) => {
  const { html } = useGetHtml(tokenId);
  const [srcDoc, setSrcDoc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (html) {
      setSrcDoc(html);
    }
  }, [html]);

  if (!srcDoc) {
    return (
      <div className="w-[600px] max-md:max-w-xs aspect-[3/4]">Loading...</div>
    ); // Display this if no HTML content is available
  }

  return (
    <div className="w-full flex justify-center items-center">
      <iframe
        className="w-full max-w-2xl max-md:max-w-full aspect-[3/4] rounded-xl shadow-2xl"
        srcDoc={srcDoc}
        title={`${collectionId} ${tokenId}`}
      />
    </div>
  );
};

export default TokenHtml;

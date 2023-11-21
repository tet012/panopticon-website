import React, { useEffect, useState } from "react";
import { useGetHtml } from "../../../web3/panopticon/use-get-html";

interface TokenDisplayProps {
  tokenId: bigint;
}

const TokenHtml: React.FC<TokenDisplayProps> = ({ tokenId }) => {
  const { html } = useGetHtml(tokenId);
  const [srcDoc, setSrcDoc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (html) {
      setSrcDoc(html);
    }
  }, [html]);

  return (
    <div className="bg-neutral-50 flex justify-center items-center">
      <iframe srcDoc={srcDoc || ""} title="NFT Display" />
    </div>
  );
};

export default TokenHtml;

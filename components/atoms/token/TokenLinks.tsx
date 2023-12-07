import React from "react";
import Link from "next/link";
import CollectionUrls from "../collection/CollectionUrls";
import Image from "next/image";

interface TokenLinksProps {
  tokenId: bigint;
  collectionId: string;
}

const TokenLinks: React.FC<TokenLinksProps> = ({ tokenId, collectionId }) => {
  // Get URLs based on collectionId and append tokenId
  const urls =
    CollectionUrls.get(collectionId) || CollectionUrls.get("default");

  const openseaUrl = urls?.opensea ? `${urls.opensea}${tokenId}` : "";
  const onChainCheckerUrl = urls?.onChainChecker
    ? `${urls.onChainChecker}${tokenId}`
    : "";
  const etherscanUrl = urls?.etherscan ? `${urls.etherscan}${tokenId}` : "";

  return (
    <div id="links" className="flex gap-2 rounded-lg align-end">
      <LinkButton
        href={openseaUrl}
        imgSrc="/img/icons/opensea-logo.svg"
        alt="Opensea"
      />
      <LinkButton
        href={onChainCheckerUrl}
        imgSrc="/img/icons/onchainchecker-logo.png"
        alt="On Chain Checker"
      />
      <LinkButton
        href={etherscanUrl}
        imgSrc="/img/icons/etherscan-logo-circle.svg"
        alt="Etherscan"
      />
    </div>
  );
};

interface LinkButtonProps {
  href: string;
  imgSrc: string;
  alt: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, imgSrc, alt }) => (
  <Link
    className="w-fit flex align-center items-middle justify-center p-4 transition hover:shadow-lg border border-neutral-300 hover:border hover:border-neutral-900 rounded-xl"
    href={href}
  >
    <Image src={imgSrc} width={20} height={20} alt={alt} />
  </Link>
);

export default TokenLinks;

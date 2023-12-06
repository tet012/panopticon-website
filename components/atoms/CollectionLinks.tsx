import React from "react";
import Link from "next/link";
import CollectionUrls from "./CollectionUrls";

interface CollectionLinksProps {
  collectionId: string;
}

interface Urls {
  opensea?: string;
  onChainChecker?: string;
  etherscanCol?: string;
}

const CollectionLinks: React.FC<CollectionLinksProps> = ({ collectionId }) => {
  const urls: Urls =
    CollectionUrls.get(collectionId) || CollectionUrls.get("default") || {};

  return (
    <div id="links" className="flex gap-2 rounded-lg align-end">
      {urls.opensea && (
        <LinkButton
          href={urls.opensea}
          imgSrc="/img/icons/opensea-logo.svg"
          alt="Opensea"
        />
      )}
      {urls.onChainChecker && (
        <LinkButton
          href={urls.onChainChecker}
          imgSrc="/img/icons/onchainchecker-logo.png"
          alt="On Chain Checker"
        />
      )}
      {urls.etherscanCol && (
        <LinkButton
          href={urls.etherscanCol}
          imgSrc="/img/icons/etherscan-logo-circle.svg"
          alt="Etherscan"
        />
      )}
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
    <img src={imgSrc} width="20px" height="20px" alt={alt} />
  </Link>
);

export default CollectionLinks;

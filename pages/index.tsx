import React, { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import CollectionInfo from "../components/atoms/collection/CollectionInfo";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Panopticon by Teto</title>
        <meta
          name="description"
          content="A generative art collection exploring our relationship with technology."
        />
        <meta property="og:title" content="Panopticon by Teto" />
        <meta
          property="og:description"
          content="A generative art collection exploring our relationship with technology."
        />
        <meta property="og:image" content="/img/web-img.jpg" />
      </Head>

      <div className="m-auto flex flex-col ">
        <div className="m-auto flex w-full flex-col items-center">
          {CollectionInfo.map((collection) => (
            <CollectionLink key={collection.name} collection={collection} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CollectionLinkProps {
  collection: {
    link: string;
    images: {
      extra: string;
    };
    name: string;
  };
}

const CollectionLink: React.FC<CollectionLinkProps> = ({ collection }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="flex flex-col w-full gap-4">
      <Link
        href={collection.link}
        className="group relative hover:p-16 transition hover:shadow-2xl hover:text-neutral-50 max-md:text-xl text-9xl rounded-xl mb-2 p-8 w-full bg-neutral-200 transition-transform duration-300 hover:translate-y-[-10px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundImage: isHovered
            ? `url(${collection.images.extra})`
            : "none",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 50%",
        }}
      >
        <p className="group-hover:drop-shadow-lg">{collection.name}</p>
      </Link>
    </div>
  );
};

export default Home;

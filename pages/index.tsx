import React, { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";
import CollectionInfo from "../components/atoms/collection/CollectionInfo";

const Home: NextPage = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "auto", // Adjust this to maintain the image's original size
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 40%", // Adjust this as needed
      }}
    >
      <Head>
        <title>Panopticon by Teto</title>
        <meta
          name="description"
          content="A generative art collection exploring our relationship with tehcnology."
        />
        <meta property="og:title" content="Panopticon by Teto" />
        <meta
          property="og:description"
          content="A generative art collection exploring our relationship with tehcnology."
        />
        <meta property="og:image" content="/img/web-img.jpg" />
      </Head>

      <div className="m-auto flex flex-col min-h-screen align-center gap-8 items-center justify-center py-16">
        <h1 className="font-sans text-2xl">
          Hi, my name is teto, and this is my art.
        </h1>
        <div className="m-auto flex text-center w-full flex-col gap-16">
          {CollectionInfo.map((collection) => (
            <Link
              href={collection.link}
              key={collection.name}
              className="text-9xl"
              onMouseEnter={() => setBackgroundImage(collection.images.large)}
              onMouseLeave={() => setBackgroundImage("")}
            >
              <p>{collection.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

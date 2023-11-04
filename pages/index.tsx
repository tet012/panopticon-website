import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import dynamic from 'next/dynamic';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  usePrepareSendTransaction
} from "wagmi";

import { abi } from "../contract-abi";
import { abi2 } from "../contract-abi-2";
import { motion } from "framer-motion";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Timer from "../components/Timer";
import TextSection from "../components/TextSection";
import ImageGrid from "../components/ImageGrid";
import SingleImage from "../components/SingleImage";
import MintBtn from "../components/web3/mintBtn";

const CurrentPrice = dynamic(() => import('../components/web3/CurrentPrice'), {
  ssr: false,
});

const TotalMinted = dynamic(() => import('../components/web3/Supply'), {
  ssr: false,
});

const Minted = dynamic(() => import('../components/web3/Minted'), {
  ssr: false,
});

import {
  fadeInSmooth,
  AnimContDyna,
  fadeInLinear,
} from "../components/animations";
import JumboTxt from "../components/JumboTxt";
import Price from "../components/web3/CurrentPrice";

const contractConfig = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
  abi,
} as const;

const Mint: NextPage = () => {
  const [tokenCount, setTokenCount] = useState(1); 

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [totalMinted, setTotalMinted] = React.useState(0);
  const { isConnected } = useAccount();

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "testMint",
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const isMinted = txSuccess;
  
  return (
    <div>

    <p></p>

      <div id="body" className="min-h-screen bg-neutral-50 flex flex-col">
        <div
          id="cont"
          className="bg-neutral-50 max-w-7xl self-center flex flex-col"
        >

          <div className="w-full mb-8 px-4">
            <NavBar />
          </div>
          <div
            id="mainCont"
            className="flex flex-col max-md:w-full gap-8 bg-neutral-50 self-center items-center"
          >
            <motion.div
              variants={AnimContDyna}
              initial="hidden"
              animate="show"
              className="flex max-md:flex-col gap-2"
            >
              <motion.div
                variants={fadeInSmooth}
                id="mainImg"
                className="p-32 w-3/4 max-md:w-full max-md:p-16 bg-neutral-200 flex"
              >
                <motion.img
                  variants={fadeInSmooth}
                  className="shadow-2xl self-center"
                  src="img/panopticon/1.png"
                  height="100%"
                ></motion.img>
              </motion.div>

              <motion.div
                variants={fadeInSmooth}
                className="flex flex-col p-4 w-2/4 max-md:w-full gap-2"
              >
                <JumboTxt></JumboTxt>
                {/* <h1 className="text-8xl">Mint Panopticon</h1> */}
                {mintError && (
                  <p className=" p-2 text-red-800 rounded-md">
                    Error: {mintError.message}
                  </p>
                )}
                {txError && (
                  <p className="p-2 text-red-500">Error: {txError.message}</p>
                )}
                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-2"
                >
                  {/* <DutchAuctionTimer /> */}
                  <motion.div
                    variants={fadeInSmooth}
                    className="w-full h-full flex justify-between rounded-xl border rounded-lg p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
                  >
                    <p className="whitespace-nowrap">Time left</p>
                    <Timer
                      year={2023}
                      month={11}
                      day={8}
                      hour={8}
                      minute={30}
                    />
                  </motion.div>

                  <motion.div
                      variants={fadeInSmooth}
                      className="w-full h-full flex justify-around rounded-xl border rounded-lg p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
                    >
                      <p className="w-full">Current Price</p>
                      <div className="flex gap-2">
                      <CurrentPrice/>
                      <p>ETH</p>
                      </div>
                    </motion.div>

                  <motion.div
                    variants={fadeInSmooth}
                    className="w-full h-full flex justify-between rounded-xl border rounded-lg p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
                  >
                    <p className="whitespace-nowrap">Total Minted</p>
                    <div className="flex gap-2">
                    <Minted/>
                    <p>/</p>
                    <TotalMinted/>
                    </div>
                  </motion.div>
                  <div className="flex gap-2">

                  </div>
                </motion.div>
                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  animate="show"
                  id="contractDescription"
                  className="grow flex flex-col space-between justify-between border rounded-xl p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
                >
                  <motion.p variants={fadeInSmooth}>
                    Started in 2022, Panopticon is Teto&apos;s genesis long form
                    collection, a digital artist with over a decade of
                    experience as an art director for the music industry and a
                    web developer.
                  </motion.p>
                </motion.div>

                <motion.p
                    variants={fadeInSmooth}
                    className="border p-4 rounded-xl hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
                  >
                    In partnership with FingerprintsDAO
                  </motion.p>

<MintBtn/>


                {/* <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  animate="show"
                  id="mintBtn"
                  className="w-full h-auto bg-gradient-to-r animate-shiny 
bg-gradient-to-r from-green-400 to-teal-500 animate-gradient-xy rounded-2xl overflow-hid flex p-4"
                >
                  <motion.button
                    variants={fadeInSmooth}
                    disabled={!mint || isMintLoading || isMintStarted}
                                        data-mint-loading={isMintLoading}
                    data-mint-started={isMintStarted}
                    className="mint_button p-4 bg-neutral-800 whiteShadow drop-shadow-lg rounded-l-xl text-neutral-100"
                    data-mint-success={isMinted}
                    onClick={() =>
                      setTokenCount((prevCount) => Math.max(1, prevCount - 1))
                    }
                  >
                    -
                  </motion.button>
                  <motion.button
                    variants={fadeInSmooth}
                    disabled={!mint || isMintLoading || isMintStarted}
                    className="mint_button flex-1 p-4 bg-neutral-900 whiteShadow drop-shadow-md text-center text-neutral-100"
                    data-mint-loading={isMintLoading}
                    data-mint-started={isMintStarted}
                    data-mint-success={isMinted}
                    onClick={() => mint?.()}
                  >
                    {isMintLoading && "Waiting for approval"}
                    {isMintStarted && !isMinted && "Minting..."}
                    {!isMintLoading &&
                      !isMintStarted &&
                      !isMinted &&
                      `Mint ${tokenCount} tokens`}
                    {isMinted && "Thank you for minting Panopticon!"}
                  </motion.button>
                  <motion.button
                    variants={fadeInSmooth}
                    disabled={!mint || isMintLoading || isMintStarted}
                                        data-mint-loading={isMintLoading}
                    data-mint-started={isMintStarted}
                    className="mint_button p-4 bg-neutral-800 whiteShadow drop-shadow-lg rounded-r-xl text-neutral-100"
                    data-mint-success={isMinted}
                    onClick={() => setTokenCount((prevCount) => prevCount + 1)}
                  >
                    +
                  </motion.button>
                </motion.div> */}
                <motion.button
                  variants={fadeInSmooth}
                  className="p-4 w-full bg-green-500 whiteShadow drop-shadow-lg rounded-xl text-neutral-100"
                  data-mint-success={isMinted}
                  hidden={!isMinted}
                >
                  Mint with rebate
                </motion.button>
              </motion.div>
            </motion.div>

            {/* <div className="w-full flex h-full">
          <TokenRenderer tokenId={1} />
          <TokenRenderer tokenId={2} />
          <TokenRenderer tokenId={3} />
          </div> */}

            <div className="wrapper w-full flex flex-col gap-[15ch]">
              <motion.div className="flex gap-4" variants={AnimContDyna}
                  initial="hidden"
                  animate="show">               
              <motion.div
                  variants={fadeInSmooth}
                  className="grow flex flex-col space-between justify-between border rounded-xl p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
                >
                  <motion.p variants={fadeInSmooth}>
                    NFT Contract
                  </motion.p>
                </motion.div>

                <motion.div
                 variants={fadeInSmooth}
                  className="grow flex flex-col space-between justify-between border rounded-xl p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
                >
                  <motion.p variants={fadeInSmooth}>
                  Dutch Auction Contract
                  </motion.p>
                </motion.div>
                <motion.div
                 variants={fadeInSmooth}
                  className="grow flex flex-col space-between justify-between border rounded-xl p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
                >
                  <motion.p variants={fadeInSmooth}>
                  Discord
                  </motion.p>
                </motion.div>
                <motion.div
                 variants={fadeInSmooth}
                  className="grow flex flex-col space-between justify-between border rounded-xl p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
                >
                  <motion.p variants={fadeInSmooth}>
                  Twitter
                  </motion.p>
                </motion.div>
                </motion.div>
              <div>
                <p className="font-serif text-2xl mt-16 rounded text-center italic bg-neutral-300/30 p-8">
                  &quot;Innovation has become the blood of our society and
                  virtuality is our new reality.&quot;
                </p>
              </div>

              <div
                id="arg1"
                className="flex justify-between gap-32 max-md:gap-4 max-md:flex-col"
              >
                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col w-full max-md:w-auto gap-8"
                >
                  <TextSection
                    title="Origin"
                    text={
                      "Started in 2022, Panopticon is Teto's genesis long form collection, a digital artist with over a decade of experience as an art director for the music industry and a web developer. After numerous collections exploring the recurring theme of Perception in the digital age, Teto delved deeper into the human-screen relationship with this collection. Learn more"
                    }
                    textVariants={fadeInLinear}
                  />
                </motion.div>

                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col w-full max-md:w-auto gap-8"
                >
                  <ImageGrid
                    images={[
                      "img/panopticon/4.png",
                      "img/panopticon/5.png",
                      "img/panopticon/6.png",
                      "img/panopticon/7.png",
                    ]}
                    imgVariants={fadeInLinear}
                  />
                </motion.div>
              </div>

              <div
                id="arg2"
                className="flex justify-between gap-32 max-md:gap-4 max-md:flex-col max-md:flex-col-reverse"
              >
                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col w-full max-md:w-auto gap-8"
                >
                  <SingleImage
                    src="img/panopticon/8.png"
                    imgVariants={fadeInLinear}
                  />
                </motion.div>

                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col w-full max-md:w-auto gap-8"
                >
                  <TextSection
                    title="Inspiration"
                    text={
                      "Drawing inspiration from science fiction luminaries like Ray Bradbury, Alain Damasio, George Orwell, Aldous Huxley, and Isaac Asimov, Panopticon reflects the genre's core concepts:Technology will deeply transform humanity and the way humans behave with each othersVirtuality will overshadow the real world and people will mostly interact with avatars or robotsInnovation if not mastered will create even more social fracture instead of bringing people togetherVisually the collection is widely inspired by anime culture, from Paprika, Full Metal Alchemist to Akira and Evangelion, the bright colors, shapes & movement defined the global direction of Panopticon. Straying from either techno-solutionism or techno-doom, Teto navigates a middle ground, mitigating and balancing these extremes in a vibrant, dynamic, and impactful manner."
                    }
                    textVariants={fadeInLinear}
                  />
                </motion.div>
              </div>

              <div
                id="arg3"
                className="flex justify-between gap-32 max-md:gap-4 max-md:flex-col"
              >
                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col w-full max-md:w-auto gap-8"
                >
                  <TextSection
                    title="Definition"
                    text={
                      "When I started working on this collection back in October 2022 it began as it always do: with an instinct, an idea that stick to your guts. Even tho I’ve been a web developer for quite some years now, I never been really fluent in Javascript, so when I decided to throw my tablet & my pencil to grab p5.js, it was quite a jump. This year been the most profitable year of my life artisticly-wise: I grew as an artist, as a human & my field of view expanded."
                    }
                    textVariants={fadeInLinear}
                  />
                </motion.div>

                <motion.div
                  variants={AnimContDyna}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col w-full max-md:w-auto gap-8"
                >
                  <ImageGrid
                    images={[
                      "img/panopticon/9.png",
                      "img/panopticon/10.png",
                      "img/panopticon/11.png",
                      "img/panopticon/12.png",
                    ]}
                    imgVariants={fadeInLinear}
                  />
                </motion.div>
              </div>

              <div id="authors" className="flex flex-col gap-2">
                <p className="text-center"> About the authors</p>
                <div className="flex gap-2 max-md:flex-col">
                  <motion.div
                    variants={AnimContDyna}
                    initial="hidden"
                    whileInView="show"
                    className="flex gap-4 bg-neutral-100 rounded p-8 w-full"
                  >
                    <motion.img
                      alt=""
                      variants={fadeInSmooth}
                      className="rounded-full h-20 border-2 border-neutral-800 w-20"
                      src="/img/profiles/teto.jpg"
                    ></motion.img>
                    <TextSection
                      title="Teto, artist"
                      text={
                        "Mixed-media artist, natively digital, I've been creating art with computer for the past 20 years."
                      }
                      textVariants={"fadeInSmooth"}
                    />
                  </motion.div>
                  <motion.div
                    variants={AnimContDyna}
                    initial="hidden"
                    whileInView="show"
                    className="flex gap-4 bg-neutral-100 rounded p-8 w-full"
                  >
                    <motion.img
                      alt=""
                      variants={fadeInSmooth}
                      className="rounded-full h-20 border-2 border-neutral-800 w-20"
                      src="/img/profiles/fox.jpg"
                    ></motion.img>

                    <TextSection
                      title="TokenFox, contract Magician"
                      text={
                        "Creator of  http://onchainchecker.xyz. Curator and collector of on-chain NFTs. Solidity programmer."
                      }
                      textVariants={"fadeInSmooth"}
                    />
                  </motion.div>
                </div>
              </div>
              <motion.div
                id="faq"
                variants={AnimContDyna}
                initial="hidden"
                whileInView="show"
                className="flex flex-col gap-2"
              >
                                <motion.div
                  variants={fadeInSmooth}
                  id="faq1"
                  className="bg-neutral-100 p-8 rounded flex flex-col gap-2"
                >
                  <h4>Is Panopticon On-Chain</h4>
                  <p>
                  Yes. Panopticon is stored and generated on-chain using the Scripty.sol library. The thumbnail is not stored on-chain.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInSmooth}
                  id="faq1"
                  className="bg-neutral-100 p-8 rounded flex flex-col gap-2"
                >
                  <h4>Where and when is the auction?</h4>
                  <p>
                  The 60-minute Dutch auction will take place on this website on the 2nd of November at 10 am PST / 01 pm EST / 6 pm CEST. The auction will have no time extension, which will be closed forever when it reaches the 60-minute mark.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInSmooth}
                  id="faq2"
                  className="bg-neutral-100 p-8 rounded flex flex-col gap-2"
                >
                  <h4>How much does it cost to mint one?</h4>
                  <p>
                  The Dutch auction will have a starting price of 0.2 ETH, going down to 0.05 ETH during the 60-minute Dutch auction. If the whole collection mints out before 60 minutes, the final price will be equal to the last sale's price. You don't have to worry about paying a higher price, as buyers will be entitled to a rebate if the price they paid is higher than the final price. Allowlisted wallets will also be eligible for a discount.
                  {/* The rebates and discounts will be airdropped to the buyers' wallets up to 72 hours after the auction ends. */}
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInSmooth}
                  id="faq3"
                  className="bg-neutral-100 p-8 rounded flex flex-col gap-2"
                >
                  <h4>What is the collection size?</h4>
                  <p>
                  A total of 600 NFTs will be available for mint. If less than 600 NFTs are sold during the 60-minute Dutch auction, the supply will be reduced to the number of NFTs minted.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInSmooth}
                  id="faq3"
                  className="bg-neutral-100 p-8 rounded flex flex-col gap-2"
                >
                  <h4>On which chain?</h4>
                  <p>
                  Bit Rot will be launched on the Ethereum Mainnet.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Mint;

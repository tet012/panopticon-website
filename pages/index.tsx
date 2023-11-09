import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { abi } from "../contract-abi";
import { motion } from "framer-motion";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TextSection from "../components/TextSection";
import ImageGrid from "../components/ImageGrid";
import SingleImage from "../components/SingleImage";
import { generateEtherscanLinkForAddress } from "../utils/etherscan";

const MintingUI = dynamic(() => import("../components/web3/MintingUI"), {
  ssr: false,
});

const RebateInfo = dynamic(() => import("../components/web3/RebateInfo"), {
  ssr: false,
});

import {
  fadeInSmooth,
  AnimContDyna,
  fadeInLinear,
} from "../components/animations";

const contractConfig = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
  abi,
} as const;

const Mint: NextPage = () => {
  return (
    <div>
      <div id="body" className="min-h-screen bg-neutral-50 flex flex-col">
        <div
          id="hero"
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
                className="p-32 w-3/4 max-md:w-full max-md:p-16 bg-neutral-200 flex "
              >
                <motion.img
                  variants={fadeInSmooth}
                  className="shadow-2xl self-center"
                  src="img/panopticon/1.jpg"
                  height="100%"
                ></motion.img>
              </motion.div>

              <MintingUI />
            </motion.div>

            <div className="wrapper w-full flex flex-col gap-2">
              <RebateInfo />
              <motion.div
                className="flex w-full  space-between gap-2 max-md:flex-col justify-between"
                variants={AnimContDyna}
                initial="hidden"
                animate="show"
              >
                <Link
                  href={generateEtherscanLinkForAddress(process.env.NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full grow flex flex-col space-between justify-between bg-neutral-200/20 border border-neutral-300 rounded-xl p-4 hover:border-neutral-400 hover:bg-neutral-100 hover:shadow-lg"
                >
                  <motion.div variants={fadeInSmooth}>
                    <motion.p variants={fadeInSmooth}>NFT Contract</motion.p>
                    <motion.pre variants={fadeInSmooth}>
                      {process.env.NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS}
                    </motion.pre>
                  </motion.div>
                </Link>

                <Link
                  href={generateEtherscanLinkForAddress(
                    process.env.NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full grow flex flex-col space-between justify-between border bg-neutral-200/20 border-neutral-300 rounded-xl p-4 hover:border-neutral-400 hover:bg-neutral-100 hover:shadow-lg"
                >
                  <motion.div variants={fadeInSmooth}>
                    <motion.p variants={fadeInSmooth}>
                      Dutch Auction Contract
                    </motion.p>
                    <motion.pre variants={fadeInSmooth}>
                      {process.env.NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS}
                    </motion.pre>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            <div className="wrapper w-full flex flex-col gap-[15ch]">
              <motion.div
                variants={AnimContDyna}
                initial="hidden"
                animate="show"
              >
                <motion.p
                  variants={fadeInSmooth}
                  className="font-serif text-2xl mt-16 rounded text-center italic bg-neutral-300/30 p-8"
                >
                  &quot;Innovation has become the blood of our society and
                  virtuality is our new reality.&quot;
                </motion.p>
              </motion.div>

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
                      "img/panopticon/4.jpg",
                      "img/panopticon/5.jpg",
                      "img/panopticon/6.jpg",
                      "img/panopticon/7.jpg",
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
                    src="img/panopticon/8.jpg"
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
                      "Drawing inspiration from science fiction luminaries like Ray Bradbury, Alain Damasio, George Orwell, Aldous Huxley, and Isaac Asimov, Panopticon reflects the genre's core concepts:Technology will deeply transform humanity and the way humans behave with each othersVirtuality will overshadow the real world and people will mostly interact with avatars or robots. Innovation if not mastered will create even more social fracture instead of bringing people together. Visually the collection is widely inspired by anime culture, from Paprika, Full Metal Alchemist to Akira and Evangelion, the bright colors, shapes & movement defined the global direction of Panopticon. Straying from either techno-solutionism or techno-doom, Teto navigates a middle ground, mitigating and balancing these extremes in a vibrant, dynamic, and impactful manner."
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
                      "img/panopticon/9.jpg",
                      "img/panopticon/10.jpg",
                      "img/panopticon/11.jpg",
                      "img/panopticon/12.jpg",
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
                    viewport={{ once: true }}
                    whileInView="show"
                    className="flex gap-4 bg-neutral-100 rounded p-8 w-full"
                  >
                    <motion.img
                      alt=""
                      variants={fadeInSmooth}
                      viewport={{ once: true }}
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
                    viewport={{ once: true }}
                    whileInView="show"
                    className="flex gap-4 bg-neutral-100 rounded p-8 w-full"
                  >
                    <motion.img
                      alt=""
                      variants={fadeInSmooth}
                      viewport={{ once: true }}
                      className="rounded-full h-20 border-2 border-neutral-800 w-20"
                      src="/img/profiles/fox.jpg"
                    ></motion.img>

                    <TextSection
                      title="TokenFox, contract Magician"
                      text={
                        "Creator of onchainchecker.xyz. Curator and collector of on-chain NFTs. Solidity programmer."
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
                viewport={{ once: true }}
                className="flex flex-col gap-2"
              >
                <motion.div
                  variants={fadeInSmooth}
                  id="faq1"
                  className="bg-neutral-100 p-8 rounded flex flex-col gap-2"
                >
                  <h4>Is Panopticon On-Chain?</h4>
                  <p>
                    Yes. Panopticon is stored and generated on-chain. The
                    thumbnails are not stored on-chain.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInSmooth}
                  id="faq1"
                  viewport={{ once: true }}
                  className="bg-neutral-100 p-8 rounded flex flex-col gap-2"
                >
                  <h4>Where and when is the auction?</h4>
                  <p>
                    The 60-minute Dutch auction will take place on this website
                    on the 10th of November at 10 am PST / 01 pm EST / 6 pm
                    CEST. The auction will have no time extension, which will be
                    closed forever when it reaches the 60-minute mark.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInSmooth}
                  id="faq2"
                  viewport={{ once: true }}
                  className="bg-neutral-100 p-8 rounded flex flex-col gap-2"
                >
                  <h4>How much does it cost to mint one?</h4>
                  <p>
                    The Dutch auction will have a starting price of 0.2 ETH,
                    going down to 0.05 ETH during the 60-minute Dutch auction.
                    If the whole collection mints out before 60 minutes, the
                    final price will be equal to the last sale&apos;s price. You
                    don&apos;t have to worry about paying a higher price, as
                    buyers will be entitled to a rebate if the price they paid
                    is higher than the final price. Allowlisted wallets will
                    also be eligible for a discount.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInSmooth}
                  id="faq3"
                  viewport={{ once: true }}
                  className="bg-neutral-100 p-8 rounded flex flex-col gap-2"
                >
                  <h4>What is the collection size?</h4>
                  <p>
                    A total of 600 NFTs will be available for mint. If less than
                    600 NFTs are sold during the 60-minute Dutch auction, the
                    supply will be reduced to the number of NFTs minted.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInSmooth}
                  id="faq3"
                  viewport={{ once: true }}
                  className="bg-neutral-100 p-8 rounded flex flex-col gap-2"
                >
                  <h4>On which chain?</h4>
                  <p>Panopticon will be launched on the Ethereum Mainnet.</p>
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

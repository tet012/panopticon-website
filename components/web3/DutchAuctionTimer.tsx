import React from "react";
import Timer from "../Timer";
import { motion } from "framer-motion";
import { useGetConfig } from "../../web3/dutch-auction/use-get-config";
import { fadeInSmooth } from "../animations";

const DutchAuctionTimer: React.FC = () => {
  const { config, loading, error } = useGetConfig();

  // parse endtime into year, month, day, hour, minute

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div title={error.toString()}>Error fetching data</div>;
  }

  return (
    <motion.div
      variants={fadeInSmooth}
      className="w-full h-full flex justify-between rounded-xl border rounded-lg p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
    >
      <p className="whitespace-nowrap">Time left</p>
      <Timer to={config?.endTime} />
    </motion.div>
  );
};

export default DutchAuctionTimer;

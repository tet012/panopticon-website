import React from "react";
import Timer from "../Timer";
import { motion } from "framer-motion";
import { fadeInSmooth } from "../animations";

const DutchAuctionTimer: React.FC<any> = ({ auctionConfig }) => {
  const { config, error, loading } = auctionConfig;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div title={error.toString()}>Error fetching data</div>;
  }

  return (
    <motion.div
      variants={fadeInSmooth}
      className="w-full flex justify-between rounded-xl border border-neutral-300 rounded-lg p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
    >
      {config && (
        <Timer
          startTime={config.startTime}
          endTime={config.endTime}
          beforeText="Auction starting in"
          duringText="Time left"
          afterText="Auction ended"
        />
      )}
      {!config && <em>Auction not configured</em>}
    </motion.div>
  );
};

export default DutchAuctionTimer;

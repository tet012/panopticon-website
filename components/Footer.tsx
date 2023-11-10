import React from "react";

const Footer = () => (
  <div className="wrapper flex mt-32 p-8 w-full items-center space-around justify-between mb-4 max-md:flex-col max-md:gap-4">
    <div id="siteMap" className="flex gap-2">
      <a
        href="https://twitter.com/tetonotsorry"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
      <a
        href="https://instagram.com/tetonotsorry"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
    </div>

    {process.env.NEXT_PUBLIC_STARTED === "true" && (
      <a href="#hero" className="button h-fit">
        Mint Panopticon
      </a>
    )}
  </div>
);

export default Footer;

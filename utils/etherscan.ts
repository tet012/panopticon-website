const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || '1';
const etherscanUrlPrefix =
  (Number(chainId) === 1) ?
  "https://etherscan.io" :
  "https://goerli.etherscan.io";

export const generateEtherscanLinkForAddress = (contractAddress: string | undefined) => {
  if (Number(chainId) === 1) {
    return `${etherscanUrlPrefix}/address/${contractAddress}`;
  } else {
    return `${etherscanUrlPrefix}/address/${contractAddress}`;
  }
};

export const generateEtherscanLinkForTx = (txHash: string | undefined) => {
  if (Number(chainId) === 1) {
    return `${etherscanUrlPrefix}/tx/${txHash}`;
  } else {
    return `${etherscanUrlPrefix}/tx/${txHash}`;
  }
};

import { keccak256 } from "viem";
import { MerkleTree } from "merkletreejs";

export function createMerkletree(whitelist: `0x${string}`[]) {
  let leaves = whitelist.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  return merkleTree;
}

const list: `0x${string}`[] = [
  "0x6a07FEEF7Eb458A71Ac0AE759CCd3c78C70139cA",
  "0x13d735A4D5E966b8F7B19Fc2f476BfC25c0fc7Dc",
  // from teto
  "0x9A586B81BF2B76AD7Bfb3B9BC1fea6bb54Dac7E5",
  "0x9Fb241d216BDD4e4D0a544b7170950eC20CFA008",
  "0xf9f2d90c187760A35ff00c2F0963750893cd47Fb",
  "0x90D41fA17a8dF96E7dff80227b4FC7d208dFd026",
];

// it can be cached once the list doesn't not change after we deploy the app
const merkleTree = createMerkletree(list);

export function getProof(minterAddress: `0x${string}`) {
  let proof: `0x${string}`[] = [];

  let hashedAddress = keccak256(minterAddress);
  proof = merkleTree.getHexProof(hashedAddress) as `0x${string}`[];

  return proof; // must be returned to the frontend and used on bid function and/or claimNfts function
}

import { useEffect, useState } from "react";
import { keccak256 } from "viem";
import { MerkleTree } from "merkletreejs";
type EthereumAddress = `0x${string}`;

export async function createMerkleTreeFromAPI() {
  // Fetch the list of addresses from the API
  const response = await fetch(
    "https://fp-api-eta.vercel.app/api/panopticon/discountList?address=0x6a07FEEF7Eb458A71Ac0AE759CCd3c78C70139cA"
  );
  const data = await response.json();

  // Use the list of addresses to create the Merkle tree
  // Assuming the API returns an array of addresses in the format that you need
  const leaves = data.merkleProof.map((addr: EthereumAddress) =>
    keccak256(addr)
  );
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  return merkleTree;
}

export async function getProof(minterAddress: EthereumAddress) {
  const merkleTree = await createMerkleTreeFromAPI();

  if (!minterAddress) {
    return "0x0fig";
  }

  const hashedAddress = keccak256(minterAddress);
  const proof = merkleTree.getHexProof(hashedAddress);
  return proof;
}

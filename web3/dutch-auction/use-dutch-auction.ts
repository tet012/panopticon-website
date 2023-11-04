import { Address, useWalletClient, usePublicClient} from 'wagmi'
import { getContract } from 'wagmi/actions'

import {abi} from './abi'

export const dutchAuctionContract = {
  address: process.env.NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS as Address,
  abi: abi,
}

const useDutchAuction = () => {
  const { data: signer } = useWalletClient()

  const provider = usePublicClient()

  const dutchAuction = getContract({
    ...dutchAuctionContract,
    // signerOrProvider: signer || provider,
  })

  if (!dutchAuction) {
    return
  }

  return dutchAuction
}

export default useDutchAuction

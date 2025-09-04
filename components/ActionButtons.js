import { useState } from 'react'
import { useContractWrite, useAccount, useContractRead } from 'wagmi'
import { Button, VStack, useToast } from '@chakra-ui/react'
import { parseEther } from 'ethers'
import { WHITELIST_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, WHITELIST_ABI, NFT_ABI } from '../utils/constants'

export default function ActionButtons() {
  const { address, isConnected } = useAccount()
  const toast = useToast()
  
  // Check if user is whitelisted
  const { data: isWhitelisted } = useContractRead({
    address: WHITELIST_CONTRACT_ADDRESS,
    abi: WHITELIST_ABI,
    functionName: 'whitelistedAddresses',
    args: [address],
    enabled: !!address
  })
  
  // Whitelist contract write
  const { write: joinWhitelist, isLoading: isJoining } = useContractWrite({
    address: WHITELIST_CONTRACT_ADDRESS,
    abi: WHITELIST_ABI,
    functionName: 'addAddressToWhitelist',
    onSuccess: () => {
      toast({
        title: "Successfully joined whitelist!",
        status: "success",
        duration: 5000,
      })
    }
  })
  
  // NFT contract write
  const { write: mintNFT, isLoading: isMinting } = useContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'mint',
    value: isWhitelisted ? 0 : parseEther('0.01'),
    onSuccess: () => {
      toast({
        title: "NFT minted successfully!",
        status: "success",
        duration: 5000,
      })
    }
  })

  if (!isConnected) {
    return <Button size="lg">Please connect your wallet first</Button>
  }

  return (
    <VStack spacing={4}>
      {!isWhitelisted && (
        <Button 
          colorScheme="blue" 
          size="lg" 
          onClick={joinWhitelist}
          isLoading={isJoining}
        >
          Join Whitelist (Free)
        </Button>
      )}
      <Button 
        colorScheme="green" 
        size="lg" 
        onClick={mintNFT}
        isLoading={isMinting}
      >
        {isWhitelisted ? 'Mint NFT (Free)' : 'Mint NFT (0.01 ETH)'}
      </Button>
    </VStack>
  )
}

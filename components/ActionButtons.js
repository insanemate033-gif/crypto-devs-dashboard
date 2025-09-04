import { useContractWrite, useAccount, useContractRead } from 'wagmi';
import { Button, VStack, useToast } from '@chakra-ui/react';
import { parseEther } from 'viem'; // Switched to viem's parseEther for better compatibility
import { WHITELIST_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, WHITELIST_ABI, NFT_ABI } from '../utils/constants';

export default function ActionButtons() {
  const { address, isConnected } = useAccount();
  const toast = useToast();
  
  // Check if user is whitelisted
  const { data: isWhitelisted } = useContractRead({
    address: WHITELIST_CONTRACT_ADDRESS,
    abi: WHITELIST_ABI,
    functionName: 'whitelistedAddresses',
    args: [address],
    enabled: !!address
  });
  
  // Whitelist contract write
  const { write: joinWhitelist, isPending: isJoining } = useContractWrite({
    address: WHITELIST_CONTRACT_ADDRESS,
    abi: WHITELIST_ABI,
    functionName: 'addAddressToWhitelist',
    onSuccess: () => {
      toast({
        title: "Successfully joined whitelist!",
        status: "success",
        duration: 5000,
      });
    }
  });
  
  // NFT contract write
  const { write: mintNFT, isPending: isMinting } = useContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'mint',
    value: isWhitelisted ? BigInt(0) : parseEther('0.01'),
    onSuccess: () => {
      toast({
        title: "NFT minted successfully!",
        status: "success",
        duration: 5000,
      });
    }
  });

  if (!isConnected) {
    return null; // Don't show anything if not connected, the header button handles it
  }

  return (
    <VStack spacing={4}>
      {!isWhitelisted && (
        <Button 
          colorScheme="blue" 
          size="lg" 
          onClick={() => joinWhitelist()}
          isLoading={isJoining}
        >
          Join Whitelist
        </Button>
      )}
      <Button 
        colorScheme="green" 
        size="lg" 
        onClick={() => mintNFT()}
        isLoading={isMinting}
      >
        {isWhitelisted ? 'Mint Your Free NFT' : 'Mint NFT (0.01 ETH)'}
      </Button>
    </VStack>
  );
}
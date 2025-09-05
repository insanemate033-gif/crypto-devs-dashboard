import { useContractWrite, useAccount, useContractRead } from 'wagmi';
import { Button, VStack } from '@chakra-ui/react';
import { parseEther } from 'viem';
import { WHITELIST_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, WHITELIST_ABI, NFT_ABI } from '@/constants';

export default function ActionButtons() {
  const { address, isConnected } = useAccount();
  
  const { data: isWhitelisted, refetch } = useContractRead({
    address: WHITELIST_CONTRACT_ADDRESS,
    abi: WHITELIST_ABI,
    functionName: 'whitelistedAddresses',
    args: [address],
    enabled: !!address
  });
  
  const { write: joinWhitelist, isPending: isJoining } = useContractWrite({
    address: WHITELIST_CONTRACT_ADDRESS,
    abi: WHITELIST_ABI,
    functionName: 'addAddressToWhitelist',
    onSuccess: () => {
      // Refetch the whitelist status after a successful transaction
      refetch(); 
    }
  });
  
  const { write: mintNFT, isPending: isMinting } = useContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'mint',
    value: isWhitelisted ? BigInt(0) : parseEther('0.01'),
  });

  if (!isConnected) return null;

  return (
    <VStack spacing={4}>
      {!isWhitelisted && (
        <Button colorScheme="blue" size="lg" onClick={() => joinWhitelist?.()} isLoading={isJoining}>
          Join Whitelist
        </Button>
      )}
      <Button colorScheme="green" size="lg" onClick={() => mintNFT?.()} isLoading={isMinting}>
        {isWhitelisted ? 'Mint Your Free NFT' : 'Mint NFT (0.01 ETH)'}
      </Button>
    </VStack>
  );
}
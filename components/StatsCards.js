import { useContractRead } from 'wagmi';
import { Box, Text, Heading, SimpleGrid } from '@chakra-ui/react';
import { WHITELIST_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, WHITELIST_ABI, NFT_ABI } from '../utils/constants';

export default function StatsCards() {
  // Read whitelist data
  const { data: numWhitelisted } = useContractRead({
    address: WHITELIST_CONTRACT_ADDRESS,
    abi: WHITELIST_ABI,
    functionName: 'numAddressesWhitelisted',
  });
  
  // Read NFT data
  const { data: totalSupply } = useContractRead({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'totalSupply',
  });

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      <StatCard 
        label="Whitelist Spots Filled" 
        value={`${Number(numWhitelisted) || 0} / 10`} 
      />
      <StatCard 
        label="NFTs Minted" 
        value={`${Number(totalSupply) || 0} / 20`} 
      />
    </SimpleGrid>
  );
}

function StatCard({ label, value }) {
  return (
    <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
      <Text fontWeight="medium" color="gray.500">{label}</Text>
      <Heading size="lg">{value}</Heading>
    </Box>
  );
}
import { useContractRead } from 'wagmi'
import { Box, Stat, StatLabel, StatNumber, SimpleGrid } from '@chakra-ui/react'
import { WHITELIST_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, WHITELIST_ABI, NFT_ABI } from '../utils/constants'

export default function StatsCards() {
  // Read whitelist data
  const { data: maxWhitelisted } = useContractRead({
    address: WHITELIST_CONTRACT_ADDRESS,
    abi: WHITELIST_ABI,
    functionName: 'maxWhitelistedAddresses',
  })
  
  const { data: numWhitelisted } = useContractRead({
    address: WHITELIST_CONTRACT_ADDRESS,
    abi: WHITELIST_ABI,
    functionName: 'numAddressesWhitelisted',
  })
  
  // Read NFT data
  const { data: totalSupply } = useContractRead({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'totalSupply',
  })
  
  const { data: maxTokenIds } = useContractRead({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'maxTokenIds',
  })

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
      <StatCard 
        label="Whitelist Progress" 
        value={`${numWhitelisted || 0} / ${maxWhitelisted || 10}`} 
      />
      <StatCard 
        label="NFTs Minted" 
        value={`${totalSupply || 0} / ${maxTokenIds || 20}`} 
      />
      <StatCard 
        label="Public Mint Price" 
        value="0.01 ETH" 
      />
      <StatCard 
        label="Whitelist Status" 
        value="Free Mint" 
      />
    </SimpleGrid>
  )
}

function StatCard({ label, value }) {
  return (
    <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
      </Stat>
    </Box>
  )
}

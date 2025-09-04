import { VStack, Heading, Text, Box } from '@chakra-ui/react';
import Layout from '../components/Layout';
import StatsCards from '../components/StatsCards';
import ActionButtons from '../components/ActionButtons';

export default function Home() {
  return (
    <Layout>
      <VStack spacing={8} align="stretch" bg="white" p={8} borderRadius="lg" shadow="md">
        <VStack align="center" spacing={4}>
          <Heading>Crypto Devs NFT Project</Heading>
          <Text color="gray.600">
            The official dashboard to join the whitelist and mint your NFT!
          </Text>
        </VStack>
        
        <Box h="1px" bg="gray.200" />
        
        <StatsCards />
        
        <Box h="1px" bg="gray.200" />
        
        <ActionButtons />
      </VStack>
    </Layout>
  );
}
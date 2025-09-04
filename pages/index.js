import { VStack, Heading, Text, Box } from '@chakra-ui/react';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

// Dynamically import components that need a browser environment
const StatsCards = dynamic(() => import('../components/StatsCards'), { ssr: false });
const ActionButtons = dynamic(() => import('../components/ActionButtons'), { ssr: false });

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
        
        {/* These components will now only render on the client-side */}
        <StatsCards />
        
        <Box h="1px" bg="gray.200" />
        
        <ActionButtons />
      </VStack>
    </Layout>
  );
}
import { VStack, Heading, Text, Divider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import StatsCards from '../components/StatsCards';
import ActionButtons from '../components/ActionButtons';

export default function Home() {
  return (
    <Layout>
      <VStack spacing={8} align="stretch" bg="white" p={8} borderRadius="lg" shadow="md">
        <VStack align="center">
          <Heading>Crypto Devs NFT Project</Heading>
          <Text color="gray.600">
            The official dashboard to join the whitelist and mint your NFT!
          </Text>
        </VStack>
        
        <Divider />
        
        <StatsCards />
        
        <Divider />
        
        <ActionButtons />
      </VStack>
    </Layout>
  );
}
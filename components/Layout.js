import { Container, Flex, Heading, Spacer } from '@chakra-ui/react';
import ConnectWallet from './ConnectWallet';

export default function Layout({ children }) {
  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      <Flex 
        as="header" 
        p={4} 
        borderBottomWidth="1px" 
        borderColor="gray.200"
        bg="white"
        align="center"
      >
        <Heading size="md">Crypto Devs Dashboard</Heading>
        <Spacer />
        <ConnectWallet />
      </Flex>
      
      <Container as="main" maxW="container.md" py={8}>
        {children}
      </Container>
    </Flex>
  );
}
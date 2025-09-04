
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { ChakraProvider } from '@chakra-ui/react';

// Setup the config with the new `http` transport
const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http()
  },
});

// Get connectors from RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'Crypto Devs Dashboard',
  projectId: '2f815e135e0f64a9447f0d41f58caa1f', // Make sure this is your real Project ID
  chains: [sepolia],
});

// Create the final config for Wagmi
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: config.publicClient,
});


export default function App({ Component, pageProps }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider chains={[sepolia]}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiProvider>
  )
}
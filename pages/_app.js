import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { ChakraProvider } from '@chakra-ui/react';

// ACTION REQUIRED: Get this from https://cloud.walletconnect.com
const projectId = '2f815e135e0f64a9447f0d41f58caa1f'; 

const { wallets } = getDefaultWallets({
  appName: 'Crypto Devs Dashboard',
  projectId: projectId,
});

const config = createConfig({
  wallets: wallets,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http()
  },
  ssr: true, // Enable SSR for wagmi
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiProvider>
  );
}
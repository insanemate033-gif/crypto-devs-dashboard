import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { ChakraProvider } from '@chakra-ui/react'

const { chains, publicClient } = configureChains(
  [sepolia],
  [publicProvider()]
)

// This is a CRUCIAL step. You need your own Project ID.
const { connectors } = getDefaultWallets({
  appName: 'Crypto Devs Dashboard',
  projectId: '2f815e135e0f64a9447f0d41f58caa1f', // Get from https://cloud.walletconnect.com
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
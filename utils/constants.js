// Replace with your actual deployed contract addresses
export const WHITELIST_CONTRACT_ADDRESS = "0x21DEDcDa34D8684a160939E5241d64Bf39Fd9C37";
export const NFT_CONTRACT_ADDRESS = "0x75FeF28cF013BB0426b440dE4E8D90Af3dFbF211";

// Import the ABI from the JSON files
export const WHITELIST_ABI = require('../contracts/WhitelistABI.json').abi;
export const NFT_ABI = require('../contracts/CryptoDevsABI.json').abi;

export const NFT_PRICE = "0.01" // ETH
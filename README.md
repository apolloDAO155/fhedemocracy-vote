# FHE Democracy Vote

A decentralized voting platform built with Fully Homomorphic Encryption (FHE) for secure, private, and transparent democratic processes.

## Features

- **Secure Voting**: FHE-encrypted voting ensures privacy while maintaining transparency
- **Wallet Integration**: Connect with Rainbow, MetaMask, and other popular wallets
- **Real-time Results**: Live voting results with encrypted data processing
- **Decentralized**: Built on blockchain for trustless governance
- **User-friendly**: Modern UI with intuitive voting experience

## Technologies

This project is built with:

- **Frontend**: React, TypeScript, Vite
- **UI**: shadcn/ui, Tailwind CSS
- **Blockchain**: Wagmi, Viem, RainbowKit
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/apolloDAO155/fhedemocracy-vote.git

# Navigate to the project directory
cd fhedemocracy-vote

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button to link your crypto wallet
2. **Create Proposal**: Submit new voting proposals (requires governance tokens)
3. **Vote**: Cast your vote on active proposals
4. **View Results**: See real-time encrypted voting results

## Smart Contracts

The platform uses FHE-encrypted smart contracts for:
- Secure vote storage
- Privacy-preserving tallying
- Transparent result verification

## Deployment

### Vercel Deployment

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the project
4. Set environment variables
5. Deploy

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred platform
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub.

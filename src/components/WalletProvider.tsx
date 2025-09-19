import { createContext, useContext, ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors";
import { toast } from "@/hooks/use-toast";

// RainbowKit configuration
const config = getDefaultConfig({
  appName: "FHE Democracy Vote",
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "2ec9743d0d0cd7fb94dee1a7e6d33475",
  chains: [sepolia, mainnet],
  connectors: [
    injected(),
    walletConnect(),
    coinbaseWallet(),
  ],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_RPC_URL || "https://1rpc.io/sepolia"),
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <WalletContext.Provider value={{
            isConnected: false,
            address: null,
            connect: async () => {
              toast({
                title: "Wallet Connection",
                description: "Please use the RainbowKit connect button",
              });
            },
            disconnect: () => {
              toast({
                title: "Wallet Disconnected",
                description: "You have been logged out safely",
              });
            }
          }}>
            {children}
          </WalletContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
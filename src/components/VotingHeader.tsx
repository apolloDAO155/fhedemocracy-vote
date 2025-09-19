import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Vote, Lock, Users, Zap } from "lucide-react";
import votingLogo from "@/assets/voting-logo.jpg";

export const VotingHeader = () => {
  return (
    <header className="w-full bg-background border-b border-border shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Branding */}
          <div className="flex items-center gap-4">
            <img 
              src={votingLogo} 
              alt="FHE Democracy Logo" 
              className="w-12 h-12 rounded-lg shadow-md"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Vote className="w-6 h-6" />
                FHE Democracy
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Powered by Fully Homomorphic Encryption
              </p>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button onClick={openConnectModal} type="button" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-semibold">
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button" className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-lg font-semibold">
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div className="flex items-center gap-2">
                          <div className="hidden sm:flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
                            <Vote className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">
                              {`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
                            </span>
                          </div>
                          <button
                            onClick={openAccountModal}
                            type="button"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-semibold"
                          >
                            {account.displayName}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </header>
  );
};
import { VotingHeader } from "@/components/VotingHeader";
import { VotingFooter } from "@/components/VotingFooter";
import { VotingDashboard } from "@/components/VotingDashboard";
import { WalletProvider } from "@/components/WalletProvider";

const VotingApp = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <VotingHeader />
      <VotingDashboard />
      <VotingFooter />
    </div>
  );
};

const Index = () => {
  return (
    <WalletProvider>
      <VotingApp />
    </WalletProvider>
  );
};

export default Index;

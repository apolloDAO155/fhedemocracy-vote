import { useState } from "react";
import { ProposalCard } from "./ProposalCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vote, Shield, TrendingUp, Users, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import heroVoting from "@/assets/hero-voting.jpg";

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: "active" | "closed" | "pending";
  endDate: string;
  totalVotes: number;
}

export const VotingDashboard = () => {
  const [votedProposals, setVotedProposals] = useState<Set<string>>(new Set());
  
  const proposals: Proposal[] = [
    {
      id: "1",
      title: "Infrastructure Blockchain Integration",
      description: "Proposal to integrate blockchain technology into city infrastructure management for enhanced transparency and efficiency.",
      status: "active",
      endDate: "Dec 25, 2024",
      totalVotes: 1247
    },
    {
      id: "2", 
      title: "Digital Identity Verification System",
      description: "Implementation of secure digital identity verification using zero-knowledge proofs for citizen services.",
      status: "active",
      endDate: "Dec 30, 2024",
      totalVotes: 892
    },
    {
      id: "3",
      title: "Renewable Energy Initiative",
      description: "City-wide adoption of renewable energy sources with blockchain-based energy trading platform.",
      status: "pending",
      endDate: "Jan 15, 2025",
      totalVotes: 0
    }
  ];

  const handleVote = (proposalId: string, vote: "yes" | "no") => {
    setVotedProposals(prev => new Set([...prev, proposalId]));
    
    toast({
      title: "Vote Encrypted & Submitted",
      description: `Your ${vote.toUpperCase()} vote has been encrypted and will be revealed when polls close.`,
    });
  };

  const stats = [
    { label: "Active Proposals", value: proposals.filter(p => p.status === "active").length, icon: Vote },
    { label: "Total Participants", value: "2,847", icon: Users },
    { label: "Encryption Rate", value: "100%", icon: Shield },
    { label: "Avg Turnout", value: "76%", icon: TrendingUp }
  ];

  return (
    <main className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative w-full py-24 democratic-gradient overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroVoting})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Secure Democracy with FHE
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Cast encrypted votes with confidence. Your choices remain private until polls close,
            ensuring true democratic participation through cutting-edge cryptography.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secure" size="lg" className="text-lg px-8">
              <Shield className="w-5 h-5" />
              Learn About FHE
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
              View Results
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Proposals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Current Proposals</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Participate in democratic decision-making with fully encrypted voting.
              Your ballot remains secret until all polls close.
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {proposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                {...proposal}
                hasVoted={votedProposals.has(proposal.id)}
                onVote={handleVote}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Security Information */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Shield className="w-6 h-6" />
                How Encryption Protects Your Vote
              </CardTitle>
              <CardDescription className="text-base">
                Understanding Fully Homomorphic Encryption in Democratic Processes
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Vote className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Encrypted Voting</h3>
                <p className="text-sm text-muted-foreground">
                  Your vote is encrypted immediately and remains private throughout the entire process.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Time-Locked Results</h3>
                <p className="text-sm text-muted-foreground">
                  Results are only revealed after all voting periods close, ensuring fair participation.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Verifiable Outcomes</h3>
                <p className="text-sm text-muted-foreground">
                  All results can be cryptographically verified without compromising individual privacy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};
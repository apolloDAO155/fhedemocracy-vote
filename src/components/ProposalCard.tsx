import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Lock, CheckCircle, XCircle, Vote } from "lucide-react";
import { useContract } from "@/hooks/useContract";

interface ProposalCardProps {
  id: string;
  title: string;
  description: string;
  status: "active" | "closed" | "pending";
  endDate: string;
  totalVotes: number;
  hasVoted: boolean;
  onVote: (proposalId: string, vote: "yes" | "no") => void;
}

export const ProposalCard = ({ 
  id, 
  title, 
  description, 
  status, 
  endDate, 
  totalVotes,
  hasVoted,
  onVote 
}: ProposalCardProps) => {
  const { castVote, isLoading } = useContract();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-secondary text-secondary-foreground";
      case "closed": return "bg-muted text-muted-foreground";
      case "pending": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleVote = async (vote: "yes" | "no") => {
    const voteChoice = vote === "yes" ? 1 : 2;
    await castVote(parseInt(id), voteChoice);
    onVote(id, vote);
  };

  return (
    <Card className="card-gradient hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
              <Vote className="w-5 h-5" />
              {title}
            </CardTitle>
            <CardDescription className="mt-2 text-base">
              {description}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(status)} variant="secondary">
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Voting Stats */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Ends: {endDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{totalVotes} votes</span>
          </div>
        </div>

        {/* Voting Actions */}
        {status === "active" && (
          <div className="flex gap-3 pt-2">
            {hasVoted ? (
              <div className="flex items-center gap-2 text-secondary">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Vote encrypted and submitted</span>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => handleVote("yes")}
                  variant="vote"
                  className="flex-1 flex items-center gap-2"
                  disabled={isLoading}
                >
                  <CheckCircle className="w-4 h-4" />
                  {isLoading ? "Encrypting..." : "Vote Yes"}
                </Button>
                <Button
                  onClick={() => handleVote("no")}
                  variant="outline"
                  className="flex-1 flex items-center gap-2"
                  disabled={isLoading}
                >
                  <XCircle className="w-4 h-4" />
                  {isLoading ? "Encrypting..." : "Vote No"}
                </Button>
              </>
            )}
          </div>
        )}

        {status === "closed" && (
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Votes are being decrypted and tallied...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Shield, CheckCircle, XCircle } from "lucide-react";

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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-secondary text-secondary-foreground";
      case "closed": return "bg-muted text-muted-foreground";
      case "pending": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="card-gradient hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
              <Shield className="w-5 h-5" />
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
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Vote encrypted and submitted</span>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => onVote(id, "yes")}
                  variant="vote"
                  className="flex-1 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Vote Yes
                </Button>
                <Button
                  onClick={() => onVote(id, "no")}
                  variant="outline"
                  className="flex-1 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Vote No
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
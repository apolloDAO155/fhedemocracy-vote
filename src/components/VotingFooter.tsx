import { Archive, Lock, Vote, Users, Zap } from "lucide-react";

export const VotingFooter = () => {
  return (
    <footer className="w-full bg-primary text-primary-foreground py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Spinning Ballot Box Icon */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Archive className="w-8 h-8 ballot-spin" />
              <div className="absolute inset-0 bg-primary-glow rounded-full blur-sm opacity-30 ballot-spin"></div>
            </div>
            <div>
              <h3 className="font-semibold">Encrypted Democracy</h3>
              <p className="text-sm opacity-80">Ballots secured until polls close</p>
            </div>
          </div>

          {/* Security Features */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4" />
              <span>FHE Protected</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4" />
              <span>Zero Knowledge</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Vote className="w-4 h-4" />
              <span>Verified Results</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              <span>Fast Processing</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-sm opacity-70">
            © 2024 Secure Democracy Platform
          </div>
        </div>
      </div>
    </footer>
  );
};

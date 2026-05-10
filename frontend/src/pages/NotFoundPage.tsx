import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const NotFoundPage: React.FC = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background">
    <div className="relative">
      <h1 className="text-8xl font-black text-neon-yellow text-glow-yellow animate-glitch tracking-widest">
        404
      </h1>
    </div>
    <p className="text-sm font-mono uppercase tracking-[0.3em] text-neon-cyan">
      // \u0441\u0442\u043e\u0440\u0456\u043d\u043a\u0443 \u043d\u0435
      \u0437\u043d\u0430\u0439\u0434\u0435\u043d\u043e
    </p>
    <Link to="/">
      <Button>
        // \u043d\u0430 \u0433\u043e\u043b\u043e\u0432\u043d\u0443
      </Button>
    </Link>
  </div>
);

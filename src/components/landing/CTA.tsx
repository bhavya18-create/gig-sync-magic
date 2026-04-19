import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="container pb-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/60 p-12 md:p-16 bg-gradient-card">
        <div className="absolute inset-0 bg-gradient-primary opacity-20" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/30 blur-3xl rounded-full" />

        <div className="relative max-w-2xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Ready to <span className="text-gradient">sync your next gig?</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of organizers and musicians making live music effortless.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/signup">Create free account <ArrowRight /></Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

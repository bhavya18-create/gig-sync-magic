import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Music2 } from "lucide-react";
import heroImage from "@/assets/hero-musician.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="container relative pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Now matching gigs in real-time
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Find musicians <br />
              <span className="text-gradient">near you instantly.</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Perfect for last-minute events. Post a gig, get matched with verified local musicians,
              and book with a simple contract — all in minutes.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/signup?role=organizer">
                  Post a Gig <ArrowRight className="ml-1" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/signup?role=musician">
                  <Music2 /> Join as Musician
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div>
                <div className="font-display text-2xl font-bold text-foreground">12k+</div>
                <div>Active musicians</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-bold text-foreground">98%</div>
                <div>Booking success</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-bold text-foreground">{`<2h`}</div>
                <div>Avg. match time</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in lg:animate-fade-up">
            <div className="absolute -inset-6 bg-gradient-primary opacity-30 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-card">
              <img
                src={heroImage}
                alt="Musician performing live on stage with purple lights"
                width={1536}
                height={1280}
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground">
                    LK
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-semibold">Luca Kane · Indie Rock</div>
                    <div className="text-xs text-muted-foreground">2.1 mi away · Available tonight</div>
                  </div>
                  <Button size="sm" variant="hero">Book</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

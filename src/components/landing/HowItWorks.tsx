const steps = [
  {
    n: "01",
    title: "Post or browse",
    desc: "Organizers post a gig with date, budget, and genre. Musicians browse open gigs nearby.",
  },
  {
    n: "02",
    title: "Match & chat",
    desc: "Smart matching surfaces the right people. Review profiles, samples, and ratings.",
  },
  {
    n: "03",
    title: "Book & play",
    desc: "Confirm with a 1-tap contract. Show up, play, get paid, leave a review.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="relative py-24 border-y border-border/50 bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm uppercase tracking-widest text-accent font-medium mb-3">How it works</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            From idea to encore in three steps.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="rounded-3xl bg-gradient-card border border-border/60 p-8 h-full">
                <div className="font-display text-6xl font-bold text-gradient mb-4">{s.n}</div>
                <h3 className="font-display text-2xl font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

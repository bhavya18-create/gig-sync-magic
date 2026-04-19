const items = [
  {
    quote: "Booked a jazz trio for a corporate dinner with 4 hours notice. GigSync saved the night.",
    name: "Priya Shah",
    role: "Event Manager, Lumen Studios",
  },
  {
    quote: "I went from 2 gigs a month to 12. The matching is shockingly accurate.",
    name: "Marcus Reid",
    role: "Solo guitarist · Brooklyn",
  },
  {
    quote: "The contracts are clean, payments are fast, and the talent pool is the best I've seen.",
    name: "Sofia Andersen",
    role: "Wedding Planner",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="container py-24">
      <div className="max-w-2xl mb-14">
        <div className="text-sm uppercase tracking-widest text-accent font-medium mb-3">Loved by</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          Organizers and musicians who ship <span className="text-gradient">unforgettable nights</span>.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {items.map((t) => (
          <figure
            key={t.name}
            className="rounded-3xl bg-gradient-card border border-border/60 p-7 hover:border-accent/40 transition-colors"
          >
            <div className="text-accent text-2xl mb-3">&ldquo;</div>
            <blockquote className="text-lg leading-relaxed">{t.quote}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground text-sm">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="font-display font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

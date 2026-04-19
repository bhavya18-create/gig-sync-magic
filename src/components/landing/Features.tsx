import { MapPin, Calendar, FileSignature, Star, Users, Zap } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Location-based matching",
    desc: "Real-time geo matching surfaces verified musicians within minutes of your venue.",
    span: "md:col-span-2",
  },
  {
    icon: Zap,
    title: "Instant gig posting",
    desc: "Post date, budget, and vibe — get applicants in under an hour.",
    span: "",
  },
  {
    icon: Users,
    title: "Rich musician profiles",
    desc: "Genres, pricing, audio & video samples — judge fit before you book.",
    span: "",
  },
  {
    icon: FileSignature,
    title: "1-tap contracts",
    desc: "Confirmed pricing and terms with a single tap. No paperwork ping-pong.",
    span: "md:col-span-2",
  },
  {
    icon: Calendar,
    title: "Availability sync",
    desc: "Musicians' calendars stay in sync so double-bookings never happen.",
    span: "",
  },
  {
    icon: Star,
    title: "Verified reviews",
    desc: "Post-gig ratings build a trust layer for every booking on the platform.",
    span: "md:col-span-2",
  },
];

const Features = () => {
  return (
    <section id="features" className="container py-24">
      <div className="max-w-2xl mb-14">
        <div className="text-sm uppercase tracking-widest text-accent font-medium mb-3">Features</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          Everything you need to <span className="text-gradient">book live music</span>.
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          A complete toolkit for organizers and musicians, designed around speed and trust.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {features.map(({ icon: Icon, title, desc, span }) => (
          <div
            key={title}
            className={`group relative rounded-3xl bg-gradient-card border border-border/60 p-7 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${span}`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow mb-5 group-hover:scale-110 transition-transform">
              <Icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

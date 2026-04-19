import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mic2, CalendarCheck } from "lucide-react";
import logoMark from "@/assets/gigsync-mark.png";
import { setUser, type Role } from "@/lib/auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Signup = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialRole = (params.get("role") as Role) || "organizer";
  const [role, setRole] = useState<Role>(initialRole);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    genres: "",
    priceRange: "",
    bio: "",
    media: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.location) {
      toast.error("Please complete all required fields");
      return;
    }
    setUser({
      id: crypto.randomUUID(),
      name: form.name,
      email: form.email,
      role,
      location: form.location,
      genres: form.genres,
      priceRange: form.priceRange,
      bio: form.bio,
      media: form.media,
    });
    toast.success(`Welcome to GigSync, ${form.name.split(" ")[0]}!`);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-hero">
      <div className="container py-10">
        <Link to="/" className="inline-flex items-center gap-2 mb-10">
          <img src={logoMark} alt="GigSync logo" width={36} height={36} className="h-9 w-9" />
          <span className="font-display text-xl font-semibold">GigSync</span>
        </Link>

        <div className="max-w-xl mx-auto">
          <h1 className="font-display text-4xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-2 text-muted-foreground">Choose your role to get a tailored experience.</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {([
              { v: "organizer", label: "Organizer", icon: CalendarCheck, desc: "Post gigs, hire talent" },
              { v: "musician", label: "Musician", icon: Mic2, desc: "Browse gigs, get booked" },
            ] as const).map(({ v, label, icon: Icon, desc }) => (
              <button
                key={v}
                type="button"
                onClick={() => setRole(v)}
                className={cn(
                  "rounded-2xl border p-5 text-left transition-all",
                  role === v
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-border/60 bg-gradient-card hover:border-primary/40"
                )}
              >
                <Icon className="h-5 w-5 text-accent mb-2" />
                <div className="font-display font-semibold">{label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-3xl border border-border/60 bg-gradient-card p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Brooklyn, NY" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="••••••••" />
            </div>

            {role === "musician" && (
              <div className="space-y-4 pt-2 border-t border-border/60">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="genres">Genres</Label>
                    <Input id="genres" value={form.genres} onChange={(e) => update("genres", e.target.value)} placeholder="Indie, Folk, Acoustic" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceRange">Price range</Label>
                    <Input id="priceRange" value={form.priceRange} onChange={(e) => update("priceRange", e.target.value)} placeholder="$300 – $1500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={form.bio} onChange={(e) => update("bio", e.target.value)} placeholder="Tell organizers what makes your sound special." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="media">Media link</Label>
                  <Input id="media" value={form.media} onChange={(e) => update("media", e.target.value)} placeholder="https://soundcloud.com/you" />
                </div>
              </div>
            )}

            <Button type="submit" variant="hero" size="lg" className="w-full mt-2">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            Already on GigSync?{" "}
            <Link to="/login" className="text-foreground font-medium hover:text-accent transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

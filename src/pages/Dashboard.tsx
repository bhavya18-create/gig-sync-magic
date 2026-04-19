import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockGigs, type Gig } from "@/lib/mockData";
import { clearUser, getUser, type User } from "@/lib/auth";
import { Calendar, MapPin, DollarSign, Plus, LogOut, CheckCircle2, Music2, Inbox, Users } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type DbUser = { id: string; name: string; email: string; created_at: string };

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setU] = useState<User | null>(null);
  const [gigs, setGigs] = useState<Gig[]>(mockGigs);
  const [open, setOpen] = useState(false);
  const [dbUsers, setDbUsers] = useState<DbUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      navigate("/login");
      return;
    }
    setU(u);

    supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) toast.error("Failed to load users");
        else setDbUsers(data ?? []);
        setLoadingUsers(false);
      });
  }, [navigate]);

  if (!user) return null;

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-hero">
      <Navbar />
      <main className="container py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-sm text-accent font-medium uppercase tracking-widest mb-2">
              {user.role === "organizer" ? "Organizer dashboard" : "Musician dashboard"}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Hey, {user.name.split(" ")[0]} 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              {user.role === "organizer"
                ? "Post gigs and manage your applicants in one place."
                : "Browse fresh gigs near you and apply in one tap."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {user.role === "organizer" && (
              <NewGigDialog
                open={open}
                onOpenChange={setOpen}
                onCreate={(g) => setGigs((prev) => [g, ...prev])}
                organizerName={user.name}
              />
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> Log out
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <StatCard
            label={user.role === "organizer" ? "Active gigs" : "Available gigs"}
            value={gigs.length}
            icon={Music2}
          />
          <StatCard
            label={user.role === "organizer" ? "Total applicants" : "Applications sent"}
            value={user.role === "organizer" ? gigs.reduce((s, g) => s + g.applicants.length, 0) : gigs.filter((g) => g.status === "applied").length}
            icon={Inbox}
          />
          <StatCard
            label="Confirmed"
            value={gigs.filter((g) => g.status === "confirmed").length}
            icon={CheckCircle2}
          />
        </div>

        <section className="mb-10 rounded-3xl bg-gradient-card border border-border/60 p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Users className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">Registered users</h2>
              <p className="text-xs text-muted-foreground">Live from your database</p>
            </div>
            <span className="ml-auto text-sm text-muted-foreground">{dbUsers.length} total</span>
          </div>
          {loadingUsers ? (
            <div className="text-sm text-muted-foreground">Loading…</div>
          ) : dbUsers.length === 0 ? (
            <div className="text-sm text-muted-foreground">No users yet. Be the first to sign up!</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {dbUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3 rounded-xl bg-secondary/60 px-3 py-2.5">
                  <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                    {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{u.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{u.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="grid lg:grid-cols-2 gap-5">
          {gigs.map((gig) => (
            <GigCard
              key={gig.id}
              gig={gig}
              role={user.role}
              onApply={() =>
                setGigs((prev) =>
                  prev.map((g) => (g.id === gig.id ? { ...g, status: "applied" as const } : g))
                )
              }
              onConfirm={() =>
                setGigs((prev) =>
                  prev.map((g) => (g.id === gig.id ? { ...g, status: "confirmed" as const } : g))
                )
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) => (
  <div className="rounded-2xl bg-gradient-card border border-border/60 p-5 flex items-center justify-between">
    <div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="font-display text-3xl font-bold mt-1">{value}</div>
    </div>
    <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
      <Icon className="h-5 w-5 text-primary-foreground" />
    </div>
  </div>
);

const GigCard = ({
  gig,
  role,
  onApply,
  onConfirm,
}: {
  gig: Gig;
  role: User["role"];
  onApply: () => void;
  onConfirm: () => void;
}) => {
  return (
    <div className="rounded-3xl bg-gradient-card border border-border/60 p-6 hover:border-primary/40 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="rounded-full font-normal">{gig.eventType}</Badge>
            {gig.status === "applied" && <Badge className="rounded-full bg-accent text-accent-foreground">Applied</Badge>}
            {gig.status === "confirmed" && <Badge className="rounded-full bg-gradient-primary text-primary-foreground">Confirmed</Badge>}
          </div>
          <h3 className="font-display text-xl font-semibold leading-tight">{gig.title}</h3>
          <div className="text-sm text-muted-foreground mt-1">by {gig.organizer}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-display text-2xl font-bold text-gradient">${gig.budget}</div>
          <div className="text-xs text-muted-foreground">budget</div>
        </div>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{gig.description}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-5">
        <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(gig.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{gig.location}</span>
        <span className="inline-flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" />Confirmed pricing</span>
      </div>

      {role === "organizer" ? (
        <div className="border-t border-border/60 pt-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Applicants ({gig.applicants.length})
          </div>
          {gig.applicants.length === 0 ? (
            <div className="text-sm text-muted-foreground">No applicants yet.</div>
          ) : (
            <div className="space-y-2">
              {gig.applicants.map((a) => (
                <div key={a} className="flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {a.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <span className="text-sm font-medium">{a}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => toast("Application declined")}>Decline</Button>
                    <Button size="sm" variant="hero" onClick={() => { onConfirm(); toast.success(`Booked ${a}`); }}>Accept</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="border-t border-border/60 pt-4 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">{gig.applicants.length} other applicants</div>
          <Button
            size="sm"
            variant={gig.status ? "glass" : "hero"}
            disabled={!!gig.status}
            onClick={() => { onApply(); toast.success("Application sent!"); }}
          >
            {gig.status === "confirmed" ? "Confirmed" : gig.status === "applied" ? "Applied" : "Apply now"}
          </Button>
        </div>
      )}
    </div>
  );
};

const NewGigDialog = ({
  open,
  onOpenChange,
  onCreate,
  organizerName,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onCreate: (g: Gig) => void;
  organizerName: string;
}) => {
  const [form, setForm] = useState({
    title: "",
    eventType: "",
    date: "",
    location: "",
    budget: "",
    description: "",
  });
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.location || !form.budget) {
      toast.error("Please fill in all required fields");
      return;
    }
    onCreate({
      id: crypto.randomUUID(),
      title: form.title,
      eventType: form.eventType || "Event",
      date: form.date,
      location: form.location,
      budget: Number(form.budget),
      description: form.description,
      organizer: organizerName,
      applicants: [],
    });
    toast.success("Gig posted!");
    onOpenChange(false);
    setForm({ title: "", eventType: "", date: "", location: "", budget: "", description: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="hero" size="sm"><Plus /> Post a gig</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Post a new gig</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Acoustic set for rooftop wedding" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventType">Event type</Label>
              <Input id="eventType" value={form.eventType} onChange={(e) => update("eventType", e.target.value)} placeholder="Wedding" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Brooklyn, NY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input id="budget" type="number" value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder="850" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Tell musicians about the event..." rows={3} />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full">Post gig</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Dashboard;

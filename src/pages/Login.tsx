import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music2 } from "lucide-react";
import { setUser } from "@/lib/auth";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setUser({
      id: "demo",
      name: email.split("@")[0],
      email,
      role: "organizer",
      location: "Demo City",
    });
    toast.success("Welcome back!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-hero grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden border-r border-border/50">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Music2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold">GigSync</span>
        </Link>
        <div className="relative">
          <h2 className="font-display text-4xl font-bold leading-tight">
            Welcome back to the <span className="text-gradient">stage.</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md">
            Pick up where you left off — your next gig is one tap away.
          </p>
        </div>
        <div className="relative text-sm text-muted-foreground">
          &ldquo;GigSync is the fastest path from idea to encore.&rdquo;
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
              <Music2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold">GigSync</span>
          </Link>

          <h1 className="font-display text-3xl font-bold">Log in</h1>
          <p className="mt-2 text-muted-foreground">Enter your details to continue.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@band.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full">
              Log in
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            New here?{" "}
            <Link to="/signup" className="text-foreground font-medium hover:text-accent transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

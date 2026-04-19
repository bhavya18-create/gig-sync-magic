import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoMark from "@/assets/gigsync-mark.png";


const Navbar = () => {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl border-b border-border/50" />
      <div className="container relative flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logoMark}
            alt="GigSync logo"
            width={36}
            height={36}
            className="h-9 w-9 transition-transform group-hover:scale-110 drop-shadow-[0_0_18px_hsl(var(--primary)/0.5)]"
          />
          <span className="font-display text-xl font-semibold tracking-tight">GigSync</span>
        </Link>

        {isLanding && (
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
          </nav>
        )}

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild variant="hero" size="sm">
            <Link to="/signup">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

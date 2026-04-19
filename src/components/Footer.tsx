import { Music2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="container py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
              <Music2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold">GigSync</span>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Book live music in minutes — not weeks. The fastest way to connect organizers with musicians.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground">Features</a></li>
            <li><a href="#how" className="hover:text-foreground">How it works</a></li>
            <li><a href="#" className="hover:text-foreground">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="container py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} GigSync. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

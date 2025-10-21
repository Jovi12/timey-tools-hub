import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-bold text-lg mb-3">TimeyTools</h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate time utility hub for productivity and focus.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/stopwatch" className="hover:text-primary transition-colors">Stopwatch</a></li>
              <li><a href="/timer" className="hover:text-primary transition-colors">Timer</a></li>
              <li><a href="/pomodoro" className="hover:text-primary transition-colors">Pomodoro</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* AdSense Placeholder */}
        <div className="my-6 flex justify-center">
          <div
            id="ads-area"
            className="w-full max-w-4xl h-24 bg-muted rounded-lg flex items-center justify-center text-sm text-muted-foreground border border-border"
          >
            Google AdSense Placeholder
          </div>
        </div>

        <div className="pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} TimeyTools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

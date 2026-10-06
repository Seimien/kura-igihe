import { Link } from "@tanstack/react-router";
import { useApp } from "@/lib/store";

export function Footer() {
  const { setPanel } = useApp();
  const col = "label-micro mb-4 text-navy-foreground/60";
  const a = "block py-1 text-sm text-navy-foreground/90 hover:text-navy-foreground hover:underline";
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 md:grid-cols-4 lg:px-8">
        <div>
          <h2 className={col}>Explore</h2>
          <Link to="/inspired" className={a}>Get inspired</Link>
          <Link to="/opportunities" className={a}>Find opportunities</Link>
          <Link to="/events" className={a}>Events</Link>
          <Link to="/help" className={a}>Get help</Link>
        </div>
        <div>
          <h2 className={col}>Participate</h2>
          <a href="mailto:hello@kura.rw" className={a}>Tell us your story</a>
          <a href="mailto:hello@kura.rw" className={a}>Submit an opportunity</a>
        </div>
        <div>
          <h2 className={col}>KURA</h2>
          <Link to="/about" className={a}>About</Link>
          <Link to="/about" className={a}>How we verify</Link>
          <a href="mailto:hello@kura.rw" className={a}>Contact</a>
          <span className={a}>Privacy · Terms</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold leading-tight">Stay in the loop.</h2>
          <p className="mt-3 text-sm text-navy-foreground/75">Get new opportunities, events and stories that match your interests.</p>
          <button onClick={() => setPanel("alerts")} className="mt-5 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Get alerts →
          </button>
        </div>
      </div>
      <div className="border-t border-navy-foreground/15">
        <p className="mx-auto max-w-[1440px] px-4 py-5 text-xs text-navy-foreground/60 lg:px-8">© 2026 KURA · Youth with ambition. Supported by Mastercard Foundation.</p>
      </div>
    </footer>
  );
}

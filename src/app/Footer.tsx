import Link from "next/link";

// Shared site footer. "Contact" routes to the dedicated /contact page.
export function Footer() {
  return (
    <footer>
      <div className="wrap foot-in">
        <div className="brand" style={{ fontSize: 14 }}>CLO<span className="blk" style={{ width: 8, height: 8 }} />AK</div>
        <div>A private remote for your coding agent · Works with Claude Code today</div>
        <div className="foot-meta">
          <Link href="/contact">Contact</Link>
          <a href="https://www.npmjs.com/package/cloak-remote" target="_blank" rel="noreferrer noopener">npm</a>
          <a href="https://github.com/mishraadityan09" target="_blank" rel="noreferrer noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/adityan-mishra-61ba18162/" target="_blank" rel="noreferrer noopener">LinkedIn</a>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}

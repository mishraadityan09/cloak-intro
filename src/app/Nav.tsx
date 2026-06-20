import Link from "next/link";

// Shared site nav. On the homepage (`home`) the section links are bare `#`
// anchors so GSAP's wireAnchors intercepts them for smooth-scroll; elsewhere
// they become `/#…` links back to the homepage sections. "Contact" always
// routes to the dedicated /contact page.
export function Nav({ home = false }: { home?: boolean }) {
  const sec = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <nav>
      <div className="wrap nav-in">
        {home ? (
          <div className="brand">CLO<span className="blk" />AK</div>
        ) : (
          <Link className="brand" href="/">CLO<span className="blk" />AK</Link>
        )}
        <div className="nav-links">
          <a href={sec("how")}>How it works</a>
          <a href={sec("what")}>What you get</a>
          <a href={sec("security")}>Security</a>
          <Link href="/contact">Contact</Link>
        </div>
        <a className="nav-cta" href={sec("get")}>npx cloak-remote</a>
      </div>
    </nav>
  );
}

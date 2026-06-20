import { SmoothScroll } from "./SmoothScroll";
import { PhoneMock } from "./PhoneMock";
import { ContactForm } from "./ContactForm";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export default function Home() {
  return (
    <SmoothScroll nav={<Nav home />}>
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">A private remote for your coding agent</div>
            <div className="wordmark" id="wm" aria-label="Cloak">
              <span className="wm-letter" data-final="C">C</span>
              <span className="wm-letter" data-final="L">L</span>
              <span className="wm-letter" data-final="O">O</span>
              <span className="blk" />
              <span className="wm-letter" data-final="A">A</span>
              <span className="wm-letter" data-final="K">K</span>
            </div>
            <h1>
              <span className="h1-copy">
                Drive Claude Code from your phone. Nothing leaves your machines.
              </span>
              <span className="blk cursor" />
            </h1>
            <p className="sub">
              A private, self-hosted remote for your coding agent — full terminal <b>and</b> chat,
              every edit gated with a diff. See every Claude Code session on your Mac — even ones you
              start in your own terminal — and take any over, all over a direct end-to-end-encrypted
              tunnel. <b>No account. No cloud.</b>
            </p>

            <div className="term" id="get">
              <div className="term-bar">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="term-title">your-mac — zsh</span>
              </div>
              <div className="term-body">
                <span className="term-cmd">
                  <span className="prompt">$</span>
                  <span className="cmd">npx cloak-remote</span>
                </span>
                <button className="copy" aria-label="Copy command">COPY</button>
              </div>
            </div>

            <div className="proof">
              <span>No account</span>
              <span className="sep">·</span>
              <span>No cloud</span>
              <span className="sep">·</span>
              <span>End-to-end encrypted</span>
              <span className="sep">·</span>
              <span>Free &amp; open</span>
            </div>
          </div>

          <div className="phone-stage">
            <PhoneMock />
          </div>
        </div>
      </header>

      <section className="watch">
        <div className="watch-pin">
          <div className="watch-cap"><span className="blk" /><span className="eyebrow">Watch it work</span></div>
          <div className="phone-stage">
            <PhoneMock />
          </div>
        </div>
      </section>

      <div className="wrap"><div className="rule" /></div>

      <section>
        <div className="wrap reveal">
          <div className="sec-eyebrow"><span className="blk" /><span className="eyebrow">The problem</span></div>
          <h2 className="lead">Your agent stalls the moment you walk away.</h2>
          <p className="lead-sub">
            AI coding agents run for minutes and need a human in the loop —{" "}
            <span className="lime">“can I edit this file?”</span>,{" "}
            <span className="lime">“can I run this command?”</span> Leave your desk and it just
            waits. The fixes on offer make you sign into someone else’s cloud and route your code
            through their servers.
          </p>
        </div>
      </section>

      <section id="how">
        <div className="wrap reveal">
          <div className="sec-eyebrow"><span className="blk" /><span className="eyebrow">How it works</span></div>
          <h2 className="lead">Three steps. No install, no signup.</h2>
          <div className="steps">
            <div className="steps-line" />
            <div className="step">
              <div className="n"><span className="num">01</span> / RUN</div>
              <h3>On your Mac</h3>
              <p>Run <code>npx cloak-remote</code>. It prints a QR and sets a PIN — the tunnel binary downloads itself, no account.</p>
            </div>
            <div className="step">
              <div className="n"><span className="num">02</span> / SCAN</div>
              <h3>Pair the phone</h3>
              <p>Scan the QR with the Cloak app and enter the PIN. The two devices pair directly over end-to-end encryption.</p>
            </div>
            <div className="step">
              <div className="n"><span className="num">03</span> / DRIVE</div>
              <h3>From anywhere</h3>
              <p>Approve edits, run commands, watch responses stream — see every Claude session on your Mac, take any over, and get an on-device alert the moment one needs you or finishes.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap"><div className="rule" /></div>

      <section id="what">
        <div className="what-pin">
          <div className="wrap what-head reveal">
            <div className="sec-eyebrow"><span className="blk" /><span className="eyebrow">What you get</span></div>
            <h2 className="lead">A real remote, not just a chat box.</h2>
          </div>
          <div className="what-track">
            <div className="panel">
              <div className="panel-card">
                <h3><span className="blk" />Terminal + agent chat</h3>
                <p>A real shell and the Claude chat, multiplexed — as many sessions as you want, persistent across disconnects.</p>
              </div>
            </div>
            <div className="panel">
              <div className="panel-card">
                <h3><span className="blk" />Every session, live</h3>
                <p>See every Claude Code session on your Mac — the ones in the app and the ones you start in your own terminal — each with live status: running, needs you, done.</p>
              </div>
            </div>
            <div className="panel">
              <div className="panel-card">
                <h3><span className="blk" />Take over any session</h3>
                <p>Pick up a session you left running on your laptop, right from your phone — open it as a chat with approvals, or a real <code>claude --resume</code> shell.</p>
              </div>
            </div>
            <div className="panel">
              <div className="panel-card">
                <h3><span className="blk" />Approve every action</h3>
                <p>Inline diffs, destructive-command flags, and “always allow” when you trust it. Nothing runs without your tap.</p>
              </div>
            </div>
            <div className="panel">
              <div className="panel-card">
                <h3><span className="blk" />Built for long runs</h3>
                <p>Streaming responses, stop/interrupt, searchable transcripts, and an on-device alert the second a task needs you or finishes.</p>
              </div>
            </div>
            <div className="panel">
              <div className="panel-card">
                <h3><span className="blk" />Private by construction</h3>
                <p>A direct E2E tunnel with per-session forward secrecy. Your keys never leave the two paired devices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap"><div className="rule" /></div>

      <section>
        <div className="wrap reveal why">
          <div>
            <div className="sec-eyebrow"><span className="blk" /><span className="eyebrow">Why Cloak</span></div>
            <p className="why-quote">
              Your agent works in the open on your machine. Your traffic works in the dark.{" "}
              <em>There’s no one in the middle, because there’s no middle.</em>
            </p>
          </div>
          <div className="vs">
            <div><b>vs vendor remotes</b>No account on your phone, no cloud sync bridge — your P2P tunnel, your keys.</div>
            <div><b>vs cloud agents</b>Privacy-first, open, and self-hostable. Your prompts and code never touch a third party.</div>
            <div><b>vs SSH apps</b>A shell <span className="lime">plus</span> agent chat with tool-approval and diffs, and a live view of every Claude session on your Mac you can take over — built for agent workflows.</div>
          </div>
        </div>
      </section>

      <div className="wrap"><div className="rule" /></div>

      <section id="security">
        <div className="wrap reveal">
          <div className="sec-eyebrow"><span className="blk" /><span className="eyebrow">Security</span></div>
          <h2 className="lead">Verifiable, not just promised.</h2>
          <p className="lead-sub">
            The QR carries only a public key — no secret is ever transmitted. The shared key is
            derived per connection, and you can check the fingerprint yourself while the network tab
            stays empty.
          </p>
          <div className="chain">
            <span><b>ECDH P-256</b> pairing by QR</span>
            <span><b>AES-256-GCM</b> per message</span>
            <span><b>PIN</b> second factor</span>
            <span><b>Forward secrecy</b> per session</span>
            <span><b>Outbound-only</b> — no inbound ports</span>
          </div>
        </div>
      </section>

      <div className="wrap"><div className="rule" /></div>

      <section>
        <div className="wrap reveal">
          <div className="sec-eyebrow"><span className="blk" /><span className="eyebrow">See it run</span></div>
          <h2 className="lead">90 seconds, two devices, zero servers.</h2>
          <div className="demo-wrap">
            <div className="demo-phone">
              <div className="demo-screen">
                {/* Portrait demo recording (720×1600). #t=0.1 shows the first frame as a poster. */}
                <video src="/demo.mp4#t=0.1" controls playsInline preload="metadata" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap"><div className="rule" /></div>

      <section id="contact">
        <div className="wrap reveal contact">
          <div className="contact-copy">
            <div className="sec-eyebrow"><span className="blk" /><span className="eyebrow">Contact</span></div>
            <h2 className="lead">Questions, or want early access?</h2>
            <p className="lead-sub">
              Tell us what you&apos;re building and how you&apos;d use Cloak. We read every message and
              reply from a real person — no autoresponders.
            </p>
            <div className="contact-socials">
              <a href="https://github.com/mishraadityan09" target="_blank" rel="noreferrer noopener">
                <span className="blk" />GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/adityan-mishra-61ba18162/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="blk" />LinkedIn
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="cta">
        <div className="wrap reveal">
          <div className="wordmark" aria-label="Cloak">CLO<span className="blk" />AK</div>
          <h2>
            Your coding agent, in your pocket.
            <br />
            Your code, in the dark.
          </h2>
          <div className="term cta-term">
            <div className="term-bar">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="term-title">try it now</span>
            </div>
            <div className="term-body">
              <span className="term-cmd">
                <span className="prompt">$</span>
                <span className="cmd">npx cloak-remote</span>
              </span>
              <button className="copy" aria-label="Copy command">COPY</button>
            </div>
          </div>
          <div className="badge">Host live on npm · <b>mobile app coming soon</b></div>
        </div>
      </section>

      <Footer />
    </SmoothScroll>
  );
}

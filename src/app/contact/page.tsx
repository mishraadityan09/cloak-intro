import type { Metadata } from "next";
import { Nav } from "../Nav";
import { Footer } from "../Footer";
import { ContactForm } from "../ContactForm";

export const metadata: Metadata = {
  title: "Contact — Cloak",
  description:
    "Get in touch about Cloak — early access, bug reports, feedback, or partnerships. Send a message or email directly.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="contact-page">
        <div className="wrap">
          <header className="contact-head">
            <div className="sec-eyebrow"><span className="blk" /><span className="eyebrow">Contact</span></div>
            <h1 className="lead">Get in touch.</h1>
            <p className="lead-sub">
              Questions, early access, feedback, or just want to say hi — drop a message below or
              email me directly. I usually reply within <b>24–48 hours</b>, from a real person — no
              autoresponders.
            </p>
          </header>

          <div className="contact">
            <div className="contact-copy">
              <div className="contact-detail">
                <span className="contact-label">Email</span>
                <a className="contact-email" href="mailto:adityanmishra36@gmail.com">
                  adityanmishra36@gmail.com
                </a>
              </div>

              <div className="contact-detail">
                <span className="contact-label">What to reach out about</span>
                <ul className="contact-list">
                  <li><span className="blk" />Early access to the mobile app</li>
                  <li><span className="blk" />Bug reports &amp; product feedback</li>
                  <li><span className="blk" />Partnerships &amp; collaboration</li>
                  <li><span className="blk" />Anything else on your mind</li>
                </ul>
              </div>

              <div className="contact-detail">
                <span className="contact-label">Elsewhere</span>
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
            </div>

            <ContactForm />
          </div>

          <section className="contact-faq">
            <h2 className="lead">FAQ</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Is Cloak free?</h3>
                <p>Yes — free to use, with no account and no cloud. Just run <code>npx cloak-remote</code>.</p>
              </div>
              <div className="faq-item">
                <h3>What does it work with?</h3>
                <p>Claude Code on your Mac today. The mobile app is coming soon.</p>
              </div>
              <div className="faq-item">
                <h3>Is my code private?</h3>
                <p>
                  Yes. A direct end-to-end-encrypted tunnel — your prompts and code never touch a
                  third party, and your keys never leave your paired devices.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

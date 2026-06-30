import type { Metadata } from "next";
import { Nav } from "../Nav";
import { Footer } from "../Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Cloak",
  description:
    "How Cloak handles your data. Cloak is a private, self-hosted remote for your coding agent — no account, no cloud, and a direct end-to-end-encrypted tunnel between your own devices.",
};

// Plain-language privacy policy for the Cloak mobile app and this site. Cloak's
// architecture (no account, no cloud, E2E tunnel between the user's own devices)
// means there is essentially no server-side collection of personal data — the
// policy below states exactly that. Keep claims aligned with the product.
export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="contact-page">
        <div className="wrap">
          <header className="contact-head legal">
            <div className="sec-eyebrow"><span className="blk" /><span className="eyebrow">Legal</span></div>
            <h1 className="lead">Privacy Policy</h1>
            <p className="lead-sub">
              Cloak is built so that your data stays on your own devices. There is no account, no
              cloud server that stores your content, and no tracking inside the app. This page
              explains exactly what that means.
            </p>
            <p className="legal-updated">Last updated: 30 June 2026</p>
          </header>

          <div className="legal-body">
            <section>
              <h2>Who this applies to</h2>
              <p>
                This policy covers the <strong>Cloak</strong> mobile app and this website
                (collectively, &ldquo;Cloak&rdquo;). Cloak is a private remote for your coding agent.
                A host agent runs on your own machine, where Claude Code is already logged in, and the
                app on your phone drives it &mdash; a chat view to approve or reject the agent&rsquo;s
                edits and commands, and a full terminal mirror. Your phone authenticates to{" "}
                <strong>your machine</strong>, never to Claude or to any vendor cloud we run.
              </p>
              <p>
                Cloak is operated by Adityan Mishra (&ldquo;we&rdquo;, &ldquo;us&rdquo;). If you have
                any questions, contact us at{" "}
                <a href="mailto:adityanmishra36@gmail.com">adityanmishra36@gmail.com</a>.
              </p>
            </section>

            <section>
              <h2>The short version</h2>
              <ul>
                <li><span className="blk" />We do not require an account or any sign-up.</li>
                <li><span className="blk" />We do not run a cloud server that stores your terminal sessions, prompts, code, or chat. Your session history lives on your own machine.</li>
                <li><span className="blk" />Traffic between your phone and your machine is end-to-end encrypted with AES-256-GCM (above TLS), so the connecting tunnel cannot read its contents.</li>
                <li><span className="blk" />Your code and your Claude credentials never leave the host machine &mdash; only encrypted chat and tool input/output flow over the wire.</li>
                <li><span className="blk" />Your encryption keys are generated on, and never leave, your paired devices.</li>
                <li><span className="blk" />There is no advertising, no third-party analytics SDK, and no tracking inside the app, and we never sell or share your personal data.</li>
              </ul>
            </section>

            <section>
              <h2>How the connection works</h2>
              <p>
                You pair your phone and your machine by scanning a QR code. Pairing uses an ECDH
                P-256 key exchange &mdash; no secret key is ever transmitted &mdash; and every message
                after that is encrypted with AES-256-GCM. To reach your machine from anywhere, the app
                connects through a free outbound tunnel (Cloudflare Tunnel); your machine opens no
                inbound ports. Because the payload is end-to-end encrypted before it enters the tunnel,
                the tunnel provider relays only ciphertext and cannot read your content.
              </p>
            </section>

            <section>
              <h2>Data the app handles</h2>
              <p>
                To do its job, the app processes the following &mdash; on your device and in transit
                between your own devices, not on servers we operate:
              </p>
              <ul>
                <li>
                  <span className="blk" />
                  <span>
                    <strong>Pairing keys and identifiers.</strong> When you link a device, encryption
                    keys and a pairing identifier are stored locally in your operating system&rsquo;s
                    secure storage (Keychain / Keystore). These stay on your devices.
                  </span>
                </li>
                <li>
                  <span className="blk" />
                  <span>
                    <strong>Session content.</strong> The chat, terminal output, prompts, code, and
                    any photos or screenshots you attach are relayed end-to-end encrypted between your
                    phone and your machine. We cannot read this content, and it is not stored on any
                    server we operate. Session history is kept on your own machine.
                  </span>
                </li>
                <li>
                  <span className="blk" />
                  <span>
                    <strong>Paired-device labels.</strong> So you can manage and revoke access, your
                    machine keeps a list of paired devices and optional labels you set. This list is
                    stored on your machine, not by us.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2>Permissions the app asks for</h2>
              <ul>
                <li>
                  <span className="blk" />
                  <span>
                    <strong>Camera</strong> &mdash; used only to scan your agent&rsquo;s pairing QR
                    code. The image is processed on your device and is not uploaded or retained.
                  </span>
                </li>
                <li>
                  <span className="blk" />
                  <span>
                    <strong>Photos</strong> &mdash; used only when you choose to attach a photo or
                    screenshot to your chat so the agent on your machine can see it. It is sent over
                    the encrypted tunnel to your machine, not to us.
                  </span>
                </li>
                <li>
                  <span className="blk" />
                  <span>
                    <strong>Face ID / biometrics</strong> &mdash; used only to unlock the app on your
                    device. Biometric data is handled entirely by your operating system and never
                    reaches us.
                  </span>
                </li>
                <li>
                  <span className="blk" />
                  <span>
                    <strong>Notifications</strong> &mdash; Cloak shows local, on-device notifications,
                    triggered by events arriving over your existing encrypted connection. The app does
                    not register a remote push token and sends nothing to any third-party push service.
                  </span>
                </li>
                <li>
                  <span className="blk" />
                  <span>
                    <strong>Run-in-background (Android foreground service)</strong> &mdash; used only
                    to keep your encrypted connection alive while you are using a session.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2>What we do not collect</h2>
              <p>
                The Cloak app does not collect personal information for advertising, contains no
                third-party advertising or analytics SDKs, and does not build a profile of you. We do
                not collect your location or contacts, and we do not access your photos beyond a single
                image you explicitly choose to attach.
              </p>
            </section>

            <section>
              <h2>This website</h2>
              <p>
                This marketing website uses privacy-friendly, aggregate analytics (Vercel Analytics)
                to understand overall traffic. It does not use cookies to identify you personally. If
                you send us a message through the contact form, we use the details you provide solely
                to reply to you.
              </p>
            </section>

            <section>
              <h2>Data retention &amp; deletion</h2>
              <p>
                Because your session content and history live on your own devices and are not stored
                on our servers, you control them directly. On the phone, uninstalling the app clears
                the keys held in secure storage; on your machine, you can revoke a paired device at any
                time and delete the host&rsquo;s local session history. Any message you send us by
                email is kept only as long as needed to handle your request.
              </p>
            </section>

            <section>
              <h2>Children</h2>
              <p>
                Cloak is a developer tool and is not directed to children under 13, and we do not
                knowingly collect personal information from them.
              </p>
            </section>

            <section>
              <h2>Changes to this policy</h2>
              <p>
                If we make material changes to this policy, we will update the date at the top of
                this page. Continued use of Cloak after an update means you accept the revised policy.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                Questions about your privacy or this policy? Email{" "}
                <a href="mailto:adityanmishra36@gmail.com">adityanmishra36@gmail.com</a> or use the{" "}
                <a href="/contact">contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Shared iOS phone mockup running the Cloak chat screen. Used by the hero (the static
// "beauty shot") and the pinned "Watch it work" scene (whose inner UI is animated on scroll).
// Server component — pure markup, no client JS.
export function PhoneMock() {
  return (
    <div className="phone">
      <div className="screen">
        <div className="island" />

        <div className="statusbar">
          <span className="sb-time">9:41</span>
          <span className="sb-icons">
            <span className="sb-sig"><i /><i /><i /><i /></span>
            <svg width="16" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 18.5a2 2 0 100 4 2 2 0 000-4zM4.9 12.4a10 10 0 0114.2 0l-2.1 2.1a7 7 0 00-10 0zM1.4 8.9a15 15 0 0121.2 0l-2.1 2.1a12 12 0 00-17 0z" />
            </svg>
            <span className="sb-bat"><i /></span>
          </span>
        </div>

        <div className="appbar">
          <span className="menu">≡</span>
          <span className="beacon" />
          <span className="hwrap">
            <span className="htitle">cloak</span>
            <span className="hsub">CONNECTED · ~/agent</span>
          </span>
          <span className="spill">
            <i className="spill-dot" />
            <span className="spill-labs">
              <span className="spill-lab spill-run">RUNNING</span>
              <span className="spill-lab spill-done">DONE</span>
            </span>
          </span>
          <span className="grow" />
          <span className="tog">☀</span>
          <span className="tog">⌕</span>
        </div>

        <div className="tabbar">
          <div className="tab">TERMINAL</div>
          <div className="tab active">CHAT</div>
          <div className="tab-underline" />
        </div>

        <div className="chatpane">
          <div className="ubub">add a health-check endpoint and run the tests</div>
          <div className="abub">On it — adding the route, then running the tests.</div>
          <div className="tool">
            <div className="tool-stripe" />
            <div className="tool-h">CLAUDE WANTS TO · EDIT FILE</div>
            <div className="tool-target">src/server.ts</div>
            <div className="dbox">
              <div className="dline ctx">{"  app.listen(3000)"}</div>
              <div className="dline del">{"- // TODO: health check"}</div>
              <div className="dline add">{"+ app.get('/health', () => ok())"}</div>
            </div>
            <div className="always"><span className="check" />Always allow this session</div>
            <div className="tool-btns">
              <span className="tbtn deny">DENY</span>
              <span className="tbtn allow">ALLOW</span>
            </div>
          </div>
        </div>

        <div className="inputbar">
          <span className="field">Message Claude…</span>
          <span className="send">▸</span>
        </div>

        <div className="home-ind" />
      </div>
    </div>
  );
}

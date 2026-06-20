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

        <div className="chatzone">
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

          {/* "Take over any session" screen — hidden in the hero, revealed by the Watch-it-work scroll */}
          <div className="takeover" aria-hidden="true">
            <div className="to-head">SESSIONS · ON THIS LAPTOP</div>
            <div className="to-list">
              <div className="to-group">LIVE</div>
              <div className="to-row">
                <span className="to-ico" />
                <div className="to-text">
                  <span className="to-name">flightsmojo / web</span>
                  <span className="to-sub">~/work/flightsmojo · main · 2m</span>
                </div>
                <span className="to-pill"><i className="to-dot" />RUNNING</span>
              </div>
              <div className="to-row">
                <span className="to-ico" />
                <div className="to-text">
                  <span className="to-name">pocket-claude</span>
                  <span className="to-sub">~/nx/pocket-claude · 1h</span>
                </div>
                <span className="to-pill idle"><i className="to-dot" />IDLE</span>
              </div>
            </div>
            <div className="to-sheet">
              <div className="to-grip" />
              <div className="to-stitle">flightsmojo / web</div>
              <div className="to-action"><span className="to-aico" /><span className="to-alabel">Observe — read-only</span><span className="to-chev">›</span></div>
              <div className="to-action"><span className="to-aico" /><span className="to-alabel">Resume as chat</span><span className="to-chev">›</span></div>
              <div className="to-action hot"><span className="to-aico" /><span className="to-alabel">Resume in terminal</span><span className="to-chev">›</span></div>
            </div>
          </div>
        </div>

        <div className="home-ind" />
      </div>
    </div>
  );
}

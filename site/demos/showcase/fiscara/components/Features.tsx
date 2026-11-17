import { connections } from "../data/content";
import { trace } from "./Circuit";
import type { Point } from "./Circuit";
import { ApprovalFlow, AuditLog, ForecastChart } from "./FeatureWidgets";
import { Label, MarkPetals } from "./Mark";

function Receipt() {
  return (
    <div className="fs-receipt" aria-hidden="true">
      <div className="fs-receipt-paper">
        <p className="fs-receipt-shop">Oakmere Catering</p>
        <p className="fs-receipt-meta">Feb 04, 2026 · 13:42 · Table 7</p>
        <ul>
          <li>
            <span>Working lunch × 6</span>
            <span>438.00</span>
          </li>
          <li>
            <span>Soft drinks</span>
            <span>41.50</span>
          </li>
          <li>
            <span>Service 12.5%</span>
            <span>59.94</span>
          </li>
          <li>
            <span>Tax</span>
            <span>14.15</span>
          </li>
        </ul>
        <p className="fs-receipt-total">
          <span>Total</span>
          <span>$553.59</span>
        </p>
        <i className="fs-receipt-scan" />
      </div>
      <ul className="fs-receipt-fields">
        <li>
          <small>merchant</small>
          <b>Oakmere Catering</b>
        </li>
        <li>
          <small>amount</small>
          <b>$553.59</b>
        </li>
        <li>
          <small>account</small>
          <b>6730 Dining &amp; Drinks</b>
        </li>
        <li data-good="true">
          <small>confidence</small>
          <b>96%</b>
        </li>
      </ul>
    </div>
  );
}

function Connections() {
  const left = connections.slice(0, 3);
  const right = connections.slice(3);
  const ys = [44, 150, 256];
  const lines: Point[][] = [
    [[128, 44], [166, 44], [166, 136], [180, 136]],
    [[128, 150], [180, 150]],
    [[128, 256], [166, 256], [166, 164], [180, 164]],
    [[292, 44], [254, 44], [254, 136], [240, 136]],
    [[292, 150], [240, 150]],
    [[292, 256], [254, 256], [254, 164], [240, 164]],
  ];
  return (
    <svg className="fs-hub" viewBox="0 0 420 300" role="img" aria-label={`Fiscara connects to ${connections.join(", ").toLowerCase()}`}>
      <g fill="none" stroke="#c6c2b3" strokeWidth="2.2">
        {lines.map((line, index) => (
          <path key={index} d={trace(line, 13)} />
        ))}
      </g>
      <g fill="none" className="fs-signals">
        {lines.map((line, index) => (
          <path key={index} d={trace(line, 13)} pathLength={100} style={{ animationDuration: "4.6s", animationDelay: `${index * -0.77}s` }} />
        ))}
      </g>
      {[left, right].map((group, side) =>
        group.map((name, index) => (
          <g key={name} transform={`translate(${side ? 292 : 8} ${ys[index] - 15})`}>
            <rect x="1" y="4" width="118" height="30" rx="7" fill="#8e8672" opacity="0.22" />
            <rect width="120" height="30" rx="7" fill="#dbd7ca" stroke="#eeebe0" />
            <rect x="10" y="11.5" width="7" height="7" rx="1.5" fill={side ? "#7c3539" : "#949a89"} />
            <text x="25" y="19.3">{name}</text>
          </g>
        )),
      )}
      <g transform="translate(210 150)">
        <rect x="-29" y="-22" width="58" height="58" rx="14" fill="#8e8672" opacity="0.3" />
        <rect x="-30" y="-30" width="60" height="60" rx="14" fill="#dedacd" stroke="#f0ede2" />
        <g transform="scale(0.76)" fill="#050100">
          <MarkPetals />
        </g>
      </g>
    </svg>
  );
}

export function Features() {
  return (
    <section className="fs-features" id="features" aria-labelledby="fs-features-title">
      <header className="fs-head">
        <div>
          <Label>Features</Label>
          <h2 className="fs-title" id="fs-features-title">
            Controls that run themselves, <span>so your team can run the numbers.</span>
          </h2>
        </div>
        <p>
          Five parts of the month that usually live in inboxes and spreadsheets, rebuilt as rules you set once. Try them: every panel below is
          working demonstration data.
        </p>
      </header>

      <div className="fs-bento">
        <article className="fs-card fs-card-dark fs-card-approvals">
          <div className="fs-card-copy">
            <small>/01/</small>
            <h3>Approvals that follow your policy</h3>
            <p>Limits, cost centres and two-person rules are set once and enforced on every payment.</p>
          </div>
          <ApprovalFlow />
        </article>

        <article className="fs-card fs-card-receipts">
          <div className="fs-card-copy">
            <small>/02/</small>
            <h3>Receipts captured at the source</h3>
            <p>Staff forward or photograph a receipt; the line is coded and attached before they are back at their desk.</p>
          </div>
          <Receipt />
        </article>

        <article className="fs-card fs-card-hub">
          <div className="fs-card-copy">
            <small>/03/</small>
            <h3>Connected to what you already run</h3>
            <p>Feeds arrive on their own, so nobody exports a file to start the day.</p>
          </div>
          <Connections />
        </article>

        <article className="fs-card fs-card-dark fs-card-forecast">
          <div className="fs-card-copy">
            <small>/04/</small>
            <h3>Cash forecast, thirteen weeks out</h3>
            <p>Committed spend, payroll and expected receipts in one rolling view that updates daily.</p>
          </div>
          <ForecastChart />
        </article>

        <article className="fs-card fs-card-audit">
          <div className="fs-card-copy">
            <small>/05/</small>
            <h3>An audit trail on everything</h3>
            <p>Who changed what, when and why, exportable for your auditors without a spreadsheet hunt.</p>
          </div>
          <AuditLog />
        </article>
      </div>
    </section>
  );
}

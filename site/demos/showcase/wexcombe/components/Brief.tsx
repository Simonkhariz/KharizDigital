import { office } from "../data/content";
import { Label } from "./Bits";
import { BriefForm } from "./Interactive";

/** Closing call to action: a dark green panel with the confidential brief form. */
export function Brief() {
  return (
    <section className="wx-section wx-section--last" id="brief" aria-labelledby="wx-brief-title">
      <div className="wx-brief">
        <div className="wx-brief__text">
          <Label>Start a search</Label>
          <h2 id="wx-brief-title">
            Tell us about the role.
            <br />
            <span>A partner replies within a day.</span>
          </h2>
          <p>Every first conversation is confidential, including the fact that it happened.</p>
          <dl>
            <div>
              <dt>Telephone</dt>
              <dd>{office.phone}</dd>
            </div>
            <div>
              <dt>Office</dt>
              <dd>{office.address.slice(1).join(", ")}</dd>
            </div>
          </dl>
        </div>
        <BriefForm />
      </div>
    </section>
  );
}

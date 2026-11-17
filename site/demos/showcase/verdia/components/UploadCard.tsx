"use client";

import { FileText, Plus, X } from "lucide-react";
import { useState } from "react";

const samples = [
  { name: "bloodtest_march.jpg", size: "1.4 MB" },
  { name: "lipid_panel.pdf", size: "0.3 MB" },
  { name: "thyroid_results.pdf", size: "0.2 MB" },
];

/** Step 1: a stand-in for the upload screen. "Add" attaches the next sample file; nothing leaves the page. */
export function UploadCard() {
  const [count, setCount] = useState(1);
  const files = samples.slice(0, count);

  return (
    <div className="vd-upload">
      <button type="button" className="vd-upload-add" onClick={() => setCount((value) => Math.min(samples.length, value + 1))} disabled={count >= samples.length}>
        <Plus size={16} aria-hidden="true" />
        {count >= samples.length ? "All sample files added" : "Add"}
      </button>
      <ul aria-live="polite" aria-label="Attached sample files">
        {files.map((file, index) => (
          <li key={file.name}>
            <span aria-hidden="true">
              <FileText size={15} />
            </span>
            <strong>{file.name}</strong>
            <em>{file.size}</em>
            {index === files.length - 1 && (
              <button type="button" aria-label={`Remove ${file.name}`} onClick={() => setCount((value) => value - 1)}>
                <X size={11} aria-hidden="true" />
              </button>
            )}
          </li>
        ))}
        {files.length === 0 && <li className="vd-upload-empty">No file attached yet</li>}
      </ul>
    </div>
  );
}

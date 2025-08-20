import React, { useState } from "react";
import type { UseCase } from "../lib/types";

function copy(text: string) {
  navigator.clipboard?.writeText(text);
}

export default function UseCaseSection({ uc }: { uc: UseCase }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="card">
      <div className="kv" onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        <div className="sectionTitle">{uc.name}</div>
        <span className="small">({uc.endpoints.length} endpoints)</span>
      </div>

      {open && (
        <div className="grid" style={{ gap: 8 }}>
          {uc.endpoints.map((ep, i) => (
            <div key={i} className="endpoint">
              <div className="small">{ep.action.toUpperCase()}</div>
              <div style={{ wordBreak: "break-all" }}>{ep.url}</div>
              <div className="kv small">
                <span className="copy" onClick={() => copy(ep.url)}>Copy</span> • <span>{ep.path}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

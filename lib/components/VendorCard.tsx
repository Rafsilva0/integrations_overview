import React, { useState } from "react";
import type { Vendor } from "../lib/types";
import UseCaseSection from "./UseCaseSection";

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  const [expanded, setExpanded] = useState(false);
  const total = vendor.useCases.reduce((sum, u) => sum + u.endpoints.length, 0);

  return (
    <div className="card">
      <div className="kv" style={{ justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{vendor.vendor}</div>
          <div className="small">{vendor.domains.join(", ")}</div>
        </div>
        <div className="badge">{total} endpoints</div>
      </div>
      <hr className="hr" />
      <div className="grid" style={{ gap: 10 }}>
        {(expanded ? vendor.useCases : vendor.useCases.slice(0, 2)).map((uc, i) => (
          <UseCaseSection key={i} uc={uc} />
        ))}
      </div>
      {vendor.useCases.length > 2 && (
        <div style={{ marginTop: 8 }}>
          <button className="button" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show less" : `See all use cases (${vendor.useCases.length})`}
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { loadCatalog } from "../lib/loadData";
import type { Catalog, Vendor } from "../lib/types";
import { formatNumber } from "../lib/format";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Stats() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  useEffect(() => { loadCatalog().then(setCatalog); }, []);

  const vendorsWithCounts = useMemo(() => {
    if (!catalog) return [] as Array<{ vendor: Vendor; count: number }>;
    return catalog.vendors
      .map((v) => ({ vendor: v, count: v.useCases.reduce((s, u) => s + u.endpoints.length, 0) }))
      .sort((a, b) => b.count - a.count);
  }, [catalog]);

  const top = vendorsWithCounts.slice(0, 25);
  const data = {
    labels: top.map((t) => t.vendor.vendor),
    datasets: [{ label: "Endpoints", data: top.map((t) => t.count) }],
  };

  const totalEndpoints = vendorsWithCounts.reduce((s, t) => s + t.count, 0);

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1 className="h1">Stats</h1>
          <div className="lead">Top vendors and totals computed from the current catalog JSON.</div>
        </div>
        <nav className="nav">
          <Link className="" href="/">Home</Link>
          <Link className="active" href="/stats">Stats</Link>
        </nav>
      </div>

      {!catalog && <div className="small">Loading…</div>}

      {catalog && (
        <div className="grid" style={{ gap: 16 }}>
          <div className="card">
            <div className="sectionTitle">Headlines</div>
            <div className="kv small">Vendors: <b>{formatNumber(catalog.vendors.length)}</b></div>
            <div className="kv small">Total endpoints: <b>{formatNumber(totalEndpoints)}</b></div>
          </div>

          <div className="card">
            <div className="sectionTitle">Top 25 vendors (by endpoints)</div>
            <Bar
              data={data}
              options={{ responsive: true, plugins: { legend: { display: false } }, maintainAspectRatio: false }}
              height={360}
            />
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { loadCatalog } from "../lib/loadData";
import type { Catalog, Vendor } from "../lib/types";
import SearchBar from "../components/SearchBar";
import VendorCard from "../components/VendorCard";

export default function Home() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCatalog().then((c) => {
      setCatalog(c);
      setLoading(false);
    });
  }, []);

  const fuse = useMemo(() => {
    if (!catalog) return null;
    return new Fuse(catalog.vendors, {
      includeScore: true,
      threshold: 0.33,
      keys: [
        "vendor",
        "domains",
        { name: "useCases.name", weight: 0.6 },
        { name: "useCases.endpoints.url", weight: 0.4 }
      ]
    });
  }, [catalog]);

  const filtered: Vendor[] = useMemo(() => {
    if (!catalog) return [];
    if (!q.trim()) return catalog.vendors.slice(0, 50); // show first 50
    if (!fuse) return [];
    return fuse.search(q).slice(0, 50).map((r) => r.item);
  }, [catalog, q, fuse]);

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1 className="h1">Ada Integration Explorer</h1>
          <div className="lead">
            Search vendors, browse use cases, copy endpoints. Beeceptor/Mocky/test URLs already filtered.
          </div>
        </div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/stats">Stats</Link>
        </nav>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <SearchBar value={q} onChange={setQ} placeholder="Search: Shopify, Canada Post, DHL, ‘order status’, etc." />
      </div>

      {loading && <div className="small">Loading…</div>}

      <div className="grid grid-3">
        {filtered.map((v, i) => (
          <VendorCard key={i} vendor={v} />
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="card small">
          No results. Try another term (vendor name, domain, use case, or endpoint URL).
        </div>
      )}
    </div>
  );
}

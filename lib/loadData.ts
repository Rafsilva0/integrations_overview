import type { Catalog, SearchIndex } from "./types";

export async function loadCatalog(): Promise<Catalog> {
  const res = await fetch("/data/ada_integrations_catalog.json", { cache: "no-store" });
  return res.json();
}

export async function loadIndex(): Promise<SearchIndex> {
  const res = await fetch("/data/ada_integrations_search_index.json", { cache: "no-store" });
  return res.json();
}

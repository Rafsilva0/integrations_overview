export function formatNumber(n: number) {
  return new Intl.NumberFormat().format(n);
}

export function clip(s: string, max = 100) {
  if (!s) return s;
  return s.length > max ? s.slice(0, max) + "…" : s;
}

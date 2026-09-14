export const formatCompactCurrency = (value: number) => value >= 1_000_000 ? `$${(value / 1_000_000).toFixed(value % 1_000_000 ? 1 : 0)}M` : value >= 1_000 ? `$${Math.round(value / 1_000)}K` : `$${value}`;
export const formatFiledAt = (value: string) => new Intl.DateTimeFormat('en-US', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit', timeZone:'UTC' }).format(new Date(value));

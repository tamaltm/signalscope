export const formatCompactCurrency = (value: number) => value >= 1_000_000 ? `$${(value / 1_000_000).toFixed(value % 1_000_000 ? 1 : 0)}M` : value >= 1_000 ? `$${Math.round(value / 1_000)}K` : `$${value}`;
export const formatFiledAt = (value: string) => new Intl.DateTimeFormat('en-US', { month:'short', day:'numeric', year:'numeric', hour:'2-digit', minute:'2-digit', hour12: false, timeZone:'UTC' }).format(new Date(value));
export const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', minimumFractionDigits:2, maximumFractionDigits:2 }).format(value);
export const formatShares = (value: number) => new Intl.NumberFormat('en-US').format(value);
export const formatDate = (value: string) => new Intl.DateTimeFormat('en-US', { month:'short', day:'numeric', year:'numeric', timeZone:'UTC' }).format(new Date(value));

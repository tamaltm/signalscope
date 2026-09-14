import { formatCompactCurrency, formatCurrency, formatDate, formatFiledAt, formatShares } from '../src/utils/formatters';

describe('trade detail formatters', () => {
  it('formats compact trade values', () => {
    expect(formatCompactCurrency(2_400_000)).toBe('$2.4M');
    expect(formatCompactCurrency(480_000)).toBe('$480K');
  });

  it('formats exact currency and share counts', () => {
    expect(formatCurrency(142.5)).toBe('$142.50');
    expect(formatCurrency(2_400_000)).toBe('$2,400,000.00');
    expect(formatShares(12_500)).toBe('12,500');
  });

  it('formats transaction and filing dates in UTC', () => {
    expect(formatDate('2026-09-11')).toBe('Sep 11, 2026');
    expect(formatFiledAt('2026-09-11T09:24:00Z')).toBe('Sep 11, 2026, 09:24');
  });
});

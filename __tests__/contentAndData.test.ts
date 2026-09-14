import { REQUIRED_DISCLAIMER } from '../src/constants/content';
import { mockTrades } from '../src/data/mockTrades';

describe('assignment content constraints', () => {
  it('keeps the required disclaimer exact', () => {
    expect(REQUIRED_DISCLAIMER).toBe(
      'This prototype uses mock data for demonstration only. Insider-trading filings are public disclosures and do not constitute investment advice. Past activity does not guarantee future stock performance.',
    );
  });

  it('ships at least eight unique fictional records with seven chart points', () => {
    expect(mockTrades.length).toBeGreaterThanOrEqual(8);
    expect(new Set(mockTrades.map(trade => trade.id)).size).toBe(mockTrades.length);
    expect(new Set(mockTrades.map(trade => trade.company)).size).toBe(mockTrades.length);
    expect(mockTrades.every(trade => trade.activity.length === 7)).toBe(true);
  });

  it('keeps transaction codes and calculated totals internally consistent', () => {
    for (const trade of mockTrades) {
      expect(trade.transactionCode).toBe(trade.type === 'purchase' ? 'P' : 'S');
      expect(trade.value).toBe(trade.shares * trade.pricePerShare);
      expect(trade.activity.every(value => value >= 0)).toBe(true);
    }
  });
});

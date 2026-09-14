import { mockTrades } from '../src/data/mockTrades';
import { filterTrades, summarizeTrades } from '../src/utils/filterTrades';
describe('filterTrades',()=>{
  it('matches ticker and company case-insensitively',()=>{expect(filterTrades(mockTrades,{query:'nova',type:'all',role:'all',minimumValue:0}).map(x=>x.id)).toEqual(['nova-01']);expect(filterTrades(mockTrades,{query:'HEALTH LABS',type:'all',role:'all',minimumValue:0}).map(x=>x.id)).toEqual(['elio-02'])});
  it('combines filters',()=>expect(filterTrades(mockTrades,{query:'',type:'purchase',role:'Director',minimumValue:500000}).map(x=>x.id)).toEqual(['volt-03']));
  it('supports empty results',()=>expect(filterTrades(mockTrades,{query:'missing',type:'all',role:'all',minimumValue:0})).toHaveLength(0));
});
describe('summaries',()=>it('derives totals',()=>expect(summarizeTrades(mockTrades)).toEqual({count:9,purchases:5310000,sales:2670000})));

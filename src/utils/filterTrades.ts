import { InsiderRole, InsiderTrade, TransactionType } from '../types/trade';
export type TradeFilters = { query:string; type:TransactionType|'all'; role:Exclude<InsiderRole,'Officer'>|'all'; minimumValue:number };
export const defaultTradeFilters: TradeFilters = { query:'', type:'all', role:'all', minimumValue:0 };
export const filterTrades = (trades: readonly InsiderTrade[], filters: TradeFilters) => { const q=filters.query.trim().toLowerCase(); return trades.filter(t => (!q || t.ticker.toLowerCase().includes(q) || t.company.toLowerCase().includes(q)) && (filters.type==='all'||t.type===filters.type) && (filters.role==='all'||t.role===filters.role) && t.value>=filters.minimumValue); };
export const summarizeTrades = (trades: readonly InsiderTrade[]) => trades.reduce((s,t)=>({count:s.count+1,purchases:s.purchases+(t.type==='purchase'?t.value:0),sales:s.sales+(t.type==='sale'?t.value:0)}),{count:0,purchases:0,sales:0});
export const getLatestTrades = (trades: readonly InsiderTrade[], limit = 4) => [...trades].sort((a,b)=>b.filedAt.localeCompare(a.filedAt)).slice(0,limit);
export const getTopSignalTrades = (trades: readonly InsiderTrade[], limit = 3) => [...trades].sort((a,b)=>b.value-a.value).filter((trade,index,all)=>all.findIndex(item=>item.signal===trade.signal)===index).slice(0,limit);

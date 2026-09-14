import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { InsiderTrade } from '../types/trade';
import { formatCompactCurrency, formatFiledAt } from '../utils/formatters';
import { SignalBadge } from './SignalBadge';

export function TradeCard({ trade, onPress }: { trade: InsiderTrade; onPress: () => void }) {
  const color = trade.type === 'purchase' ? colors.purchase : colors.sale;
  return <Pressable accessibilityRole="button" accessibilityLabel={`Open ${trade.company} ${trade.type} details`} onPress={onPress} style={({pressed})=>[styles.card,pressed&&styles.pressed]}>
    <View style={styles.row}><View style={styles.symbol}><Text style={styles.symbolText}>{trade.ticker}</Text></View><View style={styles.identity}><Text numberOfLines={1} style={styles.company}>{trade.company}</Text><Text style={styles.meta}>{trade.insider} · {trade.role}</Text></View><SignalBadge strength={trade.signalStrength} /></View>
    <View style={styles.row}><Text style={[styles.type,{color}]}>{trade.type==='purchase'?'↑ Purchase':'↓ Sale'}</Text><View style={styles.valueWrap}><Text style={styles.value}>{formatCompactCurrency(trade.value)}</Text><Text style={styles.time}>{formatFiledAt(trade.filedAt)} UTC</Text></View></View>
  </Pressable>;
}
const styles=StyleSheet.create({card:{padding:16,borderRadius:18,backgroundColor:colors.surface,borderWidth:1,borderColor:colors.border,gap:16},pressed:{opacity:.75},row:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:12},symbol:{width:48,height:48,borderRadius:14,backgroundColor:colors.surfaceRaised,alignItems:'center',justifyContent:'center'},symbolText:{color:colors.text,fontSize:13,fontWeight:'900'},identity:{flex:1,gap:4},company:{color:colors.text,fontSize:15,fontWeight:'700'},meta:{color:colors.textMuted,fontSize:12},type:{fontSize:13,fontWeight:'800'},valueWrap:{alignItems:'flex-end',gap:3},value:{color:colors.text,fontSize:18,fontWeight:'900'},time:{color:colors.textMuted,fontSize:10}});

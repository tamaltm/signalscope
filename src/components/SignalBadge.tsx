import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { radii } from '../theme/spacing';
import { InsiderTrade } from '../types/trade';

export function SignalBadge({ strength }: { strength: InsiderTrade['signalStrength'] }) {
  const color = strength === 'High' ? colors.purchase : strength === 'Medium' ? colors.analytics : colors.textMuted;
  return <View style={[styles.badge, { borderColor: color }]}><Text style={[styles.text, { color }]}>{strength}</Text></View>;
}
const styles = StyleSheet.create({ badge: { borderWidth: 1, borderRadius: radii.pill, paddingHorizontal: 8, paddingVertical: 4 }, text: { fontSize: 10, fontWeight: '900', textTransform: 'uppercase', letterSpacing: .4 } });

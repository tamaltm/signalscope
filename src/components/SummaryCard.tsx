import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/spacing';

type Props = { label: string; value: string; tone?: 'neutral' | 'purchase' | 'sale' };
export function SummaryCard({ label, value, tone = 'neutral' }: Props) {
  const toneColor = tone === 'purchase' ? colors.purchase : tone === 'sale' ? colors.sale : colors.analytics;
  return <View style={styles.card}><View style={[styles.dot, { backgroundColor: toneColor }]} /><Text style={styles.value}>{value}</Text><Text style={styles.label}>{label}</Text></View>;
}
const styles = StyleSheet.create({ card: { flex: 1, minWidth: 104, padding: spacing.md, borderRadius: radii.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, gap: spacing.xs }, dot: { width: 7, height: 7, borderRadius: 4, marginBottom: spacing.xs }, value: { color: colors.text, fontSize: 20, fontWeight: '900' }, label: { color: colors.textMuted, fontSize: 12 } });

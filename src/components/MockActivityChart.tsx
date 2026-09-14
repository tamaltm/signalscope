import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/spacing';

export function MockActivityChart({ values }: { values: readonly number[] }) {
  const safeValues = values.slice(0, 7); const maximum = Math.max(...safeValues, 1);
  return <View accessibilityRole="image" accessibilityLabel={`Mock seven-day activity: ${safeValues.join(', ')}`} style={styles.card}><Text style={styles.title}>Mock 7-day activity</Text><View style={styles.chart}>{safeValues.map((value, index) => <View key={`${index}-${value}`} style={styles.column}><View style={[styles.bar, { height: Math.max(12, (value / maximum) * 92) }]} /><Text style={styles.day}>{`D${index + 1}`}</Text></View>)}</View><Text style={styles.caption}>Illustrative local demo values · not market data</Text></View>;
}
const styles = StyleSheet.create({ card: { padding: spacing.lg, borderRadius: radii.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }, title: { color: colors.text, fontSize: 15, fontWeight: '800' }, chart: { height: 126, marginTop: spacing.lg, flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm }, column: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 6 }, bar: { width: '100%', maxWidth: 28, borderRadius: radii.sm, backgroundColor: colors.analytics }, day: { color: colors.textMuted, fontSize: 9, fontWeight: '700' }, caption: { color: colors.textMuted, fontSize: 10, marginTop: spacing.md } });

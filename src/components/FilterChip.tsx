import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/spacing';

type Props = { label: string; selected: boolean; onPress: () => void };
export function FilterChip({ label, selected, onPress }: Props) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && styles.pressed]}><Text style={[styles.text, selected && styles.selectedText]}>{label}</Text></Pressable>;
}
const styles = StyleSheet.create({ chip: { minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.lg, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface }, selected: { backgroundColor: colors.analytics, borderColor: colors.analytics }, pressed: { opacity: .72 }, text: { color: colors.textMuted, fontSize: 13, fontWeight: '700' }, selectedText: { color: colors.background, fontWeight: '900' } });

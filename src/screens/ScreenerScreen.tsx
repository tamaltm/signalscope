import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FilterChip } from '../components/FilterChip';
import { TradeCard } from '../components/TradeCard';
import { mockTrades } from '../data/mockTrades';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { defaultTradeFilters, filterTrades, TradeFilters } from '../utils/filterTrades';

type Props = NativeStackScreenProps<RootStackParamList, 'Screener'>;
type FilterOption<T> = { label: string; value: T };

const typeOptions: FilterOption<TradeFilters['type']>[] = [
  { label: 'All', value: 'all' }, { label: 'Purchases', value: 'purchase' }, { label: 'Sales', value: 'sale' },
];
const roleOptions: FilterOption<TradeFilters['role']>[] = [
  { label: 'All roles', value: 'all' }, { label: 'CEO', value: 'CEO' }, { label: 'CFO', value: 'CFO' }, { label: 'Director', value: 'Director' },
];
const valueOptions: FilterOption<number>[] = [
  { label: 'Any', value: 0 }, { label: '$100K+', value: 100_000 }, { label: '$500K+', value: 500_000 }, { label: '$1M+', value: 1_000_000 },
];

function FilterRow<T extends string | number>({ label, options, value, onChange }: { label: string; options: FilterOption<T>[]; value: T; onChange: (value: T) => void }) {
  return <View style={styles.filterGroup}><Text style={styles.filterLabel}>{label}</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>{options.map(option => <FilterChip key={String(option.value)} label={option.label} selected={option.value === value} onPress={() => onChange(option.value)} />)}</ScrollView></View>;
}

export function ScreenerScreen({ navigation, route }: Props) {
  const [filters, setFilters] = useState<TradeFilters>(defaultTradeFilters);
  const searchRef = useRef<TextInput>(null);
  const results = useMemo(() => filterTrades(mockTrades, filters), [filters]);
  const hasFilters = filters.query.trim() !== '' || filters.type !== 'all' || filters.role !== 'all' || filters.minimumValue !== 0;

  useEffect(() => {
    if (route.params?.focusSearch) {
      const timer = setTimeout(() => searchRef.current?.focus(), 350);
      return () => clearTimeout(timer);
    }
  }, [route.params?.focusSearch]);

  const patchFilters = <K extends keyof TradeFilters>(key: K, value: TradeFilters[K]) => setFilters(current => ({ ...current, [key]: value }));
  const clearFilters = () => setFilters(defaultTradeFilters);

  const header = <View>
    <Pressable accessibilityRole="button" accessibilityLabel="Go back to Market Pulse" onPress={navigation.goBack} style={styles.back}><Text style={styles.backText}>← Back</Text></Pressable>
    <Text style={styles.eyebrow}>DISCOVER · FICTIONAL DATA</Text>
    <Text style={styles.title}>Latest Trades</Text>
    <Text style={styles.intro}>Search and combine filters across locally stored demo transactions.</Text>
    <View style={styles.searchBox}><Text style={styles.searchIcon}>⌕</Text><TextInput ref={searchRef} accessibilityLabel="Search ticker or company" placeholder="Search ticker or company" placeholderTextColor={colors.textMuted} value={filters.query} onChangeText={value => patchFilters('query', value)} autoCapitalize="characters" autoCorrect={false} returnKeyType="search" style={styles.input}/>{filters.query.length > 0 && <Pressable accessibilityRole="button" accessibilityLabel="Clear search" onPress={() => patchFilters('query', '')} hitSlop={10}><Text style={styles.clearIcon}>×</Text></Pressable>}</View>
    <View style={styles.filters}>
      <FilterRow label="Transaction type" options={typeOptions} value={filters.type} onChange={value => patchFilters('type', value)} />
      <FilterRow label="Insider role" options={roleOptions} value={filters.role} onChange={value => patchFilters('role', value)} />
      <FilterRow label="Minimum value" options={valueOptions} value={filters.minimumValue} onChange={value => patchFilters('minimumValue', value)} />
    </View>
    <View style={styles.resultHeader}><Text accessibilityLiveRegion="polite" style={styles.resultCount}>{results.length} {results.length === 1 ? 'result' : 'results'}</Text>{hasFilters && <Pressable accessibilityRole="button" onPress={clearFilters} hitSlop={10}><Text style={styles.clearText}>Clear filters</Text></Pressable>}</View>
  </View>;

  return <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
    <FlatList data={results} keyExtractor={item => item.id} renderItem={({ item }) => <TradeCard trade={item} onPress={() => navigation.navigate('TradeDetails', { tradeId: item.id })}/>} ListHeaderComponent={header} ItemSeparatorComponent={() => <View style={styles.separator}/>} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyIcon}>⌕</Text><Text style={styles.emptyTitle}>No fictional demo trades match those filters.</Text><Text style={styles.emptyBody}>Try a broader search or reset every filter.</Text><Pressable accessibilityRole="button" onPress={clearFilters} style={({ pressed }) => [styles.emptyButton, pressed && styles.pressed]}><Text style={styles.emptyButtonText}>Clear filters</Text></Pressable></View>} ListFooterComponent={results.length > 0 ? <Text style={styles.footer}>All displayed records are invented and stored locally.</Text> : null}/>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background }, content: { padding: spacing.xl, paddingBottom: 44 },
  back: { minHeight: 44, alignSelf: 'flex-start', justifyContent: 'center' }, backText: { color: colors.analytics, fontWeight: '800' },
  eyebrow: { color: colors.analytics, fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginTop: spacing.sm },
  title: { color: colors.text, fontSize: 31, lineHeight: 38, fontWeight: '900', marginTop: spacing.xs },
  intro: { color: colors.textMuted, fontSize: 14, lineHeight: 21, marginTop: spacing.sm },
  searchBox: { minHeight: 54, marginTop: spacing.xl, paddingHorizontal: spacing.lg, borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center' },
  searchIcon: { color: colors.analytics, fontSize: 25, marginRight: spacing.sm }, input: { flex: 1, color: colors.text, fontSize: 15, paddingVertical: 12 }, clearIcon: { color: colors.textMuted, fontSize: 26, lineHeight: 28 },
  filters: { marginTop: spacing.xl, gap: spacing.lg }, filterGroup: { gap: spacing.sm }, filterLabel: { color: colors.text, fontSize: 12, fontWeight: '800' }, chips: { gap: spacing.sm, paddingRight: spacing.xl },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 52, marginTop: spacing.md }, resultCount: { color: colors.text, fontSize: 16, fontWeight: '900' }, clearText: { color: colors.analytics, fontSize: 13, fontWeight: '800' },
  separator: { height: spacing.md }, footer: { color: colors.textMuted, fontSize: 11, lineHeight: 17, textAlign: 'center', marginTop: spacing.xl },
  empty: { alignItems: 'center', paddingVertical: 42, paddingHorizontal: spacing.xl, borderRadius: 18, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface }, emptyIcon: { color: colors.analytics, fontSize: 38 }, emptyTitle: { color: colors.text, fontSize: 18, lineHeight: 25, fontWeight: '900', textAlign: 'center', marginTop: spacing.md }, emptyBody: { color: colors.textMuted, fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: spacing.sm }, emptyButton: { minHeight: 46, justifyContent: 'center', backgroundColor: colors.analytics, borderRadius: 14, paddingHorizontal: spacing.xl, marginTop: spacing.xl }, emptyButtonText: { color: colors.background, fontSize: 14, fontWeight: '900' }, pressed: { opacity: .72 },
});

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MockActivityChart } from '../components/MockActivityChart';
import { Screen } from '../components/Screen';
import { SignalBadge } from '../components/SignalBadge';
import { REQUIRED_DISCLAIMER } from '../constants/content';
import { mockTrades } from '../data/mockTrades';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/spacing';
import { formatCompactCurrency, formatCurrency, formatDate, formatFiledAt, formatShares } from '../utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'TradeDetails'>;

function Metric({ label, value, accent }: { label: string; value: string; accent?: 'purchase' | 'sale' }) {
  const color = accent === 'purchase' ? colors.purchase : accent === 'sale' ? colors.sale : colors.text;
  return <View style={styles.metric}><Text style={styles.metricLabel}>{label}</Text><Text style={[styles.metricValue, { color }]}>{value}</Text></View>;
}

export function TradeDetailsScreen({ route, navigation }: Props) {
  const trade = mockTrades.find(item => item.id === route.params.tradeId);

  if (!trade) {
    return <Screen testID="trade-details-missing"><Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={navigation.goBack} style={styles.back}><Text style={styles.backText}>← Back</Text></Pressable><View style={styles.missing}><Text style={styles.missingIcon}>!</Text><Text style={styles.missingTitle}>Fictional trade unavailable</Text><Text style={styles.missingBody}>This local demo record could not be found. Return to the previous screen and choose another trade.</Text><Pressable accessibilityRole="button" onPress={navigation.goBack} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>Return to trades</Text></Pressable></View></Screen>;
  }

  const isPurchase = trade.type === 'purchase';
  const transactionColor = isPurchase ? colors.purchase : colors.sale;
  const transactionText = isPurchase ? 'Purchase ↑' : 'Sale ↓';

  return <Screen testID="trade-details-screen">
    <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={navigation.goBack} style={styles.back}><Text style={styles.backText}>← Back</Text></Pressable>
    <View style={styles.companyHeader}><View style={styles.symbol}><Text style={styles.symbolText}>{trade.ticker}</Text></View><View style={styles.companyCopy}><Text style={styles.company}>{trade.company}</Text><Text style={styles.sector}>{trade.ticker} · {trade.sector}</Text></View></View>
    <View style={styles.demoBadge}><Text style={styles.demoText}>● FICTIONAL DEMO DATA</Text></View>

    <View style={styles.signalCard}>
      <View style={styles.signalHeader}><Text style={[styles.signalEyebrow, { color: transactionColor }]}>{transactionText}</Text><SignalBadge strength={trade.signalStrength}/></View>
      <Text style={styles.signalTitle}>{trade.signal}</Text>
      <Text style={styles.signalValue}>{formatCompactCurrency(trade.value)} fictional demo insider {isPurchase ? 'buy' : 'sale'}</Text>
    </View>

    <Text style={styles.sectionTitle}>Transaction details</Text>
    <View style={styles.metricGrid}>
      <Metric label="Insider" value={`${trade.insider} · ${trade.role}`}/>
      <Metric label="Transaction" value={`${transactionText} · Code ${trade.transactionCode}`} accent={trade.type}/>
      <Metric label="Shares" value={`${formatShares(trade.shares)} shares`}/>
      <Metric label="Price per share" value={`${formatCurrency(trade.pricePerShare)} (demo)`}/>
      <Metric label="Total value" value={`${formatCurrency(trade.value)} (demo)`}/>
      <Metric label="Signal strength" value={`${trade.signalStrength} · ${trade.signal}`}/>
      <Metric label="Transaction date" value={formatDate(trade.transactionDate)}/>
      <Metric label="Filed date" value={`${formatFiledAt(trade.filedAt)} UTC`}/>
    </View>

    <View style={styles.chart}><MockActivityChart values={trade.activity}/></View>

    <View style={styles.education}>
      <Text style={styles.educationEyebrow}>WHY THIS MATTERS</Text>
      <Text style={styles.educationTitle}>One disclosed action is a research clue, not a prediction.</Text>
      <Text style={styles.educationBody}>{isPurchase ? 'A senior insider purchase can be a useful data point because it records a transaction by someone close to a company. It does not reveal that person’s full financial situation or predict future performance.' : 'An insider sale can happen for many personal or financial reasons. The disclosure adds context for research, but it does not explain the person’s full situation or predict future performance.'}</Text>
    </View>

    <View style={styles.disclaimer} accessibilityLabel={`Disclaimer. ${REQUIRED_DISCLAIMER}`}>
      <Text style={styles.disclaimerLabel}>DEMO DISCLAIMER</Text>
      <Text style={styles.disclaimerText}>{REQUIRED_DISCLAIMER}</Text>
    </View>
  </Screen>;
}

const styles = StyleSheet.create({
  back: { minHeight: 44, alignSelf: 'flex-start', justifyContent: 'center' }, backText: { color: colors.analytics, fontWeight: '800' }, pressed: { opacity: .72 },
  companyHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.md }, symbol: { width: 58, height: 58, borderRadius: radii.lg, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.border }, symbolText: { color: colors.text, fontSize: 15, fontWeight: '900', letterSpacing: .7 }, companyCopy: { flex: 1, gap: spacing.xs }, company: { color: colors.text, fontSize: 28, lineHeight: 34, fontWeight: '900' }, sector: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  demoBadge: { alignSelf: 'flex-start', backgroundColor: colors.warningBg, paddingHorizontal: 10, paddingVertical: 7, borderRadius: radii.pill, marginTop: spacing.md }, demoText: { color: '#CBC2FF', fontSize: 10, fontWeight: '900', letterSpacing: .5 },
  signalCard: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radii.lg, padding: spacing.xl, marginTop: spacing.xl }, signalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md }, signalEyebrow: { fontSize: 12, fontWeight: '900' }, signalTitle: { color: colors.text, fontSize: 22, lineHeight: 28, fontWeight: '900', marginTop: spacing.lg }, signalValue: { color: colors.textMuted, fontSize: 14, lineHeight: 21, marginTop: spacing.sm },
  sectionTitle: { color: colors.text, fontSize: 19, fontWeight: '900', marginTop: spacing.xxl, marginBottom: spacing.md }, metricGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, metric: { flexGrow: 1, flexBasis: 155, minHeight: 82, padding: spacing.md, borderRadius: radii.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, gap: 7 }, metricLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: .4 }, metricValue: { fontSize: 14, lineHeight: 20, fontWeight: '800' },
  chart: { marginTop: spacing.xxl }, education: { marginTop: spacing.xxl, padding: spacing.xl, borderRadius: radii.lg, backgroundColor: colors.surfaceRaised }, educationEyebrow: { color: colors.analytics, fontSize: 10, fontWeight: '900', letterSpacing: 1.3 }, educationTitle: { color: colors.text, fontSize: 18, lineHeight: 25, fontWeight: '900', marginTop: spacing.sm }, educationBody: { color: colors.textMuted, fontSize: 14, lineHeight: 22, marginTop: spacing.md },
  disclaimer: { marginTop: spacing.lg, padding: spacing.lg, borderRadius: radii.md, borderWidth: 1, borderColor: '#665F99', backgroundColor: colors.warningBg }, disclaimerLabel: { color: '#CBC2FF', fontSize: 10, fontWeight: '900', letterSpacing: 1.2 }, disclaimerText: { color: colors.text, fontSize: 12, lineHeight: 19, marginTop: spacing.sm },
  missing: { alignItems: 'center', padding: spacing.xxl, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, marginTop: spacing.xxl }, missingIcon: { width: 44, height: 44, borderRadius: 22, textAlign: 'center', textAlignVertical: 'center', color: colors.sale, borderWidth: 1, borderColor: colors.sale, fontSize: 22, fontWeight: '900' }, missingTitle: { color: colors.text, fontSize: 20, fontWeight: '900', marginTop: spacing.lg, textAlign: 'center' }, missingBody: { color: colors.textMuted, fontSize: 14, lineHeight: 21, marginTop: spacing.sm, textAlign: 'center' }, primaryButton: { minHeight: 46, justifyContent: 'center', paddingHorizontal: spacing.xl, borderRadius: radii.md, backgroundColor: colors.analytics, marginTop: spacing.xl }, primaryButtonText: { color: colors.background, fontWeight: '900' },
});

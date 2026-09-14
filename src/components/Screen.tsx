import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = PropsWithChildren<{ contentStyle?: ViewStyle; testID?: string }>;

export function Screen({ children, contentStyle, testID }: Props) {
  return <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']} testID={testID}>
    <ScrollView contentContainerStyle={[styles.content, contentStyle]} showsVerticalScrollIndicator={false}>{children}</ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, content: { padding: spacing.xl, paddingBottom: 40 } });

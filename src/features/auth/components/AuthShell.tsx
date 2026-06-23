import type { PropsWithChildren } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '@/constants/Colors';

type AuthShellProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  const hasSubtitle = Boolean(subtitle?.trim());

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.root}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.brandBlock}>
            <Image
              source={require('../../../../assets/images/icon-escoply.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandName}>escoply</Text>
            <Text style={styles.tagline}>
              Do briefing à entrega, tudo no controle.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            {hasSubtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

            <View style={styles.form}>{children}</View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 56,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 76,
    height: 76,
    borderRadius: 22,
    marginBottom: 16,
  },
  brandName: {
    color: colors.primary,
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: 0,
  },
  tagline: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 8,
    maxWidth: 260,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  form: {
    marginTop: 24,
  },
});

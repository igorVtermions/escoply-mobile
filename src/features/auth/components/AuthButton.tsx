import type { PropsWithChildren } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/Colors';

type AuthButtonProps = PropsWithChildren<{
  onPress?: () => void;
  loading?: boolean;
}>;

export function AuthButton({ children, onPress, loading = false }: AuthButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      style={[styles.button, loading && styles.buttonDisabled]}
      disabled={loading}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.label}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    borderColor: colors.primaryDark,
    borderWidth: 1,
    elevation: 3,
    height: 50,
    justifyContent: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.72,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

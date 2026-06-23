import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/Colors';
import type { ToastState, ToastVariant } from '@/src/hooks/useToast';

type AppToastProps = {
  toast: ToastState | null;
  onClose: () => void;
};

const variantConfig: Record<
  ToastVariant,
  {
    accent: string;
    background: string;
    icon: keyof typeof Ionicons.glyphMap;
  }
> = {
  success: {
    accent: colors.success,
    background: '#F0FDF4',
    icon: 'checkmark-circle-outline',
  },
  info: {
    accent: colors.info,
    background: '#EFF6FF',
    icon: 'information-circle-outline',
  },
  warning: {
    accent: colors.warning,
    background: '#FFFBEB',
    icon: 'alert-circle-outline',
  },
  danger: {
    accent: colors.danger,
    background: '#FEF2F2',
    icon: 'close-circle-outline',
  },
};

export function AppToast({ toast, onClose }: AppToastProps) {
  if (!toast) {
    return null;
  }

  const variant = toast.variant ?? 'info';
  const config = variantConfig[variant];

  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Fechar aviso"
        onPress={onClose}
        style={[styles.toast, { backgroundColor: config.background }]}
      >
        <View style={[styles.icon, { backgroundColor: config.accent }]}>
          <Ionicons color="#FFFFFF" name={config.icon} size={18} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{toast.title}</Text>
          {toast.message ? <Text style={styles.message}>{toast.message}</Text> : null}
        </View>

        <Ionicons color={colors.textLight} name="close-outline" size={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    left: 0,
    paddingHorizontal: 20,
    position: 'absolute',
    right: 0,
    top: 52,
    zIndex: 20,
  },
  toast: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 4,
  },
  icon: {
    alignItems: 'center',
    borderRadius: 999,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  content: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  message: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
});


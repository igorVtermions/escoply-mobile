import { colors } from "@/constants/Colors";
import { AppToast } from "@/src/components/feedback/AppToast";
import { AuthButton } from "@/src/features/auth/components/AuthButton";
import { AuthField } from "@/src/features/auth/components/AuthField";
import { AuthLink } from "@/src/features/auth/components/AuthLink";
import { AuthShell } from "@/src/features/auth/components/AuthShell";
import { useToast } from "@/src/hooks/useToast";
import { StyleSheet, Text, View } from "react-native";

export default function ForgotPasswordScreen() {
  const { toast, showToast, hideToast } = useToast();

  function handlePasswordReset() {
    showToast({
      title: "Recuperação em configuração",
      message:
        "O envio do link pelo Supabase será adicionado no próximo passo.",
      variant: "info",
    });
  }

  return (
    <>
      <AuthShell
        title="Recuperar senha"
        subtitle="Informe seu e-mail para receber as instruções de redefinição de senha."
      >
        <View style={styles.formStack}>
          <AuthField
            label="E-mail"
            placeholder="email@example.com"
            keyboardType="email-address"
            textContentType="emailAddress"
          />

          <AuthButton onPress={handlePasswordReset}>Enviar link</AuthButton>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Lembrou a senha?</Text>
            <AuthLink href="./login">Entrar</AuthLink>
          </View>
        </View>
      </AuthShell>
      <AppToast toast={toast} onClose={hideToast} />
    </>
  );
}

const styles = StyleSheet.create({
  formStack: {
    gap: 16,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    marginTop: 8,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 14,
  },
});

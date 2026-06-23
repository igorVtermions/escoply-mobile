import { colors } from "@/constants/Colors";
import { AppToast } from "@/src/components/feedback/AppToast";
import { AuthButton } from "@/src/features/auth/components/AuthButton";
import { AuthField } from "@/src/features/auth/components/AuthField";
import { AuthLink } from "@/src/features/auth/components/AuthLink";
import { AuthShell } from "@/src/features/auth/components/AuthShell";
import { useToast } from "@/src/hooks/useToast";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  function handleLogin() {
    showToast({
      title: "Login em configuração",
      message: "A conexão com o Supabase será adicionada no próximo passo.",
      variant: "info",
    });
  }

  return (
    <>
      <AuthShell title="Entrar">
        <View style={styles.formStack}>
          <AuthField
            label="E-mail"
            placeholder="email@example.com"
            keyboardType="email-address"
            textContentType="emailAddress"
          />

          <View>
            <AuthField
              label="Senha"
              placeholder="Sua senha"
              secureTextEntry={!showPassword}
              textContentType="password"
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                showPassword ? "Ocultar senha" : "Mostrar senha"
              }
              style={styles.passwordToggle}
              onPress={() => setShowPassword((current) => !current)}
            >
              <Ionicons
                color={colors.textMuted}
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
              />
            </Pressable>
          </View>

          <View style={styles.alignEnd}>
            <AuthLink href="./forgot-password">Esqueci minha senha</AuthLink>
          </View>

          <AuthButton onPress={handleLogin}>Entrar</AuthButton>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Ainda não tem conta?</Text>
            <AuthLink href="./register">Criar conta</AuthLink>
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
  passwordToggle: {
    bottom: 15,
    padding: 4,
    position: "absolute",
    right: 12,
  },
  alignEnd: {
    alignItems: "flex-end",
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

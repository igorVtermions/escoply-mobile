import { colors } from "@/constants/Colors";
import { AppToast } from "@/src/components/feedback/AppToast";
import { AuthButton } from "@/src/features/auth/components/AuthButton";
import { AuthField } from "@/src/features/auth/components/AuthField";
import { AuthLink } from "@/src/features/auth/components/AuthLink";
import { AuthShell } from "@/src/features/auth/components/AuthShell";
import { useToast } from "@/src/hooks/useToast";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatBirthDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function getBirthDate(value: string) {
  const [day, month, year] = value.split("/").map(Number);

  if (!day || !month || !year || year < 1900) {
    return null;
  }

  const birthDate = new Date(year, month - 1, day);
  const isValidDate =
    birthDate.getFullYear() === year &&
    birthDate.getMonth() === month - 1 &&
    birthDate.getDate() === day;

  return isValidDate ? birthDate : null;
}

function isAtLeastAge(birthDate: Date, minimumAge: number) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age >= minimumAge;
}

function getPasswordRules(password: string) {
  return [
    { label: "8 caracteres ou mais", valid: password.length >= 8 },
    {
      label: "Letra maiúscula e minúscula",
      valid: /[A-Z]/.test(password) && /[a-z]/.test(password),
    },
    { label: "Número", valid: /\d/.test(password) },
    { label: "Símbolo especial", valid: /[^A-Za-z0-9]/.test(password) },
  ];
}

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const passwordRules = getPasswordRules(password);
  const hasStrongPassword = passwordRules.every((rule) => rule.valid);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  function handleRegister() {
    const parsedBirthDate = getBirthDate(birthDate);
    const phoneDigits = phone.replace(/\D/g, "");

    if (name.trim().length < 2) {
      showToast({
        title: "Nome inválido",
        message: "Informe seu nome para criar a conta.",
        variant: "warning",
      });
      return;
    }

    if (!emailRegex.test(email.trim())) {
      showToast({
        title: "E-mail inválido",
        message: "Informe um e-mail válido para continuar.",
        variant: "warning",
      });
      return;
    }

    if (phoneDigits.length < 10) {
      showToast({
        title: "Telefone inválido",
        message: "Informe um telefone com DDD.",
        variant: "warning",
      });
      return;
    }

    if (!parsedBirthDate) {
      showToast({
        title: "Data inválida",
        message: "Use o formato dd/mm/aaaa.",
        variant: "warning",
      });
      return;
    }

    if (!isAtLeastAge(parsedBirthDate, 16)) {
      showToast({
        title: "Cadastro não permitido",
        message: "É necessário ter pelo menos 16 anos para criar uma conta.",
        variant: "danger",
      });
      return;
    }

    if (!hasStrongPassword) {
      showToast({
        title: "Senha fraca",
        message: "Use uma senha com letras, número, símbolo e pelo menos 8 caracteres.",
        variant: "warning",
      });
      return;
    }

    if (!passwordsMatch) {
      showToast({
        title: "Senhas diferentes",
        message: "Confirme a senha digitando exatamente o mesmo valor.",
        variant: "warning",
      });
      return;
    }

    if (!acceptedTerms) {
      showToast({
        title: "Aceite obrigatório",
        message: "Leia e aceite os termos de uso para continuar.",
        variant: "warning",
      });
      return;
    }

    showToast({
      title: "Cadastro validado",
      message: "A criação de conta com Supabase será adicionada no próximo passo.",
      variant: "success",
    });
  }

  function acceptTerms() {
    setAcceptedTerms(true);
    setTermsVisible(false);
  }

  return (
    <>
      <AuthShell
        title="Criar conta"
        subtitle="Comece organizando seus clientes, projetos, prazos e entregas em um só lugar."
      >
        <View style={styles.formStack}>
          <AuthField
            label="Nome"
            placeholder="Seu nome"
            autoCapitalize="words"
            textContentType="name"
            value={name}
            onChangeText={setName}
          />

          <AuthField
            label="E-mail"
            placeholder="email@example.com"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
          />

          <AuthField
            label="Telefone"
            placeholder="(11) 99999-9999"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            value={phone}
            onChangeText={(value) => setPhone(formatPhone(value))}
          />

          <AuthField
            label="Data de nascimento"
            placeholder="dd/mm/aaaa"
            keyboardType="number-pad"
            value={birthDate}
            onChangeText={(value) => setBirthDate(formatBirthDate(value))}
          />

          <View>
            <AuthField
              label="Senha"
              placeholder="Crie uma senha forte"
              secureTextEntry={!showPassword}
              textContentType="newPassword"
              value={password}
              onBlur={() => setPasswordFocused(false)}
              onChangeText={setPassword}
              onFocus={() => setPasswordFocused(true)}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
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

          {passwordFocused ? (
            <View style={styles.passwordRules}>
              {passwordRules.map((rule) => (
                <View key={rule.label} style={styles.passwordRule}>
                  <Ionicons
                    color={rule.valid ? colors.success : colors.textLight}
                    name={rule.valid ? "checkmark-circle" : "ellipse-outline"}
                    size={16}
                  />
                  <Text style={[styles.passwordRuleText, rule.valid && styles.passwordRuleTextValid]}>
                    {rule.label}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          <View>
            <AuthField
              label="Confirmar senha"
              placeholder="Digite a senha novamente"
              secureTextEntry={!showPassword}
              textContentType="newPassword"
              value={confirmPassword}
              onBlur={() => setConfirmPasswordFocused(false)}
              onChangeText={setConfirmPassword}
              onFocus={() => setConfirmPasswordFocused(true)}
            />
            {confirmPasswordFocused ? (
              <View style={styles.confirmHint}>
                <Ionicons
                  color={passwordsMatch ? colors.success : colors.textLight}
                  name={passwordsMatch ? "checkmark-circle" : "ellipse-outline"}
                  size={16}
                />
                <Text style={[styles.passwordRuleText, passwordsMatch && styles.passwordRuleTextValid]}>
                  As senhas devem ser iguais
                </Text>
              </View>
            ) : null}
          </View>

          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: acceptedTerms }}
            onPress={() => setAcceptedTerms((current) => !current)}
            style={styles.termsRow}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
              {acceptedTerms ? <Ionicons color="#FFFFFF" name="checkmark" size={14} /> : null}
            </View>
            <Text style={styles.termsText}>
              Li e aceito os{" "}
              <Text style={styles.termsLink} onPress={() => setTermsVisible(true)}>
                termos de uso
              </Text>
              .
            </Text>
          </Pressable>

          <AuthButton onPress={handleRegister}>Criar conta</AuthButton>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem conta?</Text>
            <AuthLink href="./login">Entrar</AuthLink>
          </View>
        </View>
      </AuthShell>

      <Modal
        animationType="slide"
        transparent
        visible={termsVisible}
        onRequestClose={() => setTermsVisible(false)}
      >
        <Pressable style={styles.sheetBackdrop} onPress={() => setTermsVisible(false)}>
          <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Termos de uso</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Fechar termos de uso"
                onPress={() => setTermsVisible(false)}
                style={styles.sheetClose}
              >
                <Ionicons color={colors.textMuted} name="close-outline" size={22} />
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.sheetContent}>
              <Text style={styles.sheetText}>
                Ao criar sua conta no Escoply, você concorda em usar o app para organizar seus
                próprios clientes, projetos, escopos, prazos, materiais e compromissos.
              </Text>
              <Text style={styles.sheetText}>
                Você é responsável pelas informações cadastradas e deve manter seus dados de acesso
                em segurança. O Escoply poderá armazenar dados necessários para autenticação,
                organização do trabalho e funcionamento do serviço.
              </Text>
              <Text style={styles.sheetText}>
                Esta é uma versão inicial dos termos para desenvolvimento do app. A versão jurídica
                final deve ser revisada antes da publicação em produção.
              </Text>
            </ScrollView>

            <AuthButton onPress={acceptTerms}>Aceitar termos</AuthButton>
          </Pressable>
        </Pressable>
      </Modal>

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
  passwordRules: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    padding: 12,
  },
  passwordRule: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  passwordRuleText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  passwordRuleTextValid: {
    color: colors.text,
    fontWeight: "700",
  },
  confirmHint: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  termsRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
  checkbox: {
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,
    height: 22,
    justifyContent: "center",
    marginTop: 1,
    width: 22,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    color: colors.textMuted,
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: "800",
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
  sheetBackdrop: {
    backgroundColor: "rgba(15, 23, 42, 0.42)",
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "78%",
    padding: 20,
  },
  sheetHandle: {
    alignSelf: "center",
    backgroundColor: colors.border,
    borderRadius: 999,
    height: 4,
    marginBottom: 18,
    width: 44,
  },
  sheetHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sheetTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
  },
  sheetClose: {
    padding: 4,
  },
  sheetContent: {
    gap: 12,
    paddingBottom: 20,
    paddingTop: 16,
  },
  sheetText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
});

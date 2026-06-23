import { Link } from 'expo-router';
import type { ComponentProps } from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '@/constants/Colors';

type AuthLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  children: string;
};

export function AuthLink({ href, children }: AuthLinkProps) {
  return (
    <Link href={href} asChild>
      <Text style={styles.link}>{children}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
});

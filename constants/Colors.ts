export const colors = {
  primary: '#071E63',
  primaryDark: '#041342',
  primaryLight: '#123A9C',
  secondary: '#8B5CF6',
  secondaryDark: '#6D28D9',
  secondaryLight: '#A78BFA',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5F9',
  text: '#0F172A',
  textMuted: '#64748B',
  textLight: '#94A3B8',
  border: '#E2E8F0',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
} as const;

export const projectStatusColors = {
  briefing: { label: 'Briefing', bg: '#F1F5F9', text: '#475569' },
  budget: { label: 'Orcamento', bg: '#FEF3C7', text: '#92400E' },
  approved: { label: 'Aprovado', bg: '#DBEAFE', text: '#1D4ED8' },
  in_progress: { label: 'Em andamento', bg: '#EDE9FE', text: '#6D28D9' },
  review: { label: 'Em revisao', bg: '#FFEDD5', text: '#C2410C' },
  done: { label: 'Concluido', bg: '#DCFCE7', text: '#15803D' },
  canceled: { label: 'Cancelado', bg: '#FEE2E2', text: '#B91C1C' },
} as const;

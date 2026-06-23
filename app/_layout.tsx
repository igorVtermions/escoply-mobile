import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import '../global.css';
import 'react-native-reanimated';
import { AuthProvider } from '@/src/providers/AuthProvider';
import { queryClient } from '@/src/lib/query-client';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}

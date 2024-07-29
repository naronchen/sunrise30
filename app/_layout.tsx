import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="DateSelection" options={{ title: 'Select Start Date' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
  );
}

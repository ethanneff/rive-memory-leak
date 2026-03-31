import { Stack } from 'expo-router';

export default function HomeStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="rive" />
      <Stack.Screen name="rive2" />
      <Stack.Screen name="rive3" />
    </Stack>
  );
}

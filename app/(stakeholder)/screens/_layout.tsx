import { Stack } from 'expo-router';

export default function StakeholderScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="support"
        options={{
          presentation: 'modal', // ✅ Enables modal presentation
        }}
      />
    </Stack>
  );
}

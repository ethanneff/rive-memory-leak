import { useRiveFile, RiveView, Fit } from '@rive-app/react-native';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Pressable } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Sample Rive animation from Rive's CDN (replace with your own .riv via require() for production)
const SAMPLE_RIVE_URL = 'https://cdn.rive.app/animations/vehicles.riv';

export default function RiveScreen() {
  const insets = useSafeAreaInsets();
  const { riveFile, isLoading, error } = useRiveFile(SAMPLE_RIVE_URL);

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
          <IconSymbol name="chevron.left" size={24} color="#0A7EA4" />
          <ThemedText type="defaultSemiBold">Back</ThemedText>
        </Pressable>
        <ThemedText type="subtitle">Rive</ThemedText>
      </View>
      <View style={styles.content}>
        {isLoading && <ThemedText>Loading animation…</ThemedText>}
        {error && <ThemedText>Failed to load: {String(error)}</ThemedText>}
        {riveFile && (
          <RiveView
            file={riveFile}
            fit={Fit.Contain}
            autoPlay
            style={styles.rive}
          />
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  rive: {
    width: '100%',
    flex: 1,
    minHeight: 200,
  },
});

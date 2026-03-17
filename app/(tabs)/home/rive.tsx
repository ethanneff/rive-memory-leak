import { useRiveFile, RiveView, Fit } from "@rive-app/react-native";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SAMPLE_RIVE_URL = "https://cdn.rive.app/animations/vehicles.riv";

export default function RiveScreen() {
  const insets = useSafeAreaInsets();
  const { riveFile, isLoading, error } = useRiveFile(SAMPLE_RIVE_URL);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>Rive</Text>
      </View>
      <View style={styles.content}>
        {isLoading && <Text>Loading animation…</Text>}
        {error && <Text>Failed to load: {String(error)}</Text>}
        {riveFile && (
          <RiveView
            file={riveFile}
            fit={Fit.Contain}
            autoPlay
            style={styles.rive}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A7EA4",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  rive: {
    width: "100%",
    flex: 1,
    minHeight: 200,
  },
});

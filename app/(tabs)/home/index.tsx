import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      </View>
      <View style={styles.stepContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.riveButton,
            pressed && styles.riveButtonPressed,
          ]}
          onPress={() => router.push("/home/rive")}
        >
          <Text style={styles.riveButtonText}>Open Rive (default)</Text>
          <Text style={styles.riveButtonText}>▶</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.riveButton,
            pressed && styles.riveButtonPressed,
          ]}
          onPress={() => router.push("/home/rive2")}
        >
          <Text style={styles.riveButtonText}>
            Open Rive 2 (referenced assets)
          </Text>
          <Text style={styles.riveButtonText}>▶</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.riveButton,
            pressed && styles.riveButtonPressed,
          ]}
          onPress={() => router.push("/home/rive3")}
        >
          <Text style={styles.riveButtonText}>Open Rive 3 (custom)</Text>
          <Text style={styles.riveButtonText}>▶</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  header: {
    minHeight: 120,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  riveButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  riveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  riveButtonPressed: {
    opacity: 0.7,
  },
});

import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function StateView({ title, message, actionLabel, onAction, loading = false }) {
  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator color="#0f766e" size="large" /> : null}
      <Text selectable style={styles.title}>
        {title}
      </Text>
      {message ? (
        <Text selectable style={styles.message}>
          {message}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <TouchableOpacity activeOpacity={0.82} onPress={onAction} style={styles.button}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    minHeight: 240,
    padding: 24,
  },
  title: {
    color: "#0f172a",
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
  },
  message: {
    color: "#64748b",
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 320,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0f766e",
    borderCurve: "continuous",
    borderRadius: 8,
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
});

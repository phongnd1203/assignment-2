import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { formatCurrency } from "../utils/format";

export function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  const { product, quantity } = item;

  return (
    <View style={styles.card}>
      <Image
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={{ uri: product.thumbnail }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text numberOfLines={2} selectable style={styles.title}>
          {product.title}
        </Text>
        <Text selectable style={styles.price}>
          {formatCurrency(product.price)}
        </Text>

        <View style={styles.controlsRow}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() => onDecrement(product.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text selectable style={styles.quantityText}>
              {quantity}
            </Text>
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() => onIncrement(product.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => onRemove(product.id)}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderCurve: "continuous",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 12,
  },
  image: {
    backgroundColor: "#f8fafc",
    borderCurve: "continuous",
    borderRadius: 8,
    height: 96,
    width: 88,
  },
  content: {
    flex: 1,
    gap: 8,
    minWidth: 0,
  },
  title: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 20,
  },
  price: {
    color: "#be123c",
    fontSize: 15,
    fontVariant: ["tabular-nums"],
    fontWeight: "800",
  },
  controlsRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  quantityControls: {
    alignItems: "center",
    borderColor: "#cbd5e1",
    borderCurve: "continuous",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 38,
    overflow: "hidden",
  },
  quantityButton: {
    alignItems: "center",
    backgroundColor: "#f8fafc",
    height: 38,
    justifyContent: "center",
    width: 42,
  },
  quantityButtonText: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800",
  },
  quantityText: {
    color: "#0f172a",
    fontSize: 15,
    fontVariant: ["tabular-nums"],
    fontWeight: "800",
    minWidth: 38,
    textAlign: "center",
  },
  removeButton: {
    alignItems: "center",
    backgroundColor: "#fff1f2",
    borderCurve: "continuous",
    borderRadius: 8,
    minHeight: 38,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  removeButtonText: {
    color: "#be123c",
    fontSize: 13,
    fontWeight: "800",
  },
});

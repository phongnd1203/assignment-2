import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { formatCurrency } from "../utils/format";

export function PriceSummary({ itemCount, totalPrice, onCheckout, onClear }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text selectable style={styles.label}>
          Items
        </Text>
        <Text selectable style={styles.value}>
          {itemCount}
        </Text>
      </View>
      <View style={styles.row}>
        <Text selectable style={styles.totalLabel}>
          Total
        </Text>
        <Text selectable style={styles.totalValue}>
          {formatCurrency(totalPrice)}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity activeOpacity={0.82} onPress={onCheckout} style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.82} onPress={onClear} style={styles.clearButton}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0f172a",
    borderCurve: "continuous",
    borderRadius: 8,
    gap: 12,
    padding: 16,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: "#cbd5e1",
    fontSize: 14,
    fontWeight: "700",
  },
  value: {
    color: "#ffffff",
    fontSize: 14,
    fontVariant: ["tabular-nums"],
    fontWeight: "800",
  },
  totalLabel: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },
  totalValue: {
    color: "#5eead4",
    fontSize: 22,
    fontVariant: ["tabular-nums"],
    fontWeight: "900",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  checkoutButton: {
    alignItems: "center",
    backgroundColor: "#14b8a6",
    borderCurve: "continuous",
    borderRadius: 8,
    flex: 1,
    minHeight: 44,
    justifyContent: "center",
  },
  checkoutText: {
    color: "#042f2e",
    fontSize: 14,
    fontWeight: "900",
  },
  clearButton: {
    alignItems: "center",
    backgroundColor: "#334155",
    borderCurve: "continuous",
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  clearText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
});

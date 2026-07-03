import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { formatCategory, formatCurrency } from "../utils/format";

export function ProductCard({ product, onPress, onAddToCart }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <TouchableOpacity
      activeOpacity={0.84}
      onPress={() => onPress(product)}
      style={styles.card}
    >
      <View style={styles.imageFrame}>
        {imageLoading ? (
          <ActivityIndicator color="#0f766e" style={styles.imageLoader} />
        ) : null}
        <Image
          accessibilityIgnoresInvertColors
          onLoadEnd={() => setImageLoading(false)}
          resizeMode="contain"
          source={{ uri: product.thumbnail }}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text numberOfLines={2} selectable style={styles.title}>
          {product.title}
        </Text>
        <Text numberOfLines={1} selectable style={styles.meta}>
          {formatCategory(product.category)} · Rating {product.rating}
        </Text>

        <View style={styles.footer}>
          <Text selectable style={styles.price}>
            {formatCurrency(product.price)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={(event) => {
              event.stopPropagation();
              onAddToCart(product);
            }}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderCurve: "continuous",
    borderRadius: 8,
    borderWidth: 1,
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
    flexDirection: "row",
    gap: 12,
    minHeight: 148,
    padding: 12,
  },
  imageFrame: {
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderCurve: "continuous",
    borderRadius: 8,
    height: 118,
    justifyContent: "center",
    overflow: "hidden",
    width: 112,
  },
  imageLoader: {
    position: "absolute",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  content: {
    flex: 1,
    gap: 7,
    justifyContent: "space-between",
    minWidth: 0,
  },
  title: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 21,
  },
  meta: {
    color: "#64748b",
    fontSize: 12,
    lineHeight: 16,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  price: {
    color: "#be123c",
    fontSize: 17,
    fontVariant: ["tabular-nums"],
    fontWeight: "800",
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#0f766e",
    borderCurve: "continuous",
    borderRadius: 8,
    minHeight: 40,
    minWidth: 72,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
});

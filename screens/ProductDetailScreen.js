import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { useCart } from "../hooks/useCart";
import { formatCategory, formatCurrency } from "../utils/format";

export function ProductDetailScreen({ product, onBack, onOpenCart }) {
  const { addToCart, itemCount } = useCart();
  const [imageLoading, setImageLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { width } = useWindowDimensions();

  const imageHeight = Math.min(360, Math.max(240, width * 0.72));

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <View style={styles.topRow}>
        <TouchableOpacity activeOpacity={0.82} onPress={onBack} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.82} onPress={onOpenCart} style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Cart</Text>
          <Text selectable style={styles.cartBadge}>
            {itemCount}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.imageFrame, { height: imageHeight }]}>
        {imageLoading ? (
          <ActivityIndicator color="#0f766e" size="large" style={styles.imageLoader} />
        ) : null}
        <Image
          accessibilityIgnoresInvertColors
          onLoadEnd={() => setImageLoading(false)}
          resizeMode="contain"
          source={{ uri: product.thumbnail }}
          style={styles.image}
        />
      </View>

      <View style={styles.detailBlock}>
        <Text selectable style={styles.category}>
          {formatCategory(product.category)}
        </Text>
        <Text selectable style={styles.title}>
          {product.title}
        </Text>
        <Text selectable style={styles.price}>
          {formatCurrency(product.price)}
        </Text>
        <Text selectable style={styles.description}>
          {product.description}
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.stat}>
          <Text selectable style={styles.statLabel}>
            Rating
          </Text>
          <Text selectable style={styles.statValue}>
            {product.rating}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text selectable style={styles.statLabel}>
            Stock
          </Text>
          <Text selectable style={styles.statValue}>
            {product.stock}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text selectable style={styles.statLabel}>
            Discount
          </Text>
          <Text selectable style={styles.statValue}>
            {product.discountPercentage}%
          </Text>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.84} onPress={handleAddToCart} style={styles.addButton}>
        <Text style={styles.addButtonText}>{added ? "Added to cart" : "Add to cart"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
    flex: 1,
  },
  content: {
    gap: 18,
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 54,
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#cbd5e1",
    borderCurve: "continuous",
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "800",
  },
  cartButton: {
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderCurve: "continuous",
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    minHeight: 42,
    paddingHorizontal: 14,
  },
  cartButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
  cartBadge: {
    backgroundColor: "#14b8a6",
    borderRadius: 999,
    color: "#042f2e",
    fontSize: 12,
    fontVariant: ["tabular-nums"],
    fontWeight: "900",
    minWidth: 24,
    overflow: "hidden",
    paddingHorizontal: 7,
    paddingVertical: 3,
    textAlign: "center",
  },
  imageFrame: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderCurve: "continuous",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  imageLoader: {
    position: "absolute",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  detailBlock: {
    gap: 8,
  },
  category: {
    color: "#0f766e",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    color: "#0f172a",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 36,
  },
  price: {
    color: "#be123c",
    fontSize: 26,
    fontVariant: ["tabular-nums"],
    fontWeight: "900",
  },
  description: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  stat: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderCurve: "continuous",
    borderRadius: 8,
    borderWidth: 1,
    flexGrow: 1,
    gap: 5,
    minWidth: 96,
    padding: 14,
  },
  statLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "800",
  },
  statValue: {
    color: "#0f172a",
    fontSize: 18,
    fontVariant: ["tabular-nums"],
    fontWeight: "900",
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#0f766e",
    borderCurve: "continuous",
    borderRadius: 8,
    minHeight: 52,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },
});

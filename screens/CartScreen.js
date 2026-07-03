import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CartItem } from "../components/CartItem";
import { PriceSummary } from "../components/PriceSummary";
import { StateView } from "../components/StateView";
import { useCart } from "../hooks/useCart";

export function CartScreen({ onBack, onShop }) {
  const {
    clearCart,
    decrementQuantity,
    incrementQuantity,
    itemCount,
    items,
    removeFromCart,
    totalPrice,
  } = useCart();

  function handleCheckout() {
    Alert.alert("Checkout", "Your cart is ready for checkout.");
  }

  function renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity activeOpacity={0.82} onPress={onBack} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.82} onPress={onShop} style={styles.shopButton}>
            <Text style={styles.shopButtonText}>Shop</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleBlock}>
          <Text selectable style={styles.eyebrow}>
            Your Cart
          </Text>
          <Text selectable style={styles.title}>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Text>
        </View>
      </View>
    );
  }

  function renderFooter() {
    if (items.length === 0) {
      return null;
    }

    return (
      <PriceSummary
        itemCount={itemCount}
        onCheckout={handleCheckout}
        onClear={clearCart}
        totalPrice={totalPrice}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        contentInsetAdjustmentBehavior="automatic"
        data={items}
        keyExtractor={(item) => String(item.product.id)}
        ListEmptyComponent={
          <StateView
            actionLabel="Browse products"
            message="Add products from the catalog and totals will update here."
            onAction={onShop}
            title="Your cart is empty"
          />
        }
        ListFooterComponent={renderFooter}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onDecrement={decrementQuantity}
            onIncrement={incrementQuantity}
            onRemove={removeFromCart}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
    flex: 1,
  },
  listContent: {
    gap: 14,
    paddingBottom: 28,
    paddingHorizontal: 16,
    paddingTop: 54,
  },
  header: {
    gap: 14,
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
  shopButton: {
    alignItems: "center",
    backgroundColor: "#0f766e",
    borderCurve: "continuous",
    borderRadius: 8,
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  shopButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },
  titleBlock: {
    gap: 3,
  },
  eyebrow: {
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
  },
});

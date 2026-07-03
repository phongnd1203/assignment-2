import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { CartProvider } from "./context/CartContext";
import { CartScreen } from "./screens/CartScreen";
import { ProductDetailScreen } from "./screens/ProductDetailScreen";
import { ProductListScreen } from "./screens/ProductListScreen";

function AppContent() {
  const [activeScreen, setActiveScreen] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState(null);

  function openProducts() {
    setActiveScreen("products");
  }

  function openCart() {
    setActiveScreen("cart");
  }

  function openProductDetail(product) {
    setSelectedProduct(product);
    setActiveScreen("detail");
  }

  function goBackToProducts() {
    setActiveScreen("products");
  }

  if (activeScreen === "cart") {
    return <CartScreen onBack={goBackToProducts} onShop={openProducts} />;
  }

  if (activeScreen === "detail" && selectedProduct) {
    return (
      <ProductDetailScreen
        onBack={goBackToProducts}
        onOpenCart={openCart}
        product={selectedProduct}
      />
    );
  }

  return (
    <ProductListScreen onOpenCart={openCart} onSelectProduct={openProductDetail} />
  );
}

export default function App() {
  return (
    <CartProvider>
      <View style={styles.container}>
        <AppContent />
        <StatusBar style="dark" />
      </View>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
});

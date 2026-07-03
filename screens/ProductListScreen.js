import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ProductCard } from "../components/ProductCard";
import { StateView } from "../components/StateView";
import { useCart } from "../hooks/useCart";
import { fetchProducts, PAGE_SIZE } from "../services/products";

export function ProductListScreen({ onSelectProduct, onOpenCart }) {
  const { addToCart, itemCount } = useCart();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchText.trim());
    }, 350);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    async function loadInitialProducts() {
      setLoading(true);
      setError("");

      try {
        const result = await fetchProducts({
          query: debouncedQuery,
          skip: 0,
          limit: PAGE_SIZE,
          signal: controller.signal,
        });

        if (mounted) {
          setProducts(result.products);
          setTotal(result.total);
        }
      } catch (requestError) {
        if (mounted && requestError.name !== "AbortError") {
          setProducts([]);
          setTotal(0);
          setError("We could not load products. Check your connection and try again.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadInitialProducts();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [debouncedQuery]);

  const hasMore = products.length < total;

  const refreshProducts = useCallback(async () => {
    setRefreshing(true);
    setError("");

    try {
      const result = await fetchProducts({
        query: debouncedQuery,
        skip: 0,
        limit: PAGE_SIZE,
      });

      setProducts(result.products);
      setTotal(result.total);
    } catch (requestError) {
      setError("Refresh failed. Pull to try again.");
    } finally {
      setRefreshing(false);
    }
  }, [debouncedQuery]);

  const loadMoreProducts = useCallback(async () => {
    if (loading || loadingMore || refreshing || !hasMore) {
      return;
    }

    setLoadingMore(true);
    setError("");

    try {
      const result = await fetchProducts({
        query: debouncedQuery,
        skip: products.length,
        limit: PAGE_SIZE,
      });

      setProducts((currentProducts) => [...currentProducts, ...result.products]);
      setTotal(result.total);
    } catch (requestError) {
      setError("More products could not load. Scroll again or retry.");
    } finally {
      setLoadingMore(false);
    }
  }, [debouncedQuery, hasMore, loading, loadingMore, products.length, refreshing]);

  const listTitle = useMemo(
    () => (debouncedQuery ? `Results for "${debouncedQuery}"` : "Product Catalog"),
    [debouncedQuery]
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View style={styles.titleBlock}>
          <Text selectable style={styles.eyebrow}>
            Assignment Store
          </Text>
          <Text selectable style={styles.title}>
            {listTitle}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.82} onPress={onOpenCart} style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Cart</Text>
          <Text selectable style={styles.cartBadge}>
            {itemCount}
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        onChangeText={setSearchText}
        placeholder="Search products"
        placeholderTextColor="#94a3b8"
        returnKeyType="search"
        style={styles.searchInput}
        value={searchText}
      />

      {error && products.length > 0 ? (
        <View style={styles.inlineError}>
          <Text selectable style={styles.inlineErrorText}>
            {error}
          </Text>
          <TouchableOpacity activeOpacity={0.82} onPress={refreshProducts}>
            <Text style={styles.inlineRetry}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator color="#0f766e" />
          <Text selectable style={styles.footerText}>
            Loading more products
          </Text>
        </View>
      );
    }

    if (!loading && products.length > 0 && !hasMore) {
      return (
        <Text selectable style={styles.endText}>
          End of catalog
        </Text>
      );
    }

    return null;
  };

  const renderEmptyState = () => {
    if (loading) {
      return <StateView loading title="Loading products" message="Fetching the latest catalog." />;
    }

    if (error) {
      return (
        <StateView
          actionLabel="Retry"
          message={error}
          onAction={refreshProducts}
          title="Products unavailable"
        />
      );
    }

    return (
      <StateView
        title="No products found"
        message="Try a different keyword or clear the search field."
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        contentInsetAdjustmentBehavior="automatic"
        data={products}
        keyExtractor={(product) => String(product.id)}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={renderHeader}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.55}
        onRefresh={refreshProducts}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <ProductCard product={item} onAddToCart={addToCart} onPress={onSelectProduct} />
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
    gap: 12,
    justifyContent: "space-between",
  },
  titleBlock: {
    flex: 1,
    gap: 3,
    minWidth: 0,
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
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0,
  },
  cartButton: {
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderCurve: "continuous",
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    minHeight: 44,
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
  searchInput: {
    backgroundColor: "#ffffff",
    borderColor: "#cbd5e1",
    borderCurve: "continuous",
    borderRadius: 8,
    borderWidth: 1,
    color: "#0f172a",
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 14,
  },
  inlineError: {
    alignItems: "center",
    backgroundColor: "#fff1f2",
    borderColor: "#fecdd3",
    borderCurve: "continuous",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    padding: 12,
  },
  inlineErrorText: {
    color: "#9f1239",
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  inlineRetry: {
    color: "#be123c",
    fontSize: 13,
    fontWeight: "900",
  },
  footer: {
    alignItems: "center",
    gap: 8,
    padding: 16,
  },
  footerText: {
    color: "#64748b",
    fontSize: 13,
  },
  endText: {
    color: "#64748b",
    fontSize: 13,
    padding: 16,
    textAlign: "center",
  },
});

**Assignment 2 : E-Commerce Product App with Pagination and Cart State**

**Objective:**

**Build a product browsing and cart management app using real-time data fetching, pagination, and custom hooks.**

**Project Overview:  
Build an E-Commerce Product App that loads products from a public API and supports viewing product details, paginated loading, and adding/removing items from a cart with live total updates.**

**Requirements:**

- **Screens:**
  - **ProductListScreen: Fetch and display products (use pagination or infinite scroll).**
  - **ProductDetailScreen: Show product details (title, image, description, price).**
  - **CartScreen: List added products with quantity controls and price totals.**
- **Features:**
  - **Use public API like** [**FakeStoreAPI**](https://fakestoreapi.com/products) **or** [**DummyJSON**](https://dummyjson.com/products)**.**
  - **Cart management with add/remove/update quantity.**
  - **Search functionality for filter list item**
  - **Use custom useCart hook for managing cart logic.**
  - **Display real-time cart total price and item count.**
  - **Use FlatList with onEndReached for pagination.**
- **Architecture:**
  - **Use Context API or Redux to manage cart state (based on class level).**
  - **Break into atomic components (ProductCard, CartItem, PriceSummary).**
  - **Handle loading, error, and empty states gracefully.**
- **UI:**
  - **Responsive design and consistent product card layout.**
  - **Smooth image loading and press feedback (via TouchableOpacity).**
  - **Use ActivityIndicator during API calls.**

**Bonus (Optional):**

- **Cache fetched data using local storage or memory.**
- **Add a "favorites" or "wishlist" feature using custom hooks.**
- **Try to find suitable business integration that can use GeminiAI or Map or Image picker**
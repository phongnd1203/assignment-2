const API_URL = "https://dummyjson.com/products";

export const PAGE_SIZE = 10;

export async function fetchProducts({ query = "", skip = 0, limit = PAGE_SIZE, signal } = {}) {
  const trimmedQuery = query.trim();
  const endpoint = trimmedQuery ? `${API_URL}/search` : API_URL;
  const params = [`limit=${limit}`, `skip=${skip}`];

  if (trimmedQuery) {
    params.push(`q=${encodeURIComponent(trimmedQuery)}`);
  }

  const response = await fetch(`${endpoint}?${params.join("&")}`, { signal });

  if (!response.ok) {
    throw new Error(`Products request failed with status ${response.status}`);
  }

  const data = await response.json();

  return {
    products: Array.isArray(data.products) ? data.products : [],
    total: Number(data.total ?? 0),
    skip: Number(data.skip ?? skip),
    limit: Number(data.limit ?? limit),
  };
}

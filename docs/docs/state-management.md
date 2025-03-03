---
title: State Management
---

# State Management with React Query

## Why React Query?

We use **React Query** for state management due to its powerful features:

1. **Automatic Caching** – Caches API responses to improve performance.  
2. **Background Data Fetching** – Fetches updated data without blocking UI.  
3. **Optimized Performance** – Reduces unnecessary network requests.  

## Code Implementation

```tsx
const { data, isLoading, error } = useQuery(["crypto"], fetchCryptoPrices);

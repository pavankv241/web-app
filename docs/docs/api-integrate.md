---
title: API Integration
---

# API Integration

## Fetching Crypto Data

We use **React Query** along with the **CoinGecko API** to fetch real-time cryptocurrency prices.

### Code Implementation

```tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCryptoPrices = async () => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
  );
  return data;
};

const { data, isLoading, error } = useQuery(["crypto"], fetchCryptoPrices);

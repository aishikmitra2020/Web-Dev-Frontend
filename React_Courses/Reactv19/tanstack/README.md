# TanStack Query
It's a library that helps you manage the state of data you fetch from servers, like APIs, in your React applications.
One of the most powerful tools for managing server-side state in React.

## Advantages
1. **Data Fetching Made Easy:** With a simple useQuery hook, fetching data becomes super easy.
2. **Built-in Loading and Error States:** No need to write custom code for handling loading, errors, or success states.
3. **Automatic Caching:** React Query automatically caches your data.
4. **Background Refetching:** If your data gets stale or out of date, TanStack Query can refetch it in the background.
5. **Pagination and Infinite Scrolling:** Handling pagination or infinite scrolling? React Query has you covered with tools specifically designed for those complex use cases.

> It is used in place of `useState`, `useEffect`, `contextAPI` while fetching data from backend APIs

### Verdict
TanStack Query makes working with server-side data in React a breeze. It's fast, efficient, and reduces the amount of boilerplate code you need to write. If you're working on any app that relies on API data, this tool is an absolute game-changer.

> React Query (now officially known as TanStack Query)

## Installation
```bash
npm i @tanstack/react-query
```

## Setup
```js
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/Layouts/MainLayout'
import Home from './components/Pages/Home'
import FetchOld from './components/Pages/FetchOld'
import FetchRQ from './components/Pages/FetchRQ'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// create a router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/trad",
        element: <FetchOld />
      },
      {
        path: "/rq",
        element: <FetchRQ />
      }
    ]
  },
])

const App = () => {

  const queryClient = new QueryClient();

  return (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
  </QueryClientProvider>
  );
}

export default App
```
In React Query, the QueryClientProvider is a crucial component that provides a QueryClient instance to your React application. This QueryClient is responsible for managing all the data fetching, caching, and state management related to your queries.

### QueryClient
- **QueryClient:** It is the core part of the react-query library. It manages the caching, background fetching, data synchronization, and other query-related logic. It provides a centralized store for managing and caching asynchronous data in your application.

- **new QueryClient():** This creates a new QueryClient instance with default settings. You can configure it with options if needed (e.g., setting cache time, stale time, etc.).

- **QueryClientProvider:** This component is part of react-query and is used to provide the QueryClient instance to your entire React app (or a portion of it). This makes the query client available via React's context API so that all the components in the tree can [use] the useQuery, useMutation, and other hooks provided by react-query.

---

# Fetch API data using TanStack Query
## React Query (`useQuery`) & Axios Integration Guide

This repository demonstrates how to integrate **TanStack Query (v5)** with **Axios** to fetch, manage, and render asynchronous data in a React application.

---

## Table of Contents
- [Overview](#overview)
- [Code Architecture](#code-architecture)
  - [1. API Service Layer (`api.js`)](#1-api-service-layer-apijs)
  - [2. React Component (`FetchRQ.jsx`)](#2-react-component-fetchrqjsx)
- [How `useQuery` Works](#how-usequery-works)
- [Arguments Accepted by `useQuery`](#arguments-accepted-by-usequery)
- [Return Values of `useQuery`](#return-values-of-usequery)

---

## Overview

Managing asynchronous server state in React can be complex when relying solely on `useEffect` and `useState`. **TanStack Query (React Query)** simplifies this process by acting as an asynchronous state manager. Combined with **Axios**, it manages request lifecycles, caching, deduplication, error handling, and background revalidation out of the box.

---

## Code Architecture

### 1. API Service Layer (`api.js`)

The API layer establishes an Axios instance directed at the JSONPlaceholder API and exposes modular fetcher functions.

```javascript
import axios from "axios";

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Low-level request function returning the raw response promise
export const getPosts = async () => {
  const res = await api.get("/posts");
  return res;
};

// High-level wrapper function extracting only the needed data
export const fetchPosts = async () => {
  const res = await getPosts();
  return res.status === 200 ? res.data : [];
};
```

---

### 2. React Component (`FetchRQ.jsx`)

The React component consumes `useQuery` to fetch and render the list of posts.

```javascript
import React from "react";
import { fetchPosts } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

const FetchRQ = () => {
  // Execute useQuery with key and fetcher function
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data?.map((currElem) => {
          const { title, body, id } = currElem;
          return (
            <li key={id}>
              <h2>{title}</h2>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchRQ;
```

---

## How `useQuery` Works

> - What is **queryKey**?<br>
The queryKey is typically an array or string that uniquely identifies a query. It allows React Query to determine if the data in the cache is associated with a particular request.
<br>It is used to cache data with a specific key and refetch or update data when certain dependencies change.

When `useQuery` is executed within a React component:

1. **Key Lookup & Caching**:
   `useQuery` checks internal cache using the provided `queryKey` (`['posts']`).
   - If valid, non-stale data exists in the cache, React Query returns it instantly.
   - If no cached data exists or if the data is marked as stale, it proceeds to trigger `queryFn`.

2. **Executing the Fetcher Function**:
   React Query calls `fetchPosts`, which triggers `api.get('/posts')` via Axios.

3. **Managing Lifecycle States**:
   - **Pending/Loading**: While waiting for the request to resolve, `isLoading` and `isPending` are `true`.
   - **Success**: When `fetchPosts` returns successfully, the data is saved in the cache under key `['posts']`. `data` is populated with the post list, and status updates to `"success"`.
   - **Error**: If the network call fails, React Query catches the exception, marks `isError` as `true`, and stores error details in `error`.

4. **Background Revalidation & Deduplication**:
   If multiple components request `['posts']` simultaneously, React Query deduplicates the network requests into a single HTTP call. If users navigate away and return, cached data renders immediately while a fresh fetch occurs in the background.

---

## Arguments Accepted by `useQuery`

`useQuery` accepts a primary options object configured with the following properties:

| Argument / Option | Type | Description |
| :--- | :--- | :--- |
| **`queryKey`** *(Required)* | `Array` | A unique key array (e.g., `['posts']` or `['posts', id]`) used to identify, cache, and invalidate the query. |
| **`queryFn`** *(Required)* | `Function` | An asynchronous function returning a Promise that resolves data or throws an error. |
| **`enabled`** | `boolean` | Set to `false` to prevent automatic query execution (useful for manual or dependent queries). |
| **`staleTime`** | `number \| Infinity` | Duration (in ms) that query data is considered fresh before becoming stale (default: `0`). |
| **`gcTime`** | `number` | Time (in ms) before unused cache entries are removed from memory (formerly `cacheTime`). |
| **`refetchInterval`** | `number \| false` | Time interval (in ms) to poll and refetch data continuously. |
| **`refetchOnWindowFocus`** | `boolean \| "always"` | Auto-refetches the query when the browser window gains focus (default: `true`). |
| **`refetchOnMount`** | `boolean \| "always"` | Controls re-fetching behavior on component mount. |
| **`retry`** | `boolean \| number \| Function` | Number of automated retry attempts upon request failure (default: `3`). |
| **`retryDelay`** | `number \| Function` | Delay timing (in ms) between retry attempts. |
| **`select`** | `Function` | Selects or transforms specific parts of the data returned by `queryFn`. |
| **`initialData`** | `any \| Function` | Default data inserted into the cache before request execution. |
| **`placeholderData`** | `any \| Function` | Structural placeholder shown while real data is loading. |

---


### Code Examples for Each Option

#### 1. `queryKey` & `queryFn`
```javascript
const { data } = useQuery({
  queryKey: ['post', postId],
  queryFn: () => fetchPostById(postId),
});
```

#### 2. `enabled`
```javascript
const { data } = useQuery({
  queryKey: ['userProfile', userId],
  queryFn: () => fetchUserProfile(userId),
  enabled: Boolean(userId), // Only runs if userId is truthy
});
```

#### 3. `staleTime`
```javascript
const { data } = useQuery({
  queryKey: ['settings'],
  queryFn: fetchSettings,
  staleTime: 1000 * 60 * 5, // Fresh for 5 minutes
});
```

#### 4. `gcTime`
```javascript
const { data } = useQuery({
  queryKey: ['notifications'],
  queryFn: fetchNotifications,
  gcTime: 1000 * 60 * 10, // Retains inactive cache for 10 minutes
});
```

#### 5. `select`
```javascript
const { data: activeUsers } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  select: (users) => users.filter((user) => user.isActive),
});
```

#### 6. `retry` & `retryDelay`
```javascript
const { data } = useQuery({
  queryKey: ['billingInfo'],
  queryFn: fetchBillingInfo,
  retry: 3,
  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
});
```

#### 7. `refetchInterval` & `refetchIntervalInBackground`
```javascript
const { data } = useQuery({
  queryKey: ['liveStockPrices'],
  queryFn: fetchStockPrices,
  refetchInterval: 5000, // Polls every 5 seconds
  refetchIntervalInBackground: true,
});
```

#### 8. `refetchOnWindowFocus` & `refetchOnMount`
```javascript
const { data } = useQuery({
  queryKey: ['dashboardMetrics'],
  queryFn: fetchMetrics,
  refetchOnWindowFocus: false, // Prevents refetch on tab focus
  refetchOnMount: true,
});
```

#### 9. `placeholderData`
```javascript
import { keepPreviousData } from '@tanstack/react-query';

const { data } = useQuery({
  queryKey: ['posts', page],
  queryFn: () => fetchPostsByPage(page),
  placeholderData: keepPreviousData, // Keeps previous page visible while fetching
});
```

#### 10. `meta`
```javascript
const { data } = useQuery({
  queryKey: ['transactions'],
  queryFn: fetchTransactions,
  meta: {
    errorMessage: 'Failed to fetch transaction logs.',
  },
});
```

---

## Return Values of `useQuery`

Calling `useQuery()` returns an object containing states, status flags, and helper functions:

| Return Value | Type | Description |
| :--- | :--- | :--- |
| **`data`** | `any` | The resolved data returned by `queryFn` (defaults to `undefined`). |
| **`error`** | `null \| Error` | The error object thrown if the query fails. |
| **`status`** | `"pending" \| "error" \| "success"` | The status lifecycle of the query process. |
| **`fetchStatus`** | `"fetching" \| "paused" \| "idle"` | Indicates if the network query function is currently running. |
| **`isLoading`** | `boolean` | `true` when fetching for the first time without pre-existing cache data. |
| **`isPending`** | `boolean` | `true` when there is no cached data available. |
| **`isFetching`** | `boolean` | `true` whenever `queryFn` is running (including background refreshes). |
| **`isSuccess`** | `boolean` | `true` when the query finished successfully. |
| **`isError`** | `boolean` | `true` when the query failed with an error. |
| **`isStale`** | `boolean` | `true` if the cached data is beyond its `staleTime`. |
| **`refetch`** | `Function` | Function to manually trigger a refetch of the query. |


## TanStack Query (`queryKey`) Reference Guide

In TanStack Query (React Query v5), the **`queryKey`** is the single most important concept for data management. It serves as the **unique memory address** used to cache, identify, share, and invalidate asynchronous data across your application.

---

## What is a `queryKey`?

At its core, `queryKey` must be an **Array**. React Query uses this array to generate a unique hash that maps directly to a value in its internal global cache key-value store.

```javascript
// Valid query keys in v5
useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
useQuery({ queryKey: ['posts', 5], queryFn: () => fetchPostById(5) });
useQuery({ queryKey: ['posts', { status: 'published', page: 1 }], queryFn: fetchFilteredPosts });
```

---

## 1. Static Query Keys (`['posts']`)

A static query key uses constant strings inside the array without any reactive variables.

```javascript
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
});
```

### Why use a static key if it never changes?

Even though the string `'posts'` remains constant across re-renders, it provides four critical features:

1. **Universal Deduplication across Components**  
   If three different components on the same screen (e.g., `HeaderCount`, `PostList`, and `SidebarWidget`) all call `useQuery({ queryKey: ['posts'], queryFn: fetchPosts })` at the exact same time:
   - **Without React Query:** Your app fires 3 separate HTTP GET requests to the server at the exact same time.
   - **With `['posts']`:** React Query identifies that all three components want data for `['posts']`. It fires only 1 HTTP request, and instantly shares the resolved data across all three components.

2. **Instant Unmounting & Remounting (Memory Cache)**  
   Imagine a user navigates from the Posts Page $\rightarrow$ Settings Page $\rightarrow$ Posts Page:
   - When leaving the Posts page, the component unmounts.
   - When returning, `useQuery` checks its global cache for `['posts']`.
   - It finds the cached data instantly! The UI renders the posts immediately with 0ms delay while React Query quietly checks the server for updates in the background.

3. **A Target for Mutations & Invalidation**  
   When a user submits a form to create a new post, you send a `POST` request to your API. Once successful, how does your app update the posts list on screen?
   Instead of manually modifying complex state arrays, you tell React Query to invalidate the static key:

   ```javascript
   import { useMutation, useQueryClient } from '@tanstack/react-query';

   const queryClient = useQueryClient();

   const createPostMutation = useMutation({
     mutationFn: createNewPostApi,
     onSuccess: () => {
       // Tells React Query: "The data at ['posts'] is out of date. Refetch it now!"
       queryClient.invalidateQueries({ queryKey: ['posts'] });
     },
   });
   ```

   Because `['posts']` is constant, any component relying on `queryKey: ['posts']` automatically re-fetches the latest list from the server.

4. **Background Syncing & Auto-Healing**  
   A static `queryKey` registers the request with React Query's background sync engines. Because the engine tracks `['posts']`, it automatically refetches data when:
   - The user clicks back into your browser tab (`refetchOnWindowFocus`).
   - The network drops and reconnects (`refetchOnReconnect`).

---

## 2. Dynamic Query Keys (`['posts', variable]`)

A dynamic query key combines static namespace strings with reactive variables (IDs, page numbers, search filters, or user inputs).

### How Dynamic Dependency Tracking Works

In React Query, the `queryKey` array acts similarly to the dependency array in React's `useEffect`. Whenever any value inside the array changes, React Query automatically triggers a refetch.

### Common Dynamic Patterns

#### Pattern A: Record by ID
```javascript
const PostDetail = ({ postId }) => {
  const { data } = useQuery({
    // Evaluates to ['posts', 1], ['posts', 2], etc.
    queryKey: ['posts', postId],
    queryFn: () => fetchPostById(postId),
  });

  return <div>{data?.title}</div>;
};
```
**Execution Flow:** When `postId` changes from `1` to `2`, React Query detects that `['posts', 1]` $\neq$ `['posts', 2]`. It immediately checks the cache for key `['posts', 2]`. If absent, it fires `fetchPostById(2)`.

#### Pattern B: Pagination
```javascript
const PostPagination = ({ page }) => {
  const { data } = useQuery({
    queryKey: ['posts', 'list', page],
    queryFn: () => fetchPostsByPage(page),
  });
};
```

#### Pattern C: Filters and Search Queries
```javascript
const FilteredPosts = ({ category, searchTerm }) => {
  const { data } = useQuery({
    queryKey: ['posts', 'search', { category, searchTerm }],
    queryFn: () => fetchPostsByFilter(category, searchTerm),
  });
};
```

---

## Key Comparison Matrix

| Feature | Static Key `['posts']` | Dynamic Key `['posts', id]` |
| :--- | :--- | :--- |
| **Purpose** | Caching, sharing, & invalidating a single collection | Caching & refetching individual items or filtered sets |
| **Changes over time?** | No | Yes (when variable changes) |
| **Key Role** | Global address for your posts list | Unique address per post / page |
| **Deduplication** | Merges identical concurrent calls across components | Merges identical calls with matching parameters |
| **Invalidation Target** | Invalidates entire collection | Can target specific item or parent collection |

A static key serves as the global memory address for that specific API resource across your entire application.

---

## Query Key Rules & Best Practices

1. **Must be an Array:** In TanStack Query v5, keys must always be arrays (e.g., `['posts']`).
2. **Order Matters for Primitive Values:**  
   `['posts', 1, 'comments']` is **NOT** equal to `['comments', 1, 'posts']`.
3. **Order Doesn't Matter for Objects:**  
   Objects inside arrays are deterministically serialized.  
   `['posts', { page: 1, sort: 'asc' }]` **IS** equal to `['posts', { sort: 'asc', page: 1 }]`.
4. **Hierarchical Invalidation:**  
   Invalidating `queryClient.invalidateQueries({ queryKey: ['posts'] })` will invalidate `['posts']`, `['posts', 1]`, and `['posts', 'list', 2]`.


---

# React Dev Tools

## Installation
```bash
npm i @tanstack/react-query-devtools
```

## Setup
### Floating Mode
```js
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```
Refer - https://tanstack.com/query/latest/docs/framework/react/devtools

By default, React Query Devtools are only included in bundles when process.env.NODE_ENV === 'development', so you don't need to worry about excluding them during a production build.

## `useQuery` and `useMutation`
**useQuery:** Fetches and reads data (GET requests) from an API and automatically caches the result.<br>
**useMutation:** Used for creating, updating, or deleting data (POST, PUT, DELETE requests) and allows triggering manual side effects.

---

# `gcTime` or cacheTime - (Garbage Collection Time)
How long unused data lives in memory before being destroyed

In React Query v5, the cacheTime option in React Query has been renamed to gcTime.

When you use React Query to get data, it saves the results in a local cache. This means if you ask for the same data again, React Query will give you the saved data instead of making another API request. The cache updates automatically if the data changes, so you always get the latest information.

**Use Case:** Imagine you're fetching a list of users. If you go back to the same page, React Query will show the saved list from the cache instead of reloading it from the server, making your app faster. If a new user is added, React Query will automatically update the list.

By default, inactive queries are garbage collected after **5 minutes**. This means that if a query is not being used for 5 minutes, the cache for that query will be cleaned up.

## Implementation
```js
import React from 'react'
import { fetchPosts } from '../../api/api'
import { useQuery } from '@tanstack/react-query';

const FetchRQ = () => {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    gcTime: 1000, // default(ms) -> 300000ms = 5 min
  })

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>

  return (
    <div>
      <ul>
        {
          data?.map((currElem) => {
            const {title, body, id} = currElem
            return <li key={id}>
              <h2>{title}</h2>
              <p>{body}</p>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default FetchRQ
```

# `staleTime`
In React Query, staleTime is a configuration option that determines how long fetched data is considered fresh before it needs to be refetched.

Here's how it works:<br>
**Fresh Data:**
When data is initially fetched or updated, it's considered fresh.

**Stale Data:**
After the staleTime duration (specified in milliseconds) elapses, the data is considered [stale].

**Default Value:**
The default staleTime is **0**, meaning data becomes stale immediately after being fetched.<br>
This ensures data is always up-to-date but can lead to frequent refetching.

- It fetches the data and stores it in the cache(valid of 5 mins)<br>
  **1st time** -> Sends a request to the server, gets the data, saves it in the cache, and displays it.<br>
  **2nd time (same req)** -> (Re-mounting/Navigating back): Serves the cached data instantly to prevent loading spinners, while launching a background network request (pending in Network tab). UI Update: If the server returns new/updated data, the cache and UI automatically update; if nothing changed, nothing changes on the screen.
  > This happens because default `staleTime` is 0

It will not send req if the data is fresh. If stale, then it will send req

## Implementation
```js
import React from 'react'
import { fetchPosts } from '../../api/api'
import { useQuery } from '@tanstack/react-query';

const FetchRQ = () => {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    // gcTime: 1000,
    staleTime: 5000, // ms; default -> 0
  })

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>

  return (
    <div>
      <ul>
        {
          data?.map((currElem) => {
            const {title, body, id} = currElem
            return <li key={id}>
              <h2>{title}</h2>
              <p>{body}</p>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default FetchRQ
```

---

# React Query: `staleTime` vs `gcTime`

Understanding the difference between **`staleTime`** and **`gcTime`** (formerly `cacheTime` in React Query v4 and earlier) is essential for controlling network usage and memory management in **TanStack Query / React Query**.

---

## Quick Comparison

| Feature | `staleTime` | `gcTime` (Garbage Collection Time) |
| :--- | :--- | :--- |
| **Primary Purpose** | Defines data **freshness** and determines when a background refetch should occur. | Defines **memory retention** and determines when unused cache entries are deleted. |
| **Default Value** | `0` (Instantly stale) | `5 minutes` (`300000` ms) |
| **Timer Starts** | Immediately after data is successfully fetched or updated. | Immediately after all components using the query **unmount**. |
| **Impact on Network** | Prevents or permits background network requests. | Has no direct effect on network requests; only frees up browser memory. |

---

## 1. What is `staleTime`?

`staleTime` is the duration (in milliseconds) during which fetched data is considered **fresh**.

* **Fresh Data**: As long as the data is fresh, React Query will read directly from the cache and **will not trigger any background network refetches** when components remount or the window regains focus.
* **Stale Data**: Once `staleTime` expires, the data is marked as stale. Stale data is still rendered immediately from the cache (if available), but React Query will automatically fetch new data in the background to update the cache.

### Default Behavior (`staleTime: 0`)
By default, `staleTime` is `0`. This means data becomes stale immediately after being fetched. As a result, React Query will always perform background refetches on remount or window focus to ensure your UI remains up-to-date.

---

## 2. What is `gcTime`?

`gcTime` (Garbage Collection Time) is the duration (in milliseconds) that **inactive data stays in memory** before being permanently deleted from the cache.

* **Active Query**: A query is active as long as at least one component rendering on the screen is using its `useQuery` hook.
* **Inactive Query**: When all components using a specific query unmount (for instance, when navigating away from a page), the query becomes inactive.

### Default Behavior (`gcTime: 5 minutes`)
When a query becomes inactive, a timer set to `gcTime` (defaulting to 5 minutes) begins counting down:
* **Revisit within 5 minutes**: The cached data is retrieved instantly from memory while a background refetch updates it (if stale).
* **Revisit after 5 minutes**: The cache entry has been garbage collected to free up browser memory. React Query must show a loading spinner and fetch the data from scratch over the network.

---

## Summary of the Data Lifecycle

1. **Fetch**: Data is requested from the server and cached in memory.
2. **Fresh Period (`staleTime`)**: For the duration of `staleTime`, navigating back or remounting uses the cached data with **zero network requests**.
3. **Stale Period**: Once `staleTime` elapses, the data is considered stale. Navigating back shows cached data immediately while firing a **background network request** to check for updates.
4. **Unmount**: When you leave the page, the query becomes inactive, starting the **`gcTime` timer**.
5. **Garbage Collection (`gcTime`)**: If you don't return within the `gcTime` duration, the cached data is permanently wiped from memory.

---

# Real Time Polling in React Query
In React Query, polling refers to the technique of fetching data from an API at regular intervals to keep the UI up-to-date with the latest information. This is especially useful for scenarios where data changes frequently and you want to display real-time updates without requiring the user to manually refresh the page.

**refetchInterval option:** The simplest way to enable polling is to pass the `refetchInterval` option to the `useQuery` hook. This option specifies the interval (in milliseconds) at which React Query should automatically refetch the data.

// When you want to fetch the data even in background or you are in another tab.
**refetchIntervalInBackground option:** If you want to continue polling even when the component is not mounted, you can use the `refetchIntervalInBackground` option.

## Implementation
```js
import React from 'react'
import { fetchPosts } from '../../api/api'
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,

    refetchInterval: 1000, // 1000ms = 1s
    refetchIntervalInBackground: true, // default -> false
    // when we visit other tab or when the component is unmounted, it stops sending requests... To make sure, it doesn't stops sending requests even when the component is unmounted we use 'refetchIntervalInBackground: true'
    // NOTE: if there is staleTime, then refetchInterval doesn't work.
  })

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>

  return (
    <div>
      <ul>
        {
          data?.map((currElem) => {
            const {title, body, id} = currElem
            return <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <h2>{title}</h2>
                <p>{body}</p>
              </NavLink>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default FetchRQ
```

## React Query: `refetchInterval` and `staleTime`

Understanding how polling (`refetchInterval`) interacts with cache freshness (`staleTime`).

## Quick Example

```tsx
useQuery({
  queryKey: ['live-data'],
  queryFn: fetchData,
  staleTime: 60000,      // 1 minute
  refetchInterval: 1000, // 1 second
});
```

### Result:
The query **refetches every 1 second** and updates the UI continuously, regardless of the 1-minute `staleTime`.

---

## Key Takeaways

1. **`refetchInterval` Bypasses `staleTime`**
   Polling operates on an independent, explicit schedule. It does **not** wait for data to become stale before refetching.

2. **Role of `staleTime` During Polling**
   Between the 1-second interval ticks, data remains marked as "fresh." This prevents redundant refetches from event-based triggers (such as `refetchOnWindowFocus` or `refetchOnMount`).

3. **Execution Flow**
   - **Every 1s:** A background request is dispatched.
   - **On Response:** React Query updates the cache and resets the `staleTime` timer.
   - **UI Update:** The UI re-renders instantly with the updated payload.

---

## Good to Know

* **Latency:** Update cadence depends on network response times ($\text{Interval} + \text{Latency}$).
* **Structural Sharing:** If the payload hasn't changed, React Query retains object references to prevent unnecessary component re-renders.

---

# React Query: Pagination
```js
// api/api.js
export const fetchPosts = async (pageNumber) => {
    try {
        const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
        return res.status === 200 ? res.data : [];
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}
```

```js
import React, { useState } from 'react'
import { fetchPosts } from '../../api/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {

  const [pageNumber, setPageNumber] = useState(0);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts', pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    placeholderData: keepPreviousData, // this will prevent the loading screen while changing pages... It will keep the previous data intact even after changing pages, and once the fresh data is loaded, it will replace the old ones
  })

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>

  return (
    <div>
      <ul>
        {
          data?.map((currElem) => {
            const {title, body, id} = currElem
            return <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <h2>{title}</h2>
                <p>{body}</p>
              </NavLink>
            </li>
          })
        }
      </ul>

      <div>
        <button disabled={pageNumber === 0} onClick={() => setPageNumber((prev) => prev - 3)}>Prev</button>

        {pageNumber/3 + 1}

        <button disabled={!data || data.length < 3} onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  )
}

export default FetchRQ

```

### 1. Dynamic `queryKey` Dependency
```js
queryKey: ['posts', pageNumber]
```
- `queryKey` acts as a unique identifier for caching in React Query.
- Including `pageNumber` ensures that data for each page is cached independently under `['posts', 0]`, `['posts', 3]`, etc.
- Changing `pageNumber` forces React Query to fetch data for the new key while using cached data if available.

---

### 2. Smooth Transitions with `placeholderData: keepPreviousData`
```js
placeholderData: keepPreviousData
```
- **Problem without it:** Every page switch causes `isPending` to become `true`, momentarily unmounting the list and flashing a full-screen `"Loading..."` fallback UI.
- **Solution:** `keepPreviousData` retains the data from the previous page on screen while the new page's data is being fetched in the background. Once fetching completes, it seamlessly swaps in the fresh page data.

---

### 3. Safe Pagination State Handlers
```jsx
onClick={() => setPageNumber((prev) => prev - 3)}
```
- Passing an inline arrow function (`() => setPageNumber(...)`) prevents premature execution during component render cycles (which avoids the **"Too many re-renders"** error).
- **Page Offset Logic:** The API uses offset-based page increments (`+3` / `-3`).
- **Calculated Page Index:** Displayed page number is calculated as `(pageNumber / 3) + 1`.
- **Button Protection:** The `Prev` button sets `disabled={pageNumber === 0}` to prevent negative offsets.

### 4. How Button Disabled States Work

Pagination buttons should be disabled when the user reaches the beginning or the end of the dataset to prevent invalid requests.

```jsx
{/* Prev Button */}
<button disabled={pageNumber === 0} onClick={...}>Prev</button>

{/* Next Button */}
<button disabled={!data || data.length < 3} onClick={...}>Next</button>
```

### 1. **Prev Button Disabled Logic (`pageNumber === 0`)**
* **Condition:** `pageNumber === 0`
* **Why it works:** The page offset starts at `0`. Disabling the button when `pageNumber` is `0` prevents users from navigating into negative offsets (e.g., `-3`), which would result in invalid API calls.

### 2. **Next Button Disabled Logic (`!data || data.length < PAGE_SIZE`)**
* **Condition 1 (`!data`):** Ensures the button remains disabled while data is initially fetching or if `data` is `undefined`.
* **Condition 2 (`data.length < PAGE_SIZE`):** Checks if the current page contains fewer items than the expected page size (3 in this case).
  * **Example:** If page size is 3 and the server returns only 1 or 2 items (or 0 items), you have reached the end of the available records. Disabling the `Next` button stops the user from requesting a subsequent empty page.

---

## State Lifecycle

| State | Action | User Experience |
| :--- | :--- | :--- |
| **Initial Load** | Component mounts (`pageNumber = 0`) | Shows `<p>Loading...</p>` until initial data arrives. |
| **Page Change** | Click `Next` (`pageNumber = 3`) | Retains Page 1 items on screen while fetching Page 2 in background. |
| **Page Arrival** | Data returns from API | UI updates immediately to show Page 2 items with zero loading flashes. |
| **Navigate Back** | Click `Prev` (`pageNumber = 0`) | Loads instantly from React Query's cache without triggering network request. |

---

# React Query: `useMutation` Hook

The `useMutation` hook is a fundamental part of React Query used to create, update, or delete data on the server (CRUD operations). Unlike `useQuery`—which typically executes automatically on component mount—`useMutation` is triggered manually when a user performs an action (e.g., clicking a "Delete" or "Submit" button).

---

## 1. Syntax & Parameters

### Basic Syntax
```javascript
const mutation = useMutation({
  mutationFn: myMutationFunction,
  // ...configuration options
});
```

### Parameters (`useMutation` Options Object)

When calling `useMutation`, you pass an options object containing configuration settings and life-cycle callbacks:

| Option | Type | Description |
| :--- | :--- | :--- |
| `mutationFn` | `Function` | **Required.** A function that performs an asynchronous task (e.g., an Axios or `fetch` call) and returns a promise. |
| `mutationKey` | `Array` / `string` | *(Optional)* A unique key to identify the mutation in the cache or devtools. |
| `onSuccess` | `Function` | Callback triggered when the mutation succeeds. Receives `(data, variables, context)`. |
| `onError` | `Function` | Callback triggered if the mutation fails. Receives `(error, variables, context)`. |
| `onSettled` | `Function` | Callback triggered when the mutation completes, regardless of success or error. Receives `(data, error, variables, context)`. |
| `onMutate` | `Function` | Callback triggered **before** the mutation function runs. Useful for optimistic updates. |
| `retry` | `boolean` / `number` / `Function` | Controls if/how many times the mutation should retry upon failure (default is `0`). |
| `retryDelay` | `number` / `Function` | Delay between retry attempts in milliseconds. |
| `gcTime` | `number` | The time in milliseconds that unused mutation state remains in memory (formerly `cacheTime`). |
| `networkMode` | `'online'` / `'always'` / `'offlineFirst'` | Determines how mutations handle offline network connectivity. |

---

## 2. Triggering Mutations with `.mutate()`

The `useMutation` hook returns an object containing the `.mutate()` function. 

The process remains identical regardless of the operation:
- **Creating new data** (POST)
- **Updating data** (PUT / PATCH)
- **Deleting data** (DELETE)

When you invoke `.mutate(variables)`, React Query executes the `mutationFn` provided in the hook options with those variables.

---

## 3. Code Example: Deleting a Post with Local Cache Updates

Below is a complete implementation showing how to fetch paginated posts using `useQuery` and delete a post using `useMutation` with local cache updating (`setQueryData` / `setQueriesData`).

```jsx
import React, { useState } from 'react'
import { deletePost, fetchPosts } from '../../api/api'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();

  // 1. Fetch Paginated Posts
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts', pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    placeholderData: keepPreviousData,
  });

  // 2. Define Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),

    // Update local cache on successful deletion
    onSuccess: (responseData, id) => {
      queryClient.setQueriesData(['posts', pageNumber], (currElem) => {
        return currElem?.filter((post) => post.id !== id);
      });
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul>
        {data?.map((currElem) => {
          const { title, body, id } = currElem;
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <h2>{title}</h2>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
            </li>
          );
        })}
      </ul>

      {/* Pagination Controls */}
      <div>
        <button 
          disabled={pageNumber === 0} 
          onClick={() => setPageNumber((prev) => prev - 3)}
        >
          Prev
        </button>

        <span>{pageNumber / 3 + 1}</span>

        <button 
          disabled={!data || data.length < 3} 
          onClick={() => setPageNumber((prev) => prev + 3)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FetchRQ;
```

---

## 4. Code Explanation

### A. Initializing `useMutation`
```javascript
const deleteMutation = useMutation({
  mutationFn: (id) => deletePost(id),
  onSuccess: (responseData, id) => { ... }
});
```
* **`mutationFn`**: Wraps the API call `deletePost(id)`.
* **`onSuccess`**: Runs immediately after the API call completes successfully. It receives the API response (`responseData`) and the original argument passed to `.mutate()` (`id`).

### B. Updating Local Cache with `setQueriesData`
```javascript
queryClient.setQueriesData(['posts', pageNumber], (currElem) => {
  return currElem?.filter((post) => post.id !== id);
});
```
* **`queryClient.setQueriesData` / `setQueryData`** is used to manually update cached query data.
* Instead of re-fetching the entire list from the server, we filter out the post with matching `id` from the local cache array for key `['posts', pageNumber]`.
* The UI updates instantly because the React Query state for the current page is updated directly.

### C. Triggering the Action
```jsx
<button onClick={() => deleteMutation.mutate(id)}>Delete</button>
```
* Clicking the button invokes `deleteMutation.mutate(id)`, passing the post's unique `id` to `mutationFn`.

# Managing React Query Cache with `useQueryClient` and `setQueryData`

This guide explains how to perform direct cache updates in TanStack React Query using `useQueryClient` and `setQueryData`. This approach allows for instant UI updates without waiting for unnecessary network refetches.

---

## 1. Accessing the Cache Manager: `useQueryClient`

```javascript
const queryClient = useQueryClient();
```

### What It Does
`useQueryClient()` is a React hook provided by `@tanstack/react-query`. It returns the global `QueryClient` instance initialized at the root of your application (typically wrapped within `<QueryClientProvider client={queryClient}>`).

### Why You Need It
React Query acts as a global cache manager for your application state. To interact directly with this cache outside of standard automatic data fetches—such as manually reading cache data, updating it synchronously, or invalidating specific queries—you must access the `queryClient` instance.

---

## 2. Direct Cache Updates: `queryClient.setQueryData`

```javascript
queryClient.setQueryData(['posts', pageNumber], (currElem) => {
  return currElem?.filter((post) => post.id !== id);
});
```

### What It Does
`setQueryData` is a synchronous method used to manually update or manipulate the cached data for a specific query key without waiting for a server re-fetch.

### Parameter Breakdown

1. **Query Key (`['posts', pageNumber]`)**:
   * Specifies the exact cache entry you want to target.
   * Matching your list query key (`['posts', pageNumber]`) ensures you only modify the cached data for the specific page currently being viewed.

2. **Updater Function (`(currElem) => { ... }`)**:
   * React Query automatically passes the current cached value for that query key into `currElem`.
   * **`currElem?.filter(...)`**: Iterates through the cached array of posts and returns a new array excluding the post with the deleted `id`.
   * **Safe Navigation (`?.`)**: Prevents runtime crashes if `currElem` is `undefined` (e.g., if the cache was cleared or has not loaded yet).

---

## 3. Practical Example: Mutation Integration

Here is how you combine these concepts within a `useMutation` hook to perform a deletion:

```javascript
import { useQueryClient, useMutation } from '@tanstack/react-query';

function useDeletePost(pageNumber) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostApiCall,
    onSuccess: (_, deletedId) => {
      // Synchronously update the cache upon successful deletion
      queryClient.setQueryData(['posts', pageNumber], (currElem) => {
        return currElem?.filter((post) => post.id !== deletedId);
      });
    },
  });
}
```

---

## Key Benefits

* **Optimistic / Instant UI Updates**: The item is removed from the user interface immediately after the server acknowledges deletion, creating a seamless user experience without waiting for a re-fetch.
* **Network Efficiency**: Reduces network usage by updating the client-side state directly instead of firing an additional `GET` request to refetch the entire dataset.

# TanStack React Query: `setQueryData` vs `setQueriesData`

This guide covers the key differences between `setQueryData` and `setQueriesData` in TanStack React Query (JavaScript / JSX), complete with use cases, API references, and practical implementations.

## Quick Comparison Summary

| Feature | `setQueryData` | `setQueriesData` | 
| ----- | ----- | ----- | 
| **Scope** | Targets a **single, exact** query key. | Targets **multiple** matching query keys. | 
| **Matching Logic** | Exact query key match required. | Fuzzy / partial key matching (or custom filter functions). | 
| **First Argument** | `QueryKey` (Array) | `QueryFilters` (e.g., `{ queryKey: ['posts'] }`) | 
| **Updater Callback Signature** | `(oldData) => newData` | `(oldData, query) => newData` | 
| **Return Value** | `updatedData` or `undefined` | Array of tuples: `[[queryKey, updatedData], ...]` | 
| **Primary Use Case** | Updating a single entity or specific page view. | Updating entities across multiple cached queries (e.g., all pages/filters). | 

---

## 1. `setQueryData`

Use `setQueryData` when you need to synchronously update a single, specific cache entry whose exact key you know.

### API Syntax

```jsx
queryClient.setQueryData(
  queryKey,
  updater, // TData | ((oldData: TData | undefined) => TData | undefined)
  options
);
```

### Implementation Example

Updating a specific page's list after an item deletion:

```jsx
import { useQueryClient, useMutation } from '@tanstack/react-query';

export function useDeletePostFromPage(pageNumber) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId) => {
      await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      return postId;
    },
    onSuccess: (deletedId) => {
      // Synchronously target ONLY the current page's query key: ['posts', pageNumber]
      queryClient.setQueryData(['posts', pageNumber], (oldPosts) => {
        return oldPosts?.filter((post) => post.id !== deletedId);
      });
    },
  });
}
```

---

## 2. `setQueriesData`

Use `setQueriesData` when an operation affects data that might reside across **multiple cached query keys**—such as across different paginated pages, search filters, or categories.

### API Syntax

```jsx
queryClient.setQueriesData(
  filters, // e.g., { queryKey: ['posts'] }
  updater  // (oldData, query) => newData
);
```

### Implementation Example

Removing a deleted post across **all** cached post queries (Page 1, Page 2, filtered views, etc.):

```jsx
import { useQueryClient, useMutation } from '@tanstack/react-query';

export function useGlobalDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId) => {
      await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      return postId;
    },
    onSuccess: (deletedId) => {
      // Targets ALL query keys that start with ['posts']
      // e.g., ['posts', 1], ['posts', 2], ['posts', { category: 'tech' }]
      queryClient.setQueriesData({ queryKey: ['posts'] }, (oldPosts) => {
        return oldPosts?.filter((post) => post.id !== deletedId);
      });
    },
  });
}
```

---

## 3. Side-by-Side Code Example: Optimistic Updates (JSX)

Here is how both methods differ when performing **Optimistic UI Updates** inside `useMutation`:

```jsx
import { useQueryClient, useMutation } from '@tanstack/react-query';

// -------------------------------------------------------------
// Approach A: setQueryData (Single Exact Query Key)
// -------------------------------------------------------------
export function useOptimisticDeleteSingle(page) {
  const queryClient = useQueryClient();
  const queryKey = ['posts', page];

  return useMutation({
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousPosts = queryClient.getQueryData(queryKey);

      // Mutate only this single query key
      queryClient.setQueryData(queryKey, (old) =>
        old?.filter((post) => post.id !== deletedId)
      );

      return { previousPosts };
    },
    onError: (err, deletedId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(queryKey, context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

// -------------------------------------------------------------
// Approach B: setQueriesData (Multiple Query Keys)
// -------------------------------------------------------------
export function useOptimisticDeleteGlobal() {
  const queryClient = useQueryClient();
  const queryFilter = { queryKey: ['posts'] };

  return useMutation({
    onMutate: async (deletedId) => {
      // Cancel all queries matching ['posts']
      await queryClient.cancelQueries(queryFilter);

      // Store snapshots of all matched queries before updating for rollback
      const previousQueries = queryClient.getQueriesData(queryFilter);

      // Update all queries matching ['posts']
      queryClient.setQueriesData(queryFilter, (old) =>
        old?.filter((post) => post.id !== deletedId)
      );

      return { previousQueries };
    },
    onError: (err, deletedId, context) => {
      // Rollback each affected query
      context?.previousQueries?.forEach(([key, oldData]) => {
        queryClient.setQueryData(key, oldData);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryFilter);
    },
  });
}
```

---

## Key Takeaways & Best Practices

1. **Precision vs. Breadth:**
   * Use **`setQueryData`** if you are updating an isolated detail view (e.g., `['post', id]`) or a known active page.
   * Use **`setQueriesData`** when an edit or delete operation should instantly reflect across all list views without needing to know every key explicitly.

2. **Accessing Query Object:**
   * `setQueriesData` passes the `query` object as the second argument to its callback: `(oldData, query) => ...`. This allows you to conditionally mutate data based on specific key properties (`query.queryKey`).

3. **Immutability:**
   * Always return a **new copy** of the data (e.g., using `.filter()`, `.map()`, or spread operator `[...]`) inside the updater function to ensure React detects state changes and re-renders components properly.

---

# TanStack Query (React Query) `onSuccess` Parameter Reference

In TanStack Query, the `onSuccess` callback inside `useMutation` triggers automatically when a mutation successfully resolves. 

`onSuccess` provides access to **three positional parameters**:
```js
onSuccess: (data, variables, context) => { ... }
```

---

## Quick Parameter Summary

| Position | Parameter Name | Type | Description |
| :--- | :--- | :--- | :--- |
| **1st** | `data` | `TData` | The response data returned directly by your `mutationFn`. |
| **2nd** | `variables` | `TVariables` | The exact argument(s) passed into `.mutate(variables)`. |
| **3rd** | `context` | `TContext` | Any value returned from the `onMutate` hook (used for optimistic updates & rollbacks). |

---

## Detailed Parameter Explanation

### 1. `data` (The API Response)
* **What it is:** The resolved payload returned by the Promise in `mutationFn`.
* **In your code:** `apiData`
* **Purpose:**
  * Accessing updated server records or calculated values.
  * Reading HTTP status codes, headers, or messages returned from the backend.
  * Extracting newly generated IDs or updated timestamps to synchronize the UI.

### 2. `variables` (The Mutation Arguments)
* **What it is:** The parameters or payload passed into `.mutate(variables)` when triggering the mutation.
* **In your code:** `postId`
* **Purpose:**
  * Locating specific items inside cached lists or normalized data stores.
  * Accessing user inputs when the backend response is minimal or empty (e.g., HTTP `204 No Content`).
  * Passing payload values to logging services or analytics tools.

### 3. `context` (The Inter-Callback State)
* **What it is:** The object or value returned from the `onMutate` callback. If no `onMutate` is defined, `context` is `undefined`.
* **Purpose:**
  * Storing pre-mutation cache snapshots to facilitate rollbacks on failure.
  * Calculating execution metrics (e.g., tracking total request duration using timestamps).
  * Passing temporary UI states or unique request identifiers across lifecycle hooks (`onMutate` $\rightarrow$ `onSuccess` $\rightarrow$ `onSettled`).

---

## Complete Implementation

Here is a clean implementation demonstrating how to use all three parameters together:

```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from './api';

export const useUpdatePost = (pageNumber) => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn takes the variables passed from .mutate()
    mutationFn: (postId) => updatePost(postId),

    // 1. Pre-mutation lifecycle hook
    onMutate: async (postId) => {
      // Cancel outgoing refetches so they don't overwrite optimistic updates
      await queryClient.cancelQueries({ queryKey: ['posts', pageNumber] });

      // Save previous state for context
      const previousPosts = queryClient.getQueryData(['posts', pageNumber]);

      // Return context accessible in onSuccess, onError, and onSettled
      return {
        previousPosts,
        startTime: Date.now(),
      };
    },

    // 2. Success lifecycle hook
    onSuccess: (apiData, postId, context) => {
      /*
        -------------------------------------------------------------------------
        Parameter breakdown:
        1. apiData  -> Response returned from updatePost(postId)
        2. postId   -> Argument passed when calling updateMutation.mutate(postId)
        3. context  -> Value returned from onMutate ({ previousPosts, startTime })
        -------------------------------------------------------------------------
      */

      // Direct cache update using data and variables
      queryClient.setQueryData(['posts', pageNumber], (postsData) => {
        if (!postsData) return [];

        return postsData.map((currPost) =>
          currPost.id === postId
            ? { ...currPost, title: apiData.data.title }
            : currPost
        );
      });

      // Calculate execution duration using context
      const duration = Date.now() - context.startTime;
      console.log(`Updated post ${postId} in ${duration}ms`);
    },

    // 3. Error lifecycle hook
    onError: (error, postId, context) => {
      // Rollback cache to previous state if mutation fails
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts', pageNumber], context.previousPosts);
      }
    },
  });
};
```

---

## How to Call the Mutation in Components

When triggering `.mutate()`, the arguments you pass populate the 2nd parameter (`variables`) inside `onSuccess`:

```jsx
import React from 'react';
import { useUpdatePost } from './useUpdatePost';

export const PostCard = ({ post, pageNumber }) => {
  const updateMutation = useUpdatePost(pageNumber);

  const handleUpdate = () => {
    // Calling mutate with 'post.id' sets the 'postId' variable in onSuccess
    updateMutation.mutate(post.id);
  };

  return (
    <div>
      <h4>{post.title}</h4>
      <button 
        onClick={handleUpdate} 
        disabled={updateMutation.isPending}
      >
        {updateMutation.isPending ? 'Updating...' : 'Update Title'}
      </button>
    </div>
  );
};
```

---

## Essential Best Practices

1. **Parameter Order is Strict:** Parameters are passed by position, not by name. If you only need `context`, you must still declare placeholders for `data` and `variables`:
   ```javascript
   onSuccess: (_data, _variables, context) => {
     console.log(context);
   }
   ```
2. **Mutation Callbacks vs. `.mutate` Options:**
   * `onSuccess` inside `useMutation` runs **every time** the mutation succeeds.
   * `onSuccess` passed into `.mutate(variables, { onSuccess: ... })` runs **only if the component triggering it is still mounted**.
3. **Prefer `queryClient.invalidateQueries` when applicable:** If updating the cache manually becomes complex, invalidating the query key triggers an automatic refetch to sync with server state:
   ```javascript
   onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ['posts', pageNumber] });
   }
   ```

---

# Update Data: `useMutation` hook
```js
// update a post
export const updatePost = (id) => {
    return api.patch(`/posts/${id}`, {title: "I have updated"});
}
```

```js
import React, { useState } from 'react'
import { deletePost, fetchPosts, updatePost } from '../../api/api'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

const FetchRQ = () => {

  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts', pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    placeholderData: keepPreviousData,
  })

  // Mutation function to delete post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),

    // delete from local cache
    onSuccess: (data, id) => {
      queryClient.setQueryData(['posts', pageNumber], (currElem) => {
        return currElem?.filter((post) => post.id != id);
      })
    },
  })

  // Mutation function to update post
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),

    // update in local cache
    // apiData -> response that 'updatePost(id)' returned
    // postId -> argument(s) we passed while calling this mutation function using '.mutate()'
    onSuccess: (apiData, postId) => {
      // postsData -> whole data in the cache with 'queryFn: ['posts', pageNumber]'
      queryClient.setQueryData(['posts', pageNumber], (postsData) => {
        return postsData?.map((currPost) => {
          return currPost.id === postId ? {...currPost, title: apiData.data.title} : currPost;
        })
      })
    },
  })

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>

  return (
    <div>
      <ul>
        {
          data?.map((currElem) => {
            const {title, body, id} = currElem
            return <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <h2>{title}</h2>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
            </li>
          })
        }
      </ul>

      <div>
        <button disabled={pageNumber === 0} onClick={() => setPageNumber((prev) => prev - 3)}>Prev</button>
        {pageNumber/3 + 1}
        <button disabled={!data || data.length < 3} onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  )
}

export default FetchRQ
```


---

# Scroll Events (Basics)
1. **window.innerHeight**: The height of the visible part of the webpage (the viewport) 
2. **window.scrollY**: The amount of pixels the user has scrolled down the page.
3. **document.documentElement.scrollHeight**: The total height of the webpage, including the part not visible without scrolling.

---

# Infinite Scrolling in React with TanStack Query v5

A comprehensive guide and documentation on implementing performant infinite scrolling in React using `@tanstack/react-query` (`useInfiniteQuery`) and native browser scroll events.

## Table of Contents

1. [Overview](#overview)

2. [Key Concepts: Scroll Events](#key-concepts-scroll-events)

3. [TanStack Query `useInfiniteQuery` API](#tanstack-query-useinfinitequery-api)

   * [Parameters & Options](#parameters--options)

   * [Return Values](#return-values)

4. [Complete Code Example](#complete-code-example)

   * [API Service (`api.js`)](#1-api-service-apijs)

   * [React Component (`InfiniteScroll.jsx`)](#2-react-component-infinitescrolljsx)

5. [Detailed Code Breakdown](#detailed-code-breakdown)

6. [Best Practices & Enhancements](#best-practices--enhancements)

7. [Step-by-Step Logic Flow](#step-by-step-logic-flow)

## Overview

**Infinite Scrolling** is a user interface pattern where data is dynamically loaded as the user scrolls down a page, replacing traditional page-by-page navigation controls.

Using **TanStack Query** (React Query) for infinite scrolling provides:

* Automatic caching and state management.

* Built-in pagination tracking via `pageParam`.

* Handlers for tracking fetching states (`isFetchingNextPage`).

* Prevention of duplicate network requests.

## Key Concepts: Scroll Events

To trigger data fetching when reaching the end of a webpage, we measure three key properties of the DOM:

| Property | Description | 
 | ----- | ----- | 
| `window.innerHeight` | The height of the visible portion of the webpage (viewport). | 
| `window.scrollY` | The distance in pixels the user has currently scrolled vertically from the top. | 
| `document.documentElement.scrollHeight` | The total height of the webpage document, including content hidden off-screen due to overflow. | 

### Bottom Detection Formula

When the sum of `window.innerHeight` and `window.scrollY` equals `document.documentElement.scrollHeight - 1`, the user has reached the bottom threshold of the page:

$$
\text{window.innerHeight} + \text{window.scrollY} \ge \text{document.documentElement.scrollHeight} - 1
$$

## TanStack Query `useInfiniteQuery` API

### Parameters & Options

The `useInfiniteQuery` hook accepts a single configuration object with the following properties:

#### Required Parameters

* **`queryKey`** (`Array<unknown>`):
  A unique array key used to cache and identify the query data (e.g., `['users']`).

* **`queryFn`** (`(context: QueryFunctionContext) => Promise<TData>`):
  An asynchronous function that fetches data. It receives an object containing `pageParam`.

* **`initialPageParam`** (`unknown`):
  *(Required in TanStack Query v5)* The initial page value passed to `queryFn` on the first fetch (e.g., `1` or `0`).

* **`getNextPageParam`** (`(lastPage, allPages, lastPageParam, allPageParams) => unknown | undefined`):
  A function that determines the `pageParam` for the **next** fetch request. Return `undefined` or `null` to indicate there are no more pages available.

#### Optional Parameters

* **`getPreviousPageParam`** (`(firstPage, allPages, firstPageParam, allPageParams) => unknown | undefined`):
  Used for bi-directional infinite scrolling to calculate the parameter for fetching backwards.

* **`maxPages`** (`number`):
  Limits the maximum number of pages kept in the query cache to optimize memory consumption during long scroll sessions.

* **`enabled`** (`boolean`):
  Set to `false` to disable automatic execution of the query.

* **`staleTime`** (`number`):
  Duration in milliseconds before fetched data is considered stale.

* **`gcTime`** (`number`):
  *(Formerly `cacheTime`)* Duration in milliseconds that unused data remains in memory before garbage collection.

### Return Values

Executing `useInfiniteQuery` returns an object containing states and helper methods:

#### Data & Pagination Properties

* **`data`** (`{ pages: Array<TData>, pageParams: Array<unknown> } | undefined`):

  * `data.pages`: An array containing the fetched payload for every page `[page1, page2, ...]`.

  * `data.pageParams`: An array of parameter values used to fetch each page `[param1, param2, ...]`.

* **`hasNextPage`** (`boolean`):
  Returns `true` if `getNextPageParam` returns any value other than `undefined` or `null`.

* **`hasPreviousPage`** (`boolean`):
  Returns `true` if `getPreviousPageParam` returns a valid value.

* **`isFetchingNextPage`** (`boolean`):
  `true` while the request initiated by `fetchNextPage()` is currently in-flight.

* **`isFetchingPreviousPage`** (`boolean`):
  `true` while the request initiated by `fetchPreviousPage()` is in-flight.

#### Control Functions

* **`fetchNextPage(options?)`** (`Promise<UseInfiniteQueryResult>`):
  Triggers a network request for the next page of results.

* **`fetchPreviousPage(options?)`** (`Promise<UseInfiniteQueryResult>`):
  Triggers a network request for the previous page of results.

#### Query & Network Statuses

* **`status`** (`'pending' | 'error' | 'success'`): Reflects whether data exists in the cache.

  * `'pending'`: No data is available in the cache yet.

  * `'error'`: The query encountered an error and has no cached data.

  * `'success'`: At least one page of data is successfully loaded in the cache.

* **`fetchStatus`** (`'fetching' | 'paused' | 'idle'`): Reflects what the network query runner is actively doing right now.(tells you if the queryFn is actively running right now:)

  * `'fetching'`: A network request is actively in-flight (initial fetch, background refetch, or `fetchNextPage`).

  * `'paused'`: The query attempted to fetch, but execution was paused (e.g., due to no network connection).

  * `'idle'`: The query runner is currently not performing any network requests.

* **`isFetching`** (`boolean`):
  Boolean convenience shorthand for `fetchStatus === 'fetching'`.

* **`isPaused`** (`boolean`):
  Boolean convenience shorthand for `fetchStatus === 'paused'`.

* **`isLoading`** (`boolean`):
  `true` on initial load when no cached data exists and a request is actively in-flight (`status === 'pending' && fetchStatus === 'fetching'`).

* **`isError`** (`boolean`):
  Boolean convenience shorthand for `status === 'error'`.

* **`isSuccess`** (`boolean`):
  Boolean convenience shorthand for `status === 'success'`.

* **`error`** (`Error | null`):
  The error object encountered during execution, if any.

## Complete Code Example

### 1. API Service (`api.js`)

```
import axios from 'axios';

export const fetchUsers = async ({ pageParam = 1 }) => {
    try {
        const res = await axios.get(
            `https://api.github.com/users?per_page=10&page=${pageParam}`
        );
        return res.data;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error;
    }
};

```

### 2. React Component (`InfiniteScroll.jsx`)

```jsx
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { fetchUsers } from '../../api/api';

const InfiniteScroll = () => {
    const { data, hasNextPage, fetchNextPage, status, fetchStatus, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            console.log("Last Page:", lastPage);
            console.log("All Pages:", allPages);

            // If the last page contains 10 items, fetch the next page index; otherwise, stop pagination.
            return lastPage.length === 10 ? allPages.length + 1 : undefined;
        }
    });

    const handleScroll = () => {
        // Calculate if user has reached near the bottom of the page
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;

        if (bottom && hasNextPage) {
            fetchNextPage();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNextPage]);

    // if (status === "pending") return <div>Loading...</div>
    // if (status === "error") return <div>Error fetching data</div>

    return (
        <div>
            <h1>Infinite Scroll with React Query</h1>

            {status === 'pending' && fetchStatus === 'fetching' && <p>Loading users...</p>}
            {status === 'error' && <p>Error loading users.</p>}

            {data?.pages?.map((page, index) => (
                <ul key={index}>
                    {page.map((user) => (
                        <li key={user.id} style={{ padding: "10px", border: "1px solid #ccc" }}>
                            <p>{user.login}</p>
                            <img src={user.avatar_url} alt={user.login} width={50} height={50} />
                        </li>
                    ))}
                </ul>
            ))}
            {isFetchingNextPage && <div>Loading...</div>}
        </div>
    );
};

export default InfiniteScroll;

```

## Detailed Code Breakdown

### 1. The API Fetcher (`fetchUsers`)

* **Context Injection**: React Query injects an object into `queryFn` containing `pageParam`.

* **Default Argument**: `pageParam = 1` guarantees that the first fetch defaults to page `1` if unspecified.

* **REST Request**: Requests `per_page=10` users dynamically corresponding to `pageParam`.

### 2. Configuring `useInfiniteQuery`

* **`queryKey: ['users']`**: Registers query cache under the `users` namespace.

* **`getNextPageParam` Logic**:

  * `lastPage`: The array of 10 users returned by the most recent request.

  * `allPages`: An array containing all previous response pages `[page1, page2, ...]`.

  * **Termination Condition**: Checks `lastPage.length === 10`. If `true`, it assumes more data exists and computes `allPages.length + 1` for the next request. If `lastPage.length < 10`, it returns `undefined` to stop further pagination (`hasNextPage` becomes `false`).

### 3. Scroll Detection (`handleScroll`)

* **Calculation**: Computes current scroll position: `window.innerHeight + window.scrollY`.

* **Threshold**: Checks if position matches or exceeds `document.documentElement.scrollHeight - 1`.

* **Guard Clause**: Executes `fetchNextPage()` only if the bottom threshold is reached **and** `hasNextPage` evaluates to `true`.

### 4. Event Listener Cleanup (`useEffect`)

* Attaches `handleScroll` to the global `window` object upon mounting.

* Features a cleanup function (`return () => window.removeEventListener(...)`) to remove event listeners on unmount or dependency re-evaluation, preventing memory leaks.

* Includes `hasNextPage` in the dependency array to ensure the event closure holds the current state value.

### 5. UI Rendering

* **Nested Array Mapping**: `data.pages` represents an array of page arrays (e.g., `[[page1Items], [page2Items]]`).

* **Data Display**: Iterates over each page array using an outer `.map()` call, and maps each user record to an `<li>` element with an inner `.map()` call.

## Best Practices & Enhancements

1. **Debouncing / Throttling Scroll Listeners**:
   Window scroll events fire continuously during scrolling. Adding a throttle/debounce mechanism prevents excess calculations on the main thread.

2. **Intersection Observer Alternative**:
   Instead of global scroll listeners (`window.addEventListener('scroll')`), using the **Intersection Observer API** on a target `<div>` element at the bottom of the list is often more performant and cleaner.

3. **Prevent Duplicate Fetching**:
   Check `isFetchingNextPage` before triggering `fetchNextPage()` to prevent sending duplicate parallel requests while scrolling quickly.

## Step-by-Step Logic Flow

The runtime flow of the infinite scroll implementation proceeds through these steps:

```
[1. Initial Render]
  │
  ├── React mounts component.
  ├── `useInfiniteQuery` triggers initial fetch with `initialPageParam` (1).
  └── `useEffect` attaches `scroll` event listener to `window`.
  │
[2. Initial Fetch Completion]
  │
  ├── `fetchUsers({ pageParam: 1 })` returns array of 10 users.
  ├── `data.pages` updated to `[[user1, ..., user10]]`.
  ├── `getNextPageParam` evaluates `lastPage.length === 10`.
  │     └── Returns `2` as next pageParam (sets `hasNextPage = true`).
  └── UI renders Page 1 users.
  │
[3. User Scroll Event]
  │
  ├── User scrolls down the page.
  ├── `handleScroll()` fires on window scroll.
  └── Evaluates formula: (window.innerHeight + window.scrollY >= scrollHeight - 1).
        │
        ├── FALSE: User has not reached bottom -> Do nothing.
        └── TRUE: User reached bottom -> Check `hasNextPage`.
              │
              ├── FALSE: No more pages available -> Do nothing.
              └── TRUE: Calls `fetchNextPage()`.
  │
[4. Fetching Next Page]
  │
  ├── React Query sets `isFetchingNextPage = true` and `fetchStatus = 'fetching'`.
  ├── Executes `fetchUsers({ pageParam: 2 })`.
  ├── `data.pages` updated to `[[page 1 users], [page 2 users]]`.
  ├── `getNextPageParam` checks returned length.
  │     ├── If 10 items -> returns `3` (`hasNextPage = true`).
  │     └── If < 10 items -> returns `undefined` (`hasNextPage = false`).
  └── UI automatically re-renders to append new user list items.
  │
[5. Termination / Unmount]
  │
  ├── Repeated until `getNextPageParam` returns `undefined` (no more data).
  └── On component unmount, `useEffect` cleanup removes scroll listener.

```

# `status` & `fetchStatus` Reference

## The 3 Values of `status`

| `status` | Description |
| ----- | ----- |
| **`pending`** | There is no cached data yet, and the query is currently attempting to load for the first time. |
| **`success`** | The query request was successful, and data is available in the cache. |
| **`error`** | The query attempt resulted in an error, and no data could be retrieved. |

## The 3 Values of `fetchStatus`

| `fetchStatus` | Description | 
| ----- | ----- | 
| **`fetching`** | The `queryFn` is actively executing. This covers initial page loads, background refetches, and pagination calls (`fetchNextPage()`). | 
| **`paused`** | The query wants to fetch, but cannot (most commonly due to a lost internet connection). | 
| **`idle`** | The query is completely done fetching and is doing nothing at the moment. | 

## Key Combination Matrix (`status` + `fetchStatus`)

Combining both statuses gives you precise control over your UI states:

| `status` | `fetchStatus` | What is happening? | Best UI to display | 
| ----- | ----- | ----- | ----- | 
| **`pending`** | **`fetching`** | Initial load (no data in cache, network request running). | Full-screen loading spinner / Skeleton loader | 
| **`pending`** | **`paused`** | Initial load attempted, but user lost internet connection before data arrived. | "You are offline. Reconnecting..." | 
| **`success`** | **`fetching`** | Data exists on screen, but a background refetch or `fetchNextPage()` is running. | Non-intrusive loading bar / "Updating..." indicator | 
| **`success`** | **`idle`** | Data is rendered, and no network requests are active. | Normal UI | 
| **`error`** | **`idle`** | Request failed, network is quiet. | Error message with a "Retry" button | 

# Infinite Scroll with React Query & React Intersection Observer
## Installation
```bash
npm i react-intersection-observer
```

This guide explains how to implement seamless infinite scrolling in React applications using **TanStack React Query** (for data fetching and state management) and **React Intersection Observer** (for detecting when the user scrolls near the bottom of the page).

## Table of Contents

1. [Overview](#overview)

2. [How It Works](#how-it-works)

3. [Code Example](#code-example)

4. [React Intersection Observer API Guide](#react-intersection-observer-api-guide)

   * [`useInView` Options / Parameters](#useinview-options--parameters)

   * [`useInView` Return Values](#useinview-return-values)

5. [Key React Query Concepts](#key-react-query-concepts)

## Overview

Infinite scroll automatically loads more content as the user scrolls down the page, eliminating the need for traditional pagination buttons.

We combine two powerful tools:

* **`useInfiniteQuery` (TanStack React Query)**: Handles fetching paginated data, caching, tracking state (`hasNextPage`, `isFetchingNextPage`), and updating pages automatically.

* **`useInView` (React Intersection Observer)**: Tracks a target DOM element (a sentinel/trigger `<div>` at the bottom of the list) using the browser's native `IntersectionObserver` API.

## How It Works

1. **Query Setup**: `useInfiniteQuery` fetches the initial page of data.

2. **Sentinel Element**: A sentinel `<div>` is attached to the bottom of the page using `ref` returned by `useInView`.

3. **Scroll Detection**: As the user scrolls and the sentinel element becomes visible in the viewport, `useInView` sets `inView` to `true`.

4. **Triggering Next Fetch**: A React `useEffect` triggers `fetchNextPage()` whenever `inView` becomes `true` and `hasNextPage` is valid.

5. **Data Concatenation**: React Query merges the new page of data into `data.pages`, automatically re-rendering the UI.

## Code Example

```
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchUsers } from '../../api/api';

const InfiniteScroll2 = () => {
    // 1. Setup Infinite Query
    const { 
        data, 
        hasNextPage, 
        fetchNextPage, 
        status, 
        isFetchingNextPage 
    } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage, allPages) => {
            // Determine if more pages are available based on returned items
            return lastPage.length === 10 ? allPages.length + 1 : undefined;
        }
    });

    // 2. Setup Intersection Observer Hook (All parameters are optional)
    const { ref, inView } = useInView({
        threshold: 0,
    });

    // 3. Trigger next page fetch when sentinel enters viewport
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    if (status === "pending") return <div>Loading...</div>;
    if (status === "error") return <div>Error fetching data</div>;

    return (
        <div>
            <h1>Infinite Scroll with React Query</h1>

            {/* Render items across all fetched pages */}
            {data?.pages?.map((page, index) => (
                <ul key={index}>
                    {page.map((user) => (
                        <li key={user.id} style={{ padding: "10px", border: "1px solid #ccc" }}>
                            <p>{user.login}</p>
                            <img src={user.avatar_url} alt={user.login} width={50} height={50} />
                        </li>
                    ))}
                </ul>
            ))}

            {/* Target Sentinel Node */}
            <div ref={ref} style={{ padding: "20px", textAlign: "center" }}>
                {isFetchingNextPage
                    ? <div>Loading more...</div>
                    : hasNextPage
                        ? <div>Load More</div>
                        : <div>No more data to load</div>}
            </div>
        </div>
    );
};

export default InfiniteScroll2;

```

## React Intersection Observer API Guide

`react-intersection-observer` provides the `useInView` hook, wrapping the native browser [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

> **Note:** **ALL parameters for `useInView` are optional.** You can call `useInView()` with no arguments passed at all, and it will run using default values.

## `useInView` & React Query Infinite Scroll Guide

This reference guide documents the configuration options and return values for `react-intersection-observer` (`useInView`), alongside key React Query concepts used for infinite scrolling.

---

### `useInView` Options / Parameters

You can pass an optional configuration object to `useInView(options)`:

| Parameter | Mandatory / Optional | Type | Default | Explanation |
| :--- | :--- | :--- | :--- | :--- |
| **`threshold`** | Optional | `number \| number[]` | `0` | Indicates at what percentage of the target's visibility `inView` should trigger. Range `0.0` (even 1 pixel visible) to `1.0` (100% visible). Can also accept an array of numbers. |
| **`root`** | Optional | `Element \| null` | `null` | The container element used as the viewport for checking visibility. Defaults to the browser window/viewport if `null`. |
| **`rootMargin`** | Optional | `string` | `'0px 0px 0px 0px'` | Margin around the root. Works like CSS margins (e.g., `'200px 0px'`). Can pre-trigger loading *before* the element actually hits the screen. |
| **`triggerOnce`** | Optional | `boolean` | `false` | If `true`, the intersection observer triggers only once and then unbinds itself. Useful for lazy-loading images or one-time animations. |
| **`skip`** | Optional | `boolean` | `false` | If `true`, stops observing target elements. Useful for dynamically disabling observer logic. |
| **`initialInView`** | Optional | `boolean` | `false` | Sets the initial state of `inView` before the first measurement occurs. Useful for Server-Side Rendering (SSR). |
| **`fallbackInView`** | Optional | `boolean` | `false` | Fallback `inView` value if the environment does not support native `IntersectionObserver`. |
| **`delay`** | Optional | `number` | `0` | Delays updating the `inView` state by specified milliseconds. |
| **`trackVisibility`** | Optional | `boolean` | `false` | Tracks whether the element is actually visible to the user (not occluded or styled `visibility: hidden`). |
| **`onChange`** | Optional | `(inView, entry) => void` | `undefined` | Callback function triggered every time the element's visibility state changes across thresholds. |

---

## `useInView` Return Values

`useInView` returns an array or object containing the following properties:

| Return Value | Usage | Type | Explanation |
| :--- | :--- | :--- | :--- |
| **`ref`** | **Mandatory** | `(node: Element \| null) => void` | Callback ref function that **must** be attached to the target DOM element (e.g., `<div ref={ref} />`) to observe it. |
| **`inView`** | **Optional** | `boolean` | A boolean indicating whether the target element currently meets the threshold condition within the viewport (`true`) or not (`false`). |
| **`entry`** | **Optional** | `IntersectionObserverEntry` | The raw native [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object providing details like `intersectionRatio`, `boundingClientRect`, `time`, etc. |

---

## Key React Query Infinite Scroll Concepts

When implementing infinite scrolling with `@tanstack/react-query` (via `useInfiniteQuery`), the following parameters and state flags are key:

- **`getNextPageParam`**: A callback function receiving `(lastPage, allPages, lastPageParam, allPageParams)`. It evaluates whether additional pages exist. Returning `undefined` or `null` signals that no more pages are available and automatically sets `hasNextPage` to `false`.
- **`fetchNextPage`**: A trigger function called to manually initiate fetching the next chunk/page of data.
- **`isFetchingNextPage`**: A boolean flag indicating if a request is currently in flight fetching the subsequent page (ideal for showing loading spinners at the bottom of a list).
- **`hasNextPage`**: A boolean flag derived from `getNextPageParam` indicating whether there are more pages left to load.

---

### Quick Example: Infinite Scroll with `useInView` & React Query

```tsx
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

export function InfiniteList() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: ({ pageParam = 1 }) => fetchItems(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      {data?.pages.flatMap((page) => page.items).map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* Sentinel element observed by useInView */}
      <div ref={ref} style={{ height: "20px" }}>
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
}
```
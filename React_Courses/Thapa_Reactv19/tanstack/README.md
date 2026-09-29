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
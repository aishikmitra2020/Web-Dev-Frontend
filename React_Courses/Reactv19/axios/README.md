# Axios

Axios is a promise-based HTTP library that helps you easily communicate with servers or APIs over the internet. It allows your website or app to send and receive data from a server, like fetching information, submitting forms, or updating content without reloading the entire page.

Axios uses promises to handle HTTP requests and responses.

It is often considered a more professional alternative to the native Fetch API due to the following advantages:

## Why Choose Axios over Fetch?

- **Easier syntax and cleaner code.**
- **Automatic JSON transformation without extra code.**
- **Better built-in error handling.**
- **Support for older browsers.**

# 1. Using `axios` directly (not recomemded)
```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  // 1. Declare state variables for data, loading, and errors
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2. Define an async function to fetch data
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Make direct GET request using Axios
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        
        // 3. Store the returned data directly into state
        setPosts(response.data);
      } catch (err) {
        // Store error details if request fails
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures this runs once when component mounts

  // Render UI states
  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.slice(0, 5).map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
```

# 2. Axios Instance Configuration & Reference Guide

This guide provides an overview of how to create and use custom API instances using `axios.create()`, followed by a comprehensive list of all configuration options available during instance creation.

---

## 1. Creating and Using an Axios Instance

Creating an instance allows you to define default configurations (such as base URLs, headers, and timeouts) that apply to every request made using that instance.

### Quick Example

```javascript
import axios from 'axios';

// Create an Axios instance with custom configuration
const api = axios.create({
  baseURL: 'https://api.example.com/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Use the instance to fetch data
async function fetchUserData(userId) {
  try {
    const response = await api.get(`/users/${userId}`);
    console.log('User Data:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
}
```

---

## 2. Complete List of `axios.create()` Configuration Properties

When calling `axios.create(config)`, you pass a configuration object (`AxiosRequestConfig`). Below is a complete reference of all properties supported by `axios.create()`:

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`baseURL`** | `string` | `undefined` | Prepended to `url` unless `url` is absolute. |
| **`url`** | `string` | `undefined` | The server URL used for the request. |
| **`method`** | `string` | `'get'` | The HTTP request method (`get`, `post`, `put`, `delete`, `patch`, etc.). |
| **`headers`** | `AxiosHeaders \| object` | `{}` | Custom headers to be sent with every request. |
| **`params`** | `object \| URLSearchParams` | `undefined` | URL parameters to be sent with the request (e.g. `?ID=12345`). |
| **`paramsSerializer`** | `object \| function` | `undefined` | Custom function/options to serialize `params` (e.g., handling array formats). |
| **`data`** | `any` | `undefined` | The data to be sent as the request body (valid for `POST`, `PUT`, `PATCH`). |
| **`timeout`** | `number` | `0` (no timeout) | Milliseconds before the request times out. |
| **`timeoutErrorMessage`** | `string` | `undefined` | Custom message when a request times out. |
| **`withCredentials`** | `boolean` | `false` | Indicates whether cross-site `Access-Control` requests should be made using credentials (cookies, authorization headers). |
| **`auth`** | `object` | `undefined` | Basic HTTP auth credentials (`{ username: '', password: '' }`). |
| **`responseType`** | `string` | `'json'` | Indicates the type of data the server will respond with (`'arraybuffer'`, `'blob'`, `'document'`, `'json'`, `'text'`, `'stream'`). |
| **`responseEncoding`** | `string` | `'utf8'` | Encoding to use for decoding responses (Node.js only). |
| **`xsrfCookieName`** | `string` | `'XSRF-TOKEN'` | Name of the cookie to use as a value for the XSRF header. |
| **`xsrfHeaderName`** | `string` | `'X-XSRF-TOKEN'` | Name of the HTTP header that carries the XSRF token. |
| **`onUploadProgress`** | `function` | `undefined` | Callback function to handle upload progress events. |
| **`onDownloadProgress`** | `function` | `undefined` | Callback function to handle download progress events. |
| **`maxContentLength`** | `number` | `2000000` | Max size (in bytes) allowed for the response content. |
| **`maxBodyLength`** | `number` | `10000000` | Max size (in bytes) allowed for the request body (Node.js only). |
| **`maxRedirects`** | `number` | `5` | Maximum number of redirects to follow (Node.js only). |
| **`socketPath`** | `string` | `null` | Defines a UNIX Socket to be used (Node.js only). |
| **`httpAgent`** | `http.Agent` | `undefined` | Custom HTTP Agent for Node.js requests. |
| **`httpsAgent`** | `https.Agent` | `undefined` | Custom HTTPS Agent for Node.js requests (useful for custom SSL certificates). |
| **`proxy`** | `object \| false` | `undefined` | Defines host and port of the proxy server (`{ host: '', port: 8080, auth: {} }`). Set to `false` to disable. |
| **`cancelToken`** | `CancelToken` | `undefined` | Cancel token used to cancel a request. |
| **`signal`** | `AbortSignal` | `undefined` | `AbortController` signal used to cancel the request. |
| **`decompress`** | `boolean` | `true` | Indicates whether response bodies should be decompressed automatically (Node.js only). |
| **`transports`** | `array` | `undefined` | Array of transport mechanisms to use (`'node'`, `'xhr'`, `'fetch'`). |
| **`transformRequest`** | `function \| Array` | Default JSON serializer | Allows changes to the request data before sending. |
| **`transformResponse`** | `function \| Array` | Default JSON parser | Allows changes to the response data before passing to `.then()`/`.catch()`. |
| **`validateStatus`** | `function` | `status >= 200 && status < 300` | Defines whether to resolve or reject the promise based on HTTP status code. |
| **`env`** | `object` | `undefined` | Custom environment properties (e.g., `FormData` implementation). |
| **`formSerializer`** | `object` | `undefined` | Options for serializing objects into `FormData`. |
| **`family`** | `number` | `undefined` | IP address family to use (4 or 6) (Node.js only). |
| **`lookup`** | `function` | `undefined` | Custom DNS lookup function (Node.js only). |

---

## 3. Instance Interceptors Example

You can attach request or response interceptors to an instance created with `axios.create()`:

```javascript
// Request Interceptor: Attach bearer token dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global response handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.warn('Unauthorized! Redirecting...');
    }
    return Promise.reject(error);
  }
);
```


# Advanced `axios`
# Comprehensive Axios & API Architecture Guide

A complete, production-ready guide for mastering Axios in modern JavaScript/TypeScript applications. This guide covers everything from core instance configurations and error handling mechanics to production folder structures and advanced network patterns.

---

## 1. Anatomy of an Axios Error Object

When an HTTP request fails in Axios, the thrown `error` object provides detailed context about what went wrong at various network and server layers.

### Error Object Hierarchy

```typescript
try {
  await api.get('/endpoint');
} catch (error) {
  // AxiosError structure breakdown
}
```

An `AxiosError` instance contains the following primary properties:

*   **`error.message`**: *(string)* A human-readable message describing the error (e.g., `"Request failed with status code 404"` or `"Network Error"`).
*   **`error.code`**: *(string | undefined)* The error code associated with the failure, such as `'ERR_BAD_REQUEST'`, `'ERR_BAD_RESPONSE'`, `'ECONNABORTED'` (timeout), or `'ERR_NETWORK'`.
*   **`error.config`**: *(AxiosRequestConfig)* The complete configuration object used to make the original request (URL, headers, params, body, etc.). Useful for retrying the request.
*   **`error.request`**: *(XMLHttpRequest | http.ClientRequest | undefined)* The actual request instance sent. In browsers, this is an `XMLHttpRequest` instance; in Node.js, it is an `http.ClientRequest`. It exists if a request was made, even if no response was received.
*   **`error.response`**: *(AxiosResponse | undefined)* Present **only** if the server responded with a status code outside the 2xx range (e.g., 400, 401, 404, 500).
    *   **`error.response.status`**: *(number)* HTTP status code returned by the server (e.g., `404`, `500`).
    *   **`error.response.statusText`**: *(string)* HTTP status text provided by the server (e.g., `'Not Found'`, `'Internal Server Error'`).
    *   **`error.response.data`**: *(any)* The response payload returned by the server (often JSON containing error details like `{ message: "Invalid credentials" }`).
    *   **`error.response.headers`**: *(AxiosHeaders)* Response headers sent back by the server.
    *   **`error.response.config`**: *(AxiosRequestConfig)* Request config associated with this response.
*   **`error.isAxiosError`**: *(boolean)* Boolean flag set to `true` to quickly identify if an error originated from Axios.

---

## 2. Axios Instance Configuration (`axios.create`) Reference

The `axios.create([config])` method allows you to create a pre-configured instance of Axios. Below is an exhaustive breakdown of all configuration properties available.

| Property | Type | Default | Detailed Explanation |
| :--- | :--- | :--- | :--- |
| **`baseURL`** | `string` | `undefined` | Defines the root endpoint for all requests made by this instance. If specified, relative URLs passed to request methods will be prepended with this path. |
| **`url`** | `string` | `undefined` | The target server path relative to `baseURL` or an absolute URL. |
| **`method`** | `string` | `'get'` | The HTTP verb to use for requests (`'get'`, `'post'`, `'put'`, `'patch'`, `'delete'`, `'head'`, `'options'`). |
| **`headers`** | `AxiosHeaders \| object` | `{}` | Custom HTTP headers sent with every request (e.g., `Authorization`, `Content-Type`). |
| **`params`** | `object \| URLSearchParams` | `undefined` | Plain object or search parameters appended to the request URL as query string parameters (e.g., `{ page: 1 }` becomes `?page=1`). |
| **`paramsSerializer`** | `object \| function` | `undefined` | Custom function or options object to control how `params` are serialized into strings (e.g., handling array formats like `ids[]=1&ids[]=2`). |
| **`data`** | `any` | `undefined` | The payload sent in the request body. Applicable for `POST`, `PUT`, `PATCH`, and `DELETE`. Can be an Object, `FormData`, `Blob`, `Buffer`, or `Stream`. |
| **`timeout`** | `number` | `0` (no limit) | Time in milliseconds before the request aborts and throws a timeout error (`ECONNABORTED`). |
| **`timeoutErrorMessage`** | `string` | `undefined` | Custom message string returned when a request times out. |
| **`withCredentials`** | `boolean` | `false` | Indicates whether cross-origin HTTP requests should include credentials such as cookies, TLS certificates, or authorization headers. |
| **`auth`** | `object` | `undefined` | Automatically passes HTTP Basic Authentication headers using `{ username: '', password: '' }`. |
| **`responseType`** | `string` | `'json'` | Defines how Axios parses response data from the server. Options include `'json'`, `'text'`, `'blob'`, `'arraybuffer'`, `'document'`, and `'stream'`. |
| **`responseEncoding`** | `string` | `'utf8'` | Specifies the string encoding used to decode responses (Node.js environments only). |
| **`xsrfCookieName`** | `string` | `'XSRF-TOKEN'` | Name of the cookie to extract the anti-CSRF token from. |
| **`xsrfHeaderName`** | `string` | `'X-XSRF-TOKEN'` | Name of the HTTP header that carries the anti-CSRF token value. |
| **`onUploadProgress`** | `function` | `undefined` | Progress event callback function triggered during upload operations (useful for file uploads). |
| **`onDownloadProgress`** | `function` | `undefined` | Progress event callback function triggered during data retrieval/downloads. |
| **`maxContentLength`** | `number` | `2000000` | Maximum allowable size (in bytes) for HTTP response bodies. |
| **`maxBodyLength`** | `number` | `10000000` | Maximum allowable size (in bytes) for HTTP request bodies (Node.js only). |
| **`maxRedirects`** | `number` | `5` | Defines the maximum number of HTTP redirects Axios will follow in Node.js environments. |
| **`socketPath`** | `string` | `null` | Specifies a UNIX domain socket path to route requests through (Node.js only). |
| **`httpAgent`** | `http.Agent` | `undefined` | Custom HTTP Agent for controlling connection pooling, keep-alive settings, etc. in Node.js. |
| **`httpsAgent`** | `https.Agent` | `undefined` | Custom HTTPS Agent (useful for bypassing self-signed SSL certs in dev environments). |
| **`proxy`** | `object \| false` | `undefined` | Routes requests through a proxy server (`{ host: '...', port: 8080, auth: {...} }`). Set to `false` to ignore system proxies. |
| **`cancelToken`** | `CancelToken` | `undefined` | Legacy mechanism to cancel requests. *(Deprecated in favor of `AbortSignal`)*. |
| **`signal`** | `AbortSignal` | `undefined` | Standard Web API `AbortController.signal` used to cancel ongoing HTTP requests. |
| **`decompress`** | `boolean` | `true` | Controls whether compressed response bodies (`gzip`, `deflate`, `br`) are automatically decompressed (Node.js only). |
| **`transports`** | `array` | `undefined` | Specifies transport modes (`'xhr'`, `'fetch'`, `'node'`) to enforce execution strategy. |
| **`transformRequest`** | `function \| Array` | Default JSON | Array of functions allowing mutation of request headers and data before sending. |
| **`transformResponse`** | `function \| Array` | Default JSON | Array of functions allowing mutation of response data before passing to `.then()` or `.catch()`. |
| **`validateStatus`** | `function` | `200..299` | Determines whether to resolve or reject the promise based on HTTP status code (e.g., `status => status < 500`). |
| **`env`** | `object` | `undefined` | Overrides ambient environment variables (like `FormData` or custom HTTP adapters). |
| **`formSerializer`** | `object` | `undefined` | Controls serialization strategy when automatic conversion to `FormData` occurs. |
| **`family`** | `number` | `undefined` | Forces IPv4 (`4`) or IPv6 (`6`) resolution (Node.js only). |
| **`lookup`** | `function` | `undefined` | Custom DNS resolution function for network lookups (Node.js only). |

---

# Axios Interceptors, Folder Architecture & Advanced Patterns (JavaScript)

This guide covers global error handling with Axios interceptors, how interceptors interact with `catch()` blocks, separation of concerns with a modular JavaScript folder structure, and advanced concepts like request cancellation, automatic retry strategies, and custom adapters.

---

## 3. Global Error Handling with Interceptors

Interceptors allow you to inspect, modify, or halt HTTP requests and responses globally before they reach local `try/catch` blocks.

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// Response Interceptor for Centralized Error Handling
api.interceptors.response.use(
  (response) => {
    // Passes through 2xx status codes unchanged
    return response;
  },
  async (error) => {
    // Intercepts non-2xx status codes and network errors
    const status = error.response?.status;

    if (status === 401) {
      // 1. Handle Token Expiration globally
      console.warn('Unauthorized request. Redirecting to login or refreshing token...');
      // e.g., trigger global auth cleanups or automatic token refresh
    } else if (status === 403) {
      // 2. Handle Forbidden access
      console.error('Forbidden resource requested.');
    } else if (status >= 500) {
      // 3. Handle Server Errors
      console.error('Server side error encountered:', error.response?.data);
    } else if (!error.response) {
      // 4. Handle Network Errors or Timeouts
      console.error('Network disconnect or timeout encountered.');
    }

    // MANDATORY: Re-throw the error so downstream try/catch blocks can react if needed
    return Promise.reject(error);
  }
);

export default api;
```

---

## 4. How Interceptors and `catch()` Work Together

Understanding the execution order and key differences between Interceptors and `catch()` blocks is crucial for clean error handling architectures.

### Execution Flow Sequence

```text
[ Request Initiated ]
        │
        ▼
[ Request Interceptors ]
        │
        ▼
[ HTTP Request / Network Transfer ]
        │
        ▼
[ Server Responds ]
        │
   ┌────┴─────────────────────────┐
   │ Was response 2xx?             │
   └────┬────────────────────┬────┘
       YES                   NO
        │                    │
        ▼                    ▼
[ Response Interceptor ]   [ Response Interceptor ]
  ( fulfilled callback )     ( rejected callback )
        │                    │
        │              ┌─────┴─────────────────────────────┐
        │              │ Does Interceptor Promise.reject?  │
        │              └─────┬───────────────────────┬─────┘
        │                   YES                     NO (handled/recovered)
        ▼                    ▼                       ▼
 [ Component .then() ]  [ Component .catch() ]  [ Component .then() ]
```

### Key Differences Comparison

| Feature | Interceptor (Global Layer) | Catch Block (Local Layer) |
| :--- | :--- | :--- |
| **Scope** | Global (Applies to all requests via that instance) | Local (Applies strictly to a single API call) |
| **Execution Order** | **Executes FIRST** immediately when the network response arrives. | **Executes SECOND** after the interceptor processes/re-throws the error. |
| **Primary Use Cases** | Token refresh, logging, global toast notifications, standardizing error formatting. | Updating UI loading state, showing local form field validation errors. |
| **Control Flow** | Can swallow errors (returning data) or escalate errors (`Promise.reject`). | Consumes the error locally to prevent unhandled promise rejections. |

### Practical Integration Pattern

```javascript
// --- GLOBAL INTERCEPTOR ---
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Log telemetry globally
    logErrorToMonitoringService(error);
    
    // Normalize custom error payload
    const customError = {
      message: error.response?.data?.message || 'Unexpected failure',
      status: error.response?.status || 500,
      originalError: error,
    };

    // Forward normalized error downstream
    return Promise.reject(customError);
  }
);

// --- LOCAL CONSUMPTION ---
async function handleUserSubmit(formData) {
  try {
    const data = await api.post('/users', formData);
  } catch (error) {
    // Local catch receives the normalized error produced by the interceptor
    setFormErrorMessage(error.message);
  } finally {
    setIsSubmitting(false);
  }
}
```

---

## 5. Separation of Concerns & Industry Standard Architecture

To build scalable applications, HTTP configuration, endpoint abstractions, error parsing, and UI state management must be cleanly separated into distinct architecture layers.

### Modular API & Service Architecture Guide

This repository follows a clean, layered architecture for handling HTTP requests, domain/business logic, state management, and React UI components. This document details the folder structure, responsibilities of each layer, and practical usage examples.

---

## 📁 Directory Structure

```text
src/
├── api/
│   ├── client.js                # Base Axios instance configuration
│   ├── endpoints.js             # Centralized API endpoint URL constants
│   ├── interceptors/
│   │   ├── auth.interceptor.js   # Bearer token injection & header setup
│   │   └── error.interceptor.js  # Global error normalizer & system-level toasts
│   └── modules/
│       ├── auth.api.js          # Low-level Auth HTTP requests
│       ├── user.api.js          # Low-level User HTTP requests
│       └── product.api.js       # Low-level Product HTTP requests
│
├── services/
│   ├── auth.service.js          # Auth domain & business logic orchestration
│   └── user.service.js          # User data transformations & combined operations
│
├── utils/
│   ├── AppError.js              # Custom Error class extending native JS Error
│   └── errorHandler.js         # Error normalization & formatting helpers
│
├── components/
│   ├── common/
│   │   ├── Button.jsx           # Reusable UI Button
│   │   └── ToastContainer.jsx   # Global Toast Notification provider
│   └── features/
│       └── user/
│           ├── UserProfile.jsx  # User Profile UI component
│           └── RegistrationForm.jsx # Registration Form with inline/toast handling
│
├── hooks/
│   └── useAuth.js               # Custom React hook consuming services/state
│
├── App.jsx                      # Application root component
└── index.js                    # Entry point
```

---

## 🛈 Layer Responsibilities & Implementation Details

### 1. API Layer (`src/api/`)

The **API layer** is strictly concerned with sending low-level HTTP network requests. It must **not** contain complex UI logic, local component state, or heavy domain transformations.

* **`endpoints.js`**: Holds immutable string constants for endpoints. Prevents hardcoding URLs throughout the codebase.
* **`client.js`**: Initializes the primary Axios instance (baseURL, default timeouts, default headers).
* **`interceptors/`**:
  * `auth.interceptor.js`: Dynamically attaches authentication credentials (e.g., JWT `Authorization: Bearer <token>`) to outgoing requests.
  * `error.interceptor.js`: Intercepts non-2xx HTTP responses, normalizes them into standard formats using `AppError`, and can trigger global non-intrusive notifications (e.g., 500 Server Errors).
* **`modules/*.api.js`**: Grouped API functions returning raw response promises (e.g., `apiClient.get()`, `apiClient.post()`).

#### Example: `src/api/endpoints.js`
```javascript
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/users/me',
    UPDATE: '/users/update',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id) => `/products/${id}`,
  },
};
```

---

### 2. Utilities & Error Handling (`src/utils/`)

Provides foundational utility classes and helper functions to standardize error structures across the application.

* **`AppError.js`**: Standardized custom JavaScript error class extending native `Error`. Captures metadata like HTTP status code, operational flags, and error codes.
* **`errorHandler.js`**: Utility functions to inspect unknown errors and format them consistently into instances of `AppError`.

#### Example: `src/utils/AppError.js`
```javascript
export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR', details = null) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true; // Distinguishes operational errors from bugs

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}
```

---

### 3. Service Layer (`src/services/`)

The **Service layer** acts as a bridge between the raw API data layer and the UI/State layer. 

* Orchestrates multiple API calls if required.
* Handles data transformation/formatting (mapping backend response models to UI view models).
* Implements domain business logic (e.g., persisting user sessions, checking permissions).
* Throws structured domain errors using `AppError`.

#### Example: `src/services/auth.service.js`
```javascript
import { authApi } from '../api/modules/auth.api';
import { AppError } from '../utils/AppError';

export const authService = {
  async login(credentials) {
    try {
      const response = await authApi.login(credentials);
      const { token, user } = response.data;

      // Store auth session
      localStorage.setItem('authToken', token);

      // Data transformation (if necessary)
      return {
        user: {
          id: user.id,
          fullName: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      throw new AppError(
        error.response?.data?.message || 'Login failed. Please check your credentials.',
        error.response?.status || 400,
        'AUTH_LOGIN_FAILED'
      );
    }
  },

  logout() {
    localStorage.removeItem('authToken');
  },
};
```

---

### 4. Custom Hooks Layer (`src/hooks/`)

React hooks encapsulate stateful presentation logic, asynchronous states (loading, error, data), and interface directly with services.

* **`useAuth.js`**: Provides authentication methods (`login`, `logout`, `register`) and state (`currentUser`, `isLoading`, `authError`) to components.

#### Example: `src/hooks/useAuth.js`
```javascript
import { useState, useCallback } from 'react';
import { authService } from '../services/auth.service';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.login(credentials);
      setUser(result.user);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, login };
};
```

---

### 5. Component Layer (`src/components/`)

Separated into reusable UI primitives (`common/`) and feature-specific views/forms (`features/`).

* **`common/`**: Stateless or context-agnostic UI elements (Buttons, Inputs, Modals, Toast Containers).
* **`features/`**: Context-aware UI units handling form state, user input validations, and custom hook consumption.

---

## 🔄 Request & Data Flow Architecture

The data flow in this architecture moves in a clear, single-direction sequence:

```text
[ UI Component / Form ]
         │
         ▼ (Calls hook action)
[ Custom Hook / State ]
         │
         ▼ (Invokes business operation)
[ Service Layer ]
         │
         ▼ (Performs low-level request)
[ API Module ]
         │
         ▼ (Applies tokens/interceptors)
[ Axios Client ]  ──────► [ Backend Server ]
```

### Response Path:
1. **Backend Server** returns response or error.
2. **Axios Interceptor** normalizes HTTP errors using `AppError`.
3. **API Module** returns parsed data or passes error up.
4. **Service Layer** transforms raw payload to UI-friendly data models.
5. **Hook** updates local React state (`data`, `loading`, `error`).
6. **UI Component** renders updated data or displays targeted validation errors/toasts.

---

## 🛠 Best Practices Summary

1. **Separation of Concerns**: Never make raw HTTP requests inside React components or hooks directly. Always route through `services/` and `api/`.
2. **Centralized Endpoint Management**: Avoid hardcoding path strings inside API functions. Always reference `endpoints.js`.
3. **Consistent Error Handling**: Use `AppError` across all layers so errors can be inspected predictably for UI feedback (`error.message`, `error.statusCode`).
4. **Token Security**: Rely on `auth.interceptor.js` to automatically attach authorization headers rather than manually pulling tokens in individual API calls.



## 6. Advanced Axios Concepts

### A. Request Cancellation (`AbortController`)

Avoid memory leaks or stale state race conditions by cancelling pending HTTP requests when components unmount or search queries change.

```javascript
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiClient } from './api/client.js';

function SearchComponent() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    // 1. Instantiate AbortController
    const controller = new AbortController();

    async function performSearch() {
      try {
        const response = await apiClient.get('/search', {
          params: { q: query },
          signal: controller.signal, // 2. Pass signal to request config
        });
        console.log('Search Results:', response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request explicitly aborted:', error.message);
        } else {
          console.error('Search request failed:', error);
        }
      }
    }

    if (query) performSearch();

    // 3. Cleanup function triggers abort on component unmount/re-render
    return () => controller.abort();
  }, [query]);
}
```

### B. Automatic Request Retry Strategy

Implement retry logic with exponential backoff for transient network issues or rate-limiting (429 status codes).

```javascript
export function attachRetryStrategy(instance, maxRetries = 3) {
  instance.interceptors.response.use(undefined, async (error) => {
    const config = error.config;

    // Initialize or increment retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if max retries exceeded or if error is not retryable
    if (config.__retryCount >= maxRetries || (error.response && error.response.status < 500)) {
      return Promise.reject(error);
    }

    config.__retryCount += 1;

    // Exponential delay calculation: 1s, 2s, 4s...
    const backoffDelay = Math.pow(2, config.__retryCount) * 1000;

    await new Promise((resolve) => setTimeout(resolve, backoffDelay));

    // Re-execute request with original configuration
    return instance(config);
  });
}
```

### C. Concurrent Requests (`Promise.all` / `Promise.allSettled`)

Execute multiple requests in parallel without unnecessary sequential blocking.

```javascript
import { apiClient } from './api/client.js';

async function fetchDashboardData(userId) {
  try {
    // Execute concurrent requests
    const [userResponse, statsResponse] = await Promise.all([
      apiClient.get(`/users/${userId}`),
      apiClient.get(`/users/${userId}/stats`),
    ]);

    return {
      user: userResponse.data,
      stats: statsResponse.data,
    };
  } catch (error) {
    console.error('One or more dashboard requests failed:', error);
    throw error;
  }
}
```

### D. Custom Adapters (Mocking & Testing)

Axios adapters allow intercepting network dispatches entirely, enabling effortless API mocking during development or unit testing.

```javascript
import axios from 'axios';

// Define a custom mock adapter
const mockAdapter = async (config) => {
  if (config.url === '/mock-endpoint') {
    return {
      data: { status: 'success', mockData: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  }
  throw new Error(`Unhandled mock route: ${config.url}`);
};

// Pass custom adapter during instance initialization
const mockApi = axios.create({
  adapter: mockAdapter,
});
```

---

# 📚 Deep Dive: Understanding & Working with HTTP Headers

HTTP Headers are key-value pairs sent between the client (browser/React application) and the server in every request and response. They transmit critical metadata about the request, authorization status, client capabilities, and payload context.

### Key Categories of Headers

| Category | Header | Common Value | Description |
| :--- | :--- | :--- | :--- |
| **Content Type** | `Content-Type` | `application/json`, `multipart/form-data` | Tells the server what media type the request body contains. |
| **Acceptance** | `Accept` | `application/json` | Tells the server what response format the client expects. |
| **Authentication** | `Authorization` | `Bearer <JWT_TOKEN>` | Passes authentication credentials to validate the user. |
| **Custom Context** | `X-Client-Version` | `1.2.0` | Custom headers used by app backend for tracking/routing. |
| **Localization** | `Accept-Language` | `en-US`, `es-ES` | Informs the server of preferred response language. |
| **Correlation / Tracing**| `X-Request-ID` | `uuid-v4-string` | Unique identifier for distributed tracing and debugging logs. |

---

### Setting Base Headers (`src/api/client.js`)

Default headers apply to every HTTP request initiated by the Axios client instance.

```javascript
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com/v1',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Platform': 'web',
    'X-App-Version': '1.0.0',
  },
});
```

---

### Dynamic Headers via Interceptors (`src/api/interceptors/auth.interceptor.js`)

For dynamic values (like user authentication tokens), attach headers automatically right before each request leaves the application:

```javascript
import { apiClient } from '../client';

export const setupAuthInterceptor = () => {
  apiClient.interceptors.request.use(
    (config) => {
      // Fetch token from storage or auth state
      const token = localStorage.getItem('authToken');

      if (token) {
        // Attach JWT Bearer token
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      // Attach dynamic trace/request ID for server log correlation
      config.headers['X-Request-ID'] = crypto.randomUUID();

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
```

---

### Overriding Headers for Specific Operations

Certain operations—such as file uploads or binary downloads—require overriding default header configurations:

#### 1. File Uploads (`multipart/form-data`)

```javascript
// src/api/modules/user.api.js
import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export const userApi = {
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    return apiClient.post(ENDPOINTS.USER.UPDATE_AVATAR, formData, {
      headers: {
        // Browser automatically sets boundary string when Content-Type is multipart/form-data
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
```

#### 2. Dynamic Content Negotiation (Language or Format)

```javascript
export const productApi = {
  getReportPdf: (productId, locale = 'en-US') => {
    return apiClient.get(`/products/${productId}/report`, {
      headers: {
        'Accept': 'application/pdf',
        'Accept-Language': locale,
      },
      responseType: 'blob', // Expect binary file response
    });
  },
};
```

---

## 🔄 Request & Data Flow Architecture

```
[ UI Component / Form ]
         │
         ▼ (Calls hook action)
[ Custom Hook / State ]
         │
         ▼ (Invokes business operation)
[ Service Layer ]
         │
         ▼ (Performs low-level request)
[ API Module ]
         │
         ▼ (Applies default & auth headers via interceptors)
[ Axios Client ]  ──────► [ Backend Server ]
```

---

## 🛠 Best Practices Summary

1. **Separation of Concerns**: Never make raw HTTP requests inside React components directly. Route requests through `services/` and `api/`.
2. **Centralized Endpoint Management**: Avoid hardcoding URL path strings. Use `endpoints.js`.
3. **Automate Headers with Interceptors**: Attach authorization and correlation headers globally in `auth.interceptor.js` rather than repeating header configuration in every API call.
4. **Never Hardcode Auth Tokens**: Store tokens securely and inject them dynamically via request interceptors.
5. **Standardized Error Normalization**: Use `AppError` to capture status codes and operational error contexts uniformly.

---

# Axios Headers Guide: 3 Ways to Pass Headers

This guide explains the three primary methods for adding HTTP headers when working with Axios in a JavaScript/React application, along with best practices for handling authentication tokens.

---

## 1. Directly Inside `axios.create` (Static / Default Headers)

When instantiating a base Axios instance, you can define global headers inside the configuration object. These headers will automatically be included in **every request** made using this instance.

### Example

```javascript
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.example.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-App-Platform': 'web',
  },
});
```

### When to Use
* Static configuration headers that do not change during the app lifecycle (e.g., `Content-Type`, custom client version, app environment headers).

---

## 2. Attaching Directly While Fetching (Per-Request Headers)

You can pass headers dynamically on a per-request basis by adding a configuration object as an argument to individual Axios method calls (`axios.get`, `axios.post`, etc.).

### Example

```javascript
import { apiClient } from './client';

// 1. Sending a multipart file upload
export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  return apiClient.post('/user/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 2. Fetching localized data or attaching a one-off token
export const fetchUserData = async (token, language = 'en-US') => {
  return apiClient.get('/user/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept-Language': language,
    },
  });
};
```

### When to Use
* One-off header overrides (e.g., changing `Content-Type` for file uploads).
* Endpoint-specific headers (e.g., specifying language preferences or requesting binary PDF files).

---

## 3. Using Axios Interceptors (Dynamic Global Headers)

Request interceptors run **before every single request** is sent out. This allows you to inspect local storage or app state and inject dynamic values right before network dispatch.

### Example

```javascript
import { apiClient } from './client';

apiClient.interceptors.request.use(
  (config) => {
    // Retrieve token dynamically right before the request is made
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Dynamic request tracing ID
    config.headers['X-Request-ID'] = crypto.randomUUID();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

### When to Use
* Global, dynamic headers such as authorization tokens, session keys, or request correlation IDs.

---

## ⚠️ Important Note on Authorization Tokens

> **Authorization tokens (like JWTs) should ONLY be attached using Method 2 (per-request) or Method 3 (interceptors), and NOT Method 1 (`axios.create`).**

### Why?
* `axios.create()` is executed **only once** when the file or module is initialized.
* If a user logs in *after* the application starts, reading `localStorage` or state inside `axios.create()` will result in `null` or an outdated token because `axios.create()` does not re-evaluate when user authentication state changes.
* Using **Interceptors (Method 3)** ensures that the token is read fresh from storage/state on **every single request**, correctly capturing login, logout, and token refresh events.

# Stateless Authentication & HTTP Authentication Tokens Guide

This guide covers the core concepts of **Stateless Authentication**, how it contrasts with stateful session management, and the primary **types of HTTP Authentication schemes & tokens** used in modern web development.

---

## 1. What is Stateless Authentication?

In web architecture, **Stateless Authentication** means that the backend server does **not** store session state or user login records in its memory or application database between requests.

Instead, all the necessary information to identify and authorize the request (e.g., User ID, roles, expiration timestamp) is encoded directly into a digital token provided by the client with **every HTTP request**.

```
Stateful (Session-Based):
[ Client ] ──► Request + Session ID ──► [ Server ] ──► Query Database / Redis for Session Data

Stateless (Token-Based):
[ Client ] ──► Request + Access Token ──► [ Server ] ──► Cryptographically Verifies Token Signature
```

### Stateful vs. Stateless Architecture

| Feature | Stateful (Sessions) | Stateless (Tokens) |
| :--- | :--- | :--- |
| **Storage Location** | Server side (Memory, Database, Redis) | Client side (`localStorage`, Cookies, Memory) |
| **Server Overhead** | Higher (Requires DB lookup per request) | Lower (Requires CPU-based signature check) |
| **Scalability** | Harder (Requires shared session store across server nodes) | Easy (Any server instance can verify the token independently) |
| **Revocation** | Immediate (Delete session from server storage) | Delayed (Token remains valid until it expires, unless blacklisted) |
| **Horizontal Scaling** | Requires sticky sessions or Redis cluster | Seamless across microservices / distributed servers |

---

## 2. Common HTTP Authentication Schemes & Token Types

When making HTTP calls, credentials are sent in the standard `Authorization` header using the format:

```http
Authorization: <scheme> <credentials>
```

Here are the primary types used in web applications:

### 1. Bearer Tokens (`Bearer <token>`)

The **Bearer scheme** is the most widely used token mechanism in modern web applications, REST APIs, and OAuth 2.0 frameworks.

* **Mechanism:** "Bearer" literally means *"give access to whoever bears (holds) this token."* The server checks only whether the token is valid, cryptographically signed, and unexpired.
* **Format:** Most commonly paired with **JWT (JSON Web Tokens)**.
* **Header Example:**
  ```http
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

#### Sub-Type: JSON Web Token (JWT)
A JWT is a specific, self-contained token format made of three base64-encoded parts separated by dots (`.`):
1. **Header:** Contains algorithm and token type (`{"alg": "HS256", "typ": "JWT"}`).
2. **Payload:** Contains user claims and metadata (`{"sub": "123", "name": "John", "exp": 1700000000}`).
3. **Signature:** Generated by signing the header + payload using a secret server key.

---

### 2. Basic Authentication (`Basic <base64_string>`)

One of the oldest HTTP authentication standards (RFC 7617).

* **Mechanism:** Encodes `username:password` into a Base64 string.
* **Header Example:**
  ```http
  Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
  ```
* **Use Case:** Internal microservices, legacy APIs, or simple developer tool configurations.
* **Caveat:** Base64 is **encoding, not encryption**. Anyone can decode it back to plaintext, making HTTPS mandatory.

---

### 3. API Keys (`X-API-Key` or `Authorization: Api-Key <key>`)

A long-lived string generated by a backend service for client identification.

* **Mechanism:** Identifies a specific client application or enterprise user rather than an individual logged-in user.
* **Header Examples:**
  ```http
  X-API-Key: 1234567890abcdef
  /* or */
  Authorization: Api-Key 1234567890abcdef
  ```
* **Use Case:** Server-to-server integrations, developer SDKs (e.g., Stripe, OpenAI, Google Maps APIs).

---

### 4. Digest Authentication (`Digest <params>`)

Designed as an upgrade over Basic Authentication to prevent sending passwords in plaintext or easily decodable formats.

* **Mechanism:** Uses a challenge-response scheme where the server sends a unique `nonce` (number used once), and the client returns a hashed digest combining the password, nonce, URI, and HTTP method.
* **Use Case:** Embedded devices, routers, network equipment APIs.

---

### 5. MAC / Hawk / OAuth 1.0a Signature Schemes

Tokens accompanied by a client-calculated HMAC signature calculated over request parameters (URL, HTTP method, timestamp, body).

* **Mechanism:** Prevents request tampering and replay attacks without transmitting a static secret.
* **Use Case:** High-security financial APIs and OAuth 1.0 implementations.

---

## 3. Best Practices for Token Management

1. **Short Lifespans:** Set access token expiration times between 15 and 60 minutes.
2. **Pair with Refresh Tokens:** Use short-lived access tokens (for request authorization) alongside long-lived refresh tokens (stored in HTTP-Only, Secure cookies to request new access tokens).
3. **Always Use HTTPS:** Stateless tokens act as bearer credentials; if intercepted over HTTP, an attacker can impersonate the user.
4. **Never Store Secrets in Frontend Code:** Store token signing keys exclusively on backend servers.


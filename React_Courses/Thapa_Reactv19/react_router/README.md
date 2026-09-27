# React Router DOM Setup & Usage Guide

A lightweight, declarative routing solution for React applications. This guide provides a complete overview of setting up and managing client-side routing using `react-router-dom` (v6+).

> **Note:** React does not include built-in routing out of the box. `react-router-dom` is a standalone, third-party package designed to simplify and manage client-side routing in React applications.

---

## 📦 Installation

Install the package using your preferred package manager:

```bash

# npm
npm install react-router-dom


# yarn
yarn add react-router-dom


# pnpm
pnpm add react-router-dom
```

## 🛣️ Defining Routes with `createBrowserRouter`

React Router DOM (v6.4+) supports two syntax styles for defining routes when using `createBrowserRouter`. Both approaches yield the exact same behavior under the hood.

---

### Method 1: Object-Based Syntax (Recommended)

This is the standard approach using pure JavaScript objects to define route trees.

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Movie from './pages/Movie';
import Contact from './pages/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/about',
    element: <About/>,
  },
  {
    path: '/movie',
    element: <Movie/>,
  },
  {
    path: '/contact',
    element: <Contact/>,
  },
]);

export default function App() {
  return <RouterProvider router="{router}"/>;
}
```

---

### Method 2: JSX Syntax `(createRoutesFromElements)`

If you prefer writing JSX tags instead of JavaScript objects, wrap your `<Route>` components with `createRoutesFromElements`.

```js
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Movie from './pages/Movie';
import Contact from './pages/Contact';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element="{<Home" path="/"/>} />
      <Route element="{<About" path="/about"/>} />
      <Route element="{<Movie" path="/movie"/>} />
      <Route element="{<Contact" path="/contact"/>} />
    </>
  )
);

export default function App() {
  return <RouterProvider router="{router}"/>;
}
```
> Here, we may also use `<></>` instead of the parent wrapper `<Route></Route>

> We may place the `const router=...` inside the `App` function too!


# React Router: Nested Routes (`children`) and `<Outlet />`

This guide explains how nested routing works in React Router (v6+) using `createBrowserRouter`, the `children` array, and the `<Outlet />` component based on your configuration.

---

## 🛠 Router Configuration

In your setup, you are using `createBrowserRouter` to define a top-level layout route with nested `children` routes:

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import Home from './Home';
import About from './About';
import Movie from './Movie';
import Contact from './Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/movie',
        element: <Movie />
      },
      {
        path: '/contact',
        element: <Contact />
      },
    ]
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

---

## React Router Data APIs: Loaders & Actions (`createBrowserRouter`)

With React Router v6.4+, data fetching and data mutation are integrated directly into your route definitions using **Data Routers** (`createBrowserRouter`).

* **`loader`**: Handles reading/fetching data **before** a route renders (`GET`).
* **`action`**: Handles mutating data when a form is submitted (`POST`, `PUT`, `PATCH`, `DELETE`).

---

## 1. Core Architecture

Instead of fetching data inside components using `useEffect` or handling forms with local state, React Router decouples data logic from rendering logic.

```
       [ Route Navigation / Form Submit ]
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
    [ loader() ]            [ action() ]
         │                       │
 (Fetches Data)          (Mutates Data)
         │                       │
         ▼                       ▼
  <useLoaderData/>       (Triggers Revalidation)
         │                       │
         └───────────┬───────────┘
                     ▼
             [ Component UI ]
```

---

## 2. Loaders (`loader`) — Fetching Data

A `loader` is an `async` function that fetches data for a route **before** it renders.

### Route Definition

```jsx
import { createBrowserRouter } from "react-router-dom";
import Movies, { moviesLoader } from "./pages/Movies";

const router = createBrowserRouter([
  {
    path: "/movies",
    element: <Movies />,
    loader: moviesLoader,
    errorElement: <ErrorPage />,
  },
]);
```

### Page Component & Loader Implementation

```jsx
import { useLoaderData } from "react-router-dom";

// 1. Loader Function Definition
export async function moviesLoader() {
  const response = await fetch("https://api.example.com/movies");

  if (!response.ok) {
    throw new Response("Failed to fetch movies", { status: response.status });
  }

  return response.json(); // Automatically parsed by React Router
}

// 2. Component using loader data
export default function Movies() {
  const movies = useLoaderData(); // Reads data returned by moviesLoader

  return (
    <div>
      <h1>Movies Catalog</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Accessing Dynamic Route Parameters (`params`)

Loaders receive an object containing dynamic route URL parameters:

```jsx
// Route: /movies/:id
export async function movieDetailLoader({ params }) {
  const response = await fetch(`https://api.example.com/movies/${params.id}`);
  
  if (!response.ok) {
    throw new Response("Movie not found", { status: 404 });
  }
  
  return response.json();
}
```

---

## 3. Actions (`action`) — Mutating Data

An `action` function handles data submissions triggered by React Router's `<Form>` component or `useSubmit()` hook.

### Route Definition

```jsx
import { createBrowserRouter } from "react-router-dom";
import AddMovie, { addMovieAction } from "./pages/AddMovie";

const router = createBrowserRouter([
  {
    path: "/movies/new",
    element: <AddMovie />,
    action: addMovieAction,
    errorElement: <ErrorPage />,
  },
]);
```

### Form Component & Action Implementation

```jsx
import { Form, redirect, useActionData } from "react-router-dom";

// 1. Action Function Definition
export async function addMovieAction({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const genre = formData.get("genre");

  // Client-side validation check
  if (!title) {
    return { error: "Title is required!" }; // Return data to component
  }

  const response = await fetch("https://api.example.com/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, genre }),
  });

  if (!response.ok) {
    throw new Response("Failed to save movie", { status: response.status });
  }

  // Redirect to movies list after successful mutation
  return redirect("/movies");
}

// 2. Component Rendering Form
export default function AddMovie() {
  const actionData = useActionData(); // Accesses object returned by action

  return (
    <div>
      <h2>Add New Movie</h2>
      <Form method="post">
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        
        {/* Render inline validation error if returned from action */}
        {actionData?.error && (
          <p style={{ color: "red" }}>{actionData.error}</p>
        )}

        <label>
          Genre:
          <input type="text" name="genre" />
        </label>

        <button type="submit">Create Movie</button>
      </Form>
    </div>
  );
}
```

---

## 4. Automatic Revalidation

One of the biggest advantages of React Router's Data APIs is **automatic revalidation**:

1. You execute a form submission via an `action`.
2. The `action` finishes executing on the backend.
3. React Router **automatically re-runs all active route loaders** on the current page to ensure the UI updates instantly with the new data.

---

## 5. Summary Comparison

| Feature | `loader` | `action` |
| :--- | :--- | :--- |
| **HTTP Purpose** | Read (`GET`) | Write/Mutate (`POST`, `PUT`, `DELETE`, `PATCH`) |
| **When it runs** | Before page renders | On form submission |
| **Data Hook** | `useLoaderData()` | `useActionData()` |
| **Trigger Source** | URL Navigation | `<Form>`, `<Fetcher.Form>`, `useSubmit()` |
| **Error Handling** | Thrown errors caught by `errorElement` | Thrown errors caught by `errorElement` |


---

## 👨‍👩‍👧 1. What are `children` Routes?

The `children` array allows you to define **nested routes**. 

Nested routing allows common UI elements (like headers, footers, or sidebars) to stay rendered while the specific page content inside changes dynamically based on the current URL.

### Key Concepts:
* **Parent Route (`/`):** Loads `<AppLayout />`, which stays visible across all child routes.
* **Child Routes:** Individual components (`<Home />`, `<About />`, `<Movie />`, `<Contact />`) that render *inside* the layout when their path matches the browser URL.

---

## 🔌 2. What is `<Outlet />`?

`<Outlet />` is a component provided by `react-router-dom`. It serves as a **placeholder** inside the parent component (`<AppLayout />`) where the child routes will be injected.

### Implementing `<Outlet />` in `AppLayout.jsx`

```jsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const AppLayout = () => {
  return (
    <div className="app-container">
      <Header />
      
      {/* Dynamic content renders here depending on the URL */}
      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
```

---

## 📊 3. Route Resolution Matrix

| URL Path | Parent Layout Rendered | Component Injected into `<Outlet />` |
| :--- | :--- | :--- |
| `/` | `<AppLayout />` | `<Home />` |
| `/about` | `<AppLayout />` | `<About />` |
| `/movie` | `<AppLayout />` | `<Movie />` |
| `/contact` | `<AppLayout />` | `<Contact />` |

---

## 💡 Key Takeaways

1. **Persistent UI:** Shared UI like Navbar and Footer will not re-render when switching between `/about`, `/movie`, or `/contact`.
2. **Dynamic Swapping:** `<Outlet />` automatically renders whichever child component matches the active path.
3. **Clean Codebase:** Keeps route structures organized and easy to maintain in a single configuration object.

---

## `Link` vs `NavLink`

Both `<Link>` and `<NavLink>` allow navigation without triggering a full browser page refresh.

* **`<Link>`**: Used for standard internal navigation. It renders an `<a>` tag without tracking whether the route matches the current URL.
* **`<NavLink>`**: A special version of `<Link>` designed specifically for navigation menus. It knows whether its route is currently **active** or pending, making it easy to apply conditional styles or CSS classes.

---

## 3. Four Ways to Handle Active Links with `NavLink`

 React Router provides multiple ways to styling active links using `<NavLink>`.

### Approach 1: Default CSS Class Behavior

By default, `<NavLink>` automatically appends the CSS class `"active"` to the rendered element when its `to` prop matches the current URL. You don't need to write inline functions—just target the `.active` class in your CSS file.

```jsx
// Component
<NavLink to="/about">About</NavLink>
```

```css
/* styles.css */
a.active {
  color: #007bff;
  font-weight: bold;
  border-bottom: 2px solid #007bff;
}
```

---

### Approach 2: Custom Dynamic CSS Classes (`className` callback)

You can pass a function to the `className` prop. React Router passes an object containing `{ isActive }` to this function.

> **Note:** Providing a custom `className` function replaces the default active class behavior with your returned class string.

```jsx
<NavLink 
  to="/" 
  className={({ isActive }) => isActive ? "nav-link active-custom" : "nav-link"}
>
  Home
</NavLink>
```
> We can also create a separate function...
---

### Approach 3: Inline Dynamic Styling (`style` callback)

You can pass a function to the `style` prop to apply inline styles based on the active status.

> **Note:** Unlike custom `className` functions, using inline `style` callbacks does **not** suppress the default `active` class name on the element.

```jsx
<NavLink 
  to="/movie"
  style={({ isActive }) => ({
    color: isActive ? "red" : "black",
    fontWeight: isActive ? "bold" : "normal"
  })}
>
  Movie
</NavLink>
```

---

### Approach 4: Extracted Helper Function for Clean Code

For cleaner JSX—especially in large navigation bars—you can extract the styling logic into a separate helper function outside the component.

```jsx
// External style generator function
const getNavLinkStyle = ({ isActive }) => ({
  color: isActive ? "green" : "black",
  textDecoration: isActive ? "underline" : "none"
});

// Component JSX
<NavLink to="/contact" style={getNavLinkStyle}>
  Contact
</NavLink>
```

---

## Summary Matrix: `NavLink` Active State Approaches

| Approach | Feature | Default `active` Class Preserved? |
| :--- | :--- | :--- |
| **1. Default Behavior** | Automatically adds `class="active"` | ✅ Yes |
| **2. Dynamic `className`** | Custom class string via function `({ isActive }) => ...` | ❌ No (Overridden) |
| **3. Dynamic `style`** | Direct inline styles via function `({ isActive }) => ...` | ✅ Yes |
| **4. Extracted Helper** | Cleaner JSX using external functions for `style` or `className` | Depends on prop (`style` vs `className`) |

## Advanced NavLink States: `isPending` and `isTransitioning`

When using data loaders, actions, or View Transitions API in React Router, navigation is asynchronous. `NavLink` provides `isPending` and `isTransitioning` properties to improve feedback.

### A. What is `isPending`?

#### **Definition:**

`isPending` is a boolean flag indicating that the user clicked the link and React Router is currently fetching data or loading the next route component in the background. The page has **not changed yet**, but navigation is in progress.

#### **When to use it:**

Use `isPending` to show visual feedback (e.g., loading spinners, muted colors, or progress indicators) directly on the link so users know their click was registered.

#### **Example Code:**

```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <NavLink
      to="/movie"
      className={({ isActive, isPending }) =>
        isPending ? "nav-item pending" : isActive ? "nav-item active" : "nav-item"
      }
    >
      {({ isPending }) => (
        <span>
          Movies {isPending && <span className="spinner">⏳</span>}
        </span>
      )}
    </NavLink>
  );
}
```

```css
/* CSS */
.nav-item.pending {
  opacity: 0.6;
  cursor: wait;
}
```

---

### B. What is `isTransitioning`?

#### **Definition:**

`isTransitioning` is a boolean flag indicating that a **View Transition** (using browser View Transitions API) is actively running during the navigation to this link's URL.

#### **When to use it:**

Use `isTransitioning` to apply temporary CSS view transition names or animation classes to elements while page elements animate from their old positions/styles to new ones.

#### **Example Code:**

```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <NavLink
      to="/movie"
      viewTransition // Enables View Transitions for this link
      style={({ isTransitioning }) => ({
        viewTransitionName: isTransitioning ? 'slide-nav' : 'none'
      })}
    >
      {({ isTransitioning }) => (
        <span className={isTransitioning ? 'animating' : ''}>
          Movies
        </span>
      )}
    </NavLink>
  );
}
```

---

## 5. State Properties Summary

| State Property | Description | Common Use Case |
| :--- | :--- | :--- |
| **`isActive`** | `true` if current route matches link URL | Highlighting active menu items |
| **`isPending`** | `true` while data/code for target route is loading | Showing spinners or disabled states on clicked link |
| **`isTransitioning`** | `true` while a View Transition animation is active | Triggering CSS animations during page transitions |


---

# Error Handling in React Router v6+

This guide covers two primary patterns for handling routing errors and unmatched routes using React Router (`createBrowserRouter`).

---

## Overview of Methods

| Method | Approach | Use Case | Preserves Layout? |
| :--- | :--- | :--- | :--- |
| **Method 1** | `errorElement` + `useRouteError` | Loader errors, Action errors, Component render errors | **No** (replaces full route element tree where defined) |
| **Method 2** | Wildcard Route (`path: '*'`) | Unmatched URLs (404 Not Found) | **Yes** (renders inside child `<Outlet />`) |

---

## Method 1: Using `errorElement` and `useRouteError`

`errorElement` is React Router's built-in error boundary. It catches runtime errors occurring during route lifecycle events.

### What It Catches
- Errors thrown inside `loader` functions.
- Errors thrown inside `action` functions.
- Unhandled JavaScript exceptions thrown during component rendering.

### What It Does NOT Catch
- Unhandled asynchronous API fetch errors occurring inside a `useEffect` hook (unless explicitly caught and thrown into React Router state).

### Code Example

**1. Define `errorElement` in the router config:**

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import AppLayout from './AppLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // Catches route rendering, loader, and action errors
    errorElement: <ErrorPage />, 
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

**2. Create the `ErrorPage` component:**

```jsx
import React from 'react';
import { NavLink, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  // Access error details provided by React Router
  const error = useRouteError();
  console.error(error);

  if (error?.status === 404) {
    return (
      <section>
        <h1>404 Not Found</h1>
        <p>{error.statusText || error?.error?.message}</p>
        <NavLink to="/">Go back to home</NavLink>
      </section>
    );
  }

  return (
    <div>
      <h1>Error {error?.status || '500'}</h1>
      <p>{error?.statusText || error?.error?.message || 'An unexpected error occurred.'}</p>
      <NavLink to="/">Go back to home</NavLink>
    </div>
  );
};

export default ErrorPage;
```

---

## Method 2: Wildcard Route (`path: '*'`)

A wildcard route (`*`) acts as a fallback route that matches any URL path not defined in your router configuration.

### What It Catches
- Client-side navigation to undefined URL paths (e.g., `/random-page-does-not-exist`).

### Key Advantage
- **Preserves Layout:** Because it is nested as a child route inside `<AppLayout />`, common UI elements (like Navigation Bars, Footers, Sidebars) remain visible on the screen.

### Code Example

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import NotFound from './NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/movie', element: <Movie /> },
      { path: '/contact', element: <Contact /> },
      
      // Catch-all route for non-existent paths
      {
        path: '*',
        element: <NotFound />
      },
    ]
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

---

## Summary Recommendation

For robust error handling in a production React application, **combine both approaches**:

1. **Use Wildcard Routes (`path: '*'`)** inside your layout wrapper so users who type an invalid URL see a friendly 404 screen while keeping navigation available.
2. **Use `errorElement`** at root or page levels to gracefully catch application bugs, failed loader data fetches, or form submission errors without crashing the whole React tree.


---

# `useNavigate` Hook

The `useNavigate` hook is a core hook provided by **React Router (v6+)** that enables programmatic navigation within your application. It returns a function that allows you to trigger route transitions imperatively, such as inside event handlers, form submissions, or side effects.

---

## 🚀 Quick Start

```jsx
import { useNavigate } from 'react-router-dom';

function NavigationButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Programmatically navigate to the /dashboard route
    navigate('/dashboard');
  };

  return <button onClick={handleClick}>Go to Dashboard</button>;
}
```

---

## 🛠 Basic Usage & Patterns

### 1. Absolute & Relative Navigation
You can pass a string representing the target URL path:

```jsx
// Absolute path navigation
navigate('/profile');

// Relative path navigation (relative to current route context)
navigate('settings');

// Relative navigation up one level
navigate('..');
```

---

### 2. History Stack Traversal (Back / Forward)
Pass an integer to move backward or forward through the browser's history stack:

```jsx
// Go back 1 page (equivalent to browser Back button)
navigate(-1);

// Go forward 1 page
navigate(1);

// Go back 2 pages
navigate(-2);
```

---

### 3. Replacing Current Entry (`replace: true`)
By default, `navigate` pushes a new entry onto the history stack. Set `replace: true` to replace the current entry instead (commonly used after logins or redirects so users cannot click "Back" to return to an unauthenticated page).

```jsx
navigate('/dashboard', { replace: true });
```

---

### 4. Passing State with Navigation
Pass ephemeral state along with a navigation action. This state can be retrieved in the destination component using the `useLocation` hook.

```jsx
// Sender Component
navigate('/checkout', {
  state: {
    productId: 'abc-123',
    discountCode: 'SUMMER20'
  }
});
```

```jsx
// Receiver Component (/checkout)
import { useLocation } from 'react-router-dom';

function CheckoutPage() {
  const location = useLocation();
  const { productId, discountCode } = location.state || {};

  return (
    <div>
      <p>Product ID: {productId}</p>
      <p>Discount Code: {discountCode}</p>
    </div>
  );
}
```

---

## 📋 API Reference

```typescript
const navigate = useNavigate();

// Signature
navigate(to: string, options?: NavigateOptions): void;
navigate(delta: number): void;
```

### Options Object Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `replace` | `boolean` | `false` | When `true`, replaces the current history entry instead of adding a new one. |
| `state` | `any` | `undefined` | Arbitrary data passed along with the route change. Access via `useLocation().state`. |
| `preventScrollReset` | `boolean` | `false` | Prevents the scroll position from resetting to top (when using `<ScrollRestoration />`). |
| `relative` | `'route' \| 'path'` | `'route'` | Defines relative path resolution semantics. |

---

## 💡 Best Practices & Notes

* **Accessibility First:** For standard UI navigation (like header links or footers), prefer `<Link>` or `<NavLink>` over `useNavigate` so accessible standard `<a>` elements are rendered.
* **Router Context Required:** `useNavigate` can only be called inside components wrapped within a router provider (e.g., `<BrowserRouter>`, `<RouterProvider>`).


# React.memo Guide

This document covers the extracted text regarding `React.memo` and provides practical explanations and examples for implementation.

**Memoization** in React is a performance optimization technique that caches (stores) the results of expensive function calls, component renders, or values so that React doesn't have to redo the same work on subsequent renders. By remembering the previous output for a given set of inputs (props, state, or dependencies), React skips unnecessary recalculations and re-renders

## Key Concepts

* **The `React.memo` function is used for memoization of functional components.**
* **If the props of a memoized component have not changed, React skips the rendering for that component, using the cached result instead.**
* **Do memoizations only when necessary.**

**OR**

> `React.memo()` is a higher-order component that we can use to wrap components that we do not want to re-render unless props within them change.

## When to Use `React.memo`

1. **Pure Functional Components:** When your component renders the exact same output given the exact same props.
2. **Frequent Re-renders:** When the component re-renders frequently due to parent state updates, even when its own props have not changed.
3. **Computationally Expensive Rendering:** When the component contains heavy UI rendering logic or complex calculations.

## Example Usage

### 1. Basic Component Wrapper

```javascript
import React from 'react';

const UserCard = ({ name, role }) => {
  console.log('Rendering UserCard...');
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
};

// Wrap component with React.memo to prevent unnecessary re-renders
export default React.memo(UserCard);
```

### 2. Custom Comparison Function

By default, `React.memo` performs a shallow comparison of props. If you are passing complex objects or arrays as props, you can supply a custom comparison function as the second argument:

```javascript
import React from 'react';

const Profile = ({ user }) => {
  return <div>{user.name}</div>;
};

// Custom comparison function: returns true if props are EQUAL (skip render)
const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id && prevProps.user.name === nextProps.user.name;
};

export default React.memo(Profile, arePropsEqual);
```

## Important Caveats

* **Functions as Props:** Passing callback functions directly to a memoized component will break memoization unless wrapped with `useCallback`.
* **Objects/Arrays as Props:** Creating objects or arrays on the fly in the parent component will cause shallow comparison to fail unless wrapped with `useMemo`.
* **Overuse Overhead:** Memoization carries memory overhead to store props and CPU overhead for prop comparisons. Do not memoize components indiscriminately.

# React Memoization Guide

## 1. `useMemo` Hook

```javascript
const memoizedValue = useMemo(() => { // Your computation logic here
  return computedValue;
}, [dependencies]);
```

* **`useMemo` is a React Hook used for memoization.**
* **Memoization is a technique to optimize performance by caching the results of expensive function calls.**
* **Use it when you want to prevent unnecessary re-execution of a function on every render.**
* **Useful for optimizing performance in situations where calculations or operations are computationally expensive.**
* **Overusing `useMemo` might lead to unnecessary complexity and impact readability.**

---

### How `useMemo` Works

`useMemo` caches the **result of a calculation** between renders. On initial render, React runs your function and caches the result. On subsequent renders, React checks if any values in the dependency array have changed:
* **Dependencies unchanged:** Returns the cached result without re-executing the calculation.
* **Dependencies changed:** Re-runs the calculation, updates the cache, and returns the new value.

---

### Practical Example

```jsx
import React, { useState, useMemo } from 'react';

function ExpensiveCalculationComponent({ items }) {
  const [count, setCount] = useState(0);

  // Expensive computation memoized so it only re-computes when `items` changes
  const expensiveResult = useMemo(() => {
    console.log('Calculating heavy data...');
    return items.reduce((total, item) => total + item.price, 0);
  }, [items]);

  return (
    <div>
      <h2>Total Cost: {expensiveResult}</h2>
      <button onClick={() => setCount(count + 1)}>
        Re-render Parent (Count: {count})
      </button>
    </div>
  );
}

export default ExpensiveCalculationComponent;
```

---

## 2. `React.memo` (Higher-Order Component)

### Key Concepts

* **The `React.memo` function is used for memoization of functional components.**
* **If the props of a memoized component have not changed, React skips the rendering for that component, using the cached result instead.**
* **Do memoizations only when necessary.**

> `React.memo()` is a higher-order component that we can use to wrap components that we do not want to re-render unless props within them change.

---

### Practical Example

```jsx
import React from 'react';

const UserCard = ({ name, role }) => {
  console.log('Rendering UserCard...');
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
};

// Wrap with React.memo to prevent unnecessary re-renders when parent state updates
export default React.memo(UserCard);
```

---

## Summary: `useMemo` vs `React.memo`

| Feature | `useMemo` | `React.memo` |
| :--- | :--- | :--- |
| **Type** | React Hook | Higher-Order Component (HOC) |
| **Target** | Caches a **computed value/function result** | Caches a **rendered component** |
| **Trigger** | Re-executes when values in the dependency array change | Re-renders when component `props` change |
| **Use Case** | Heavy calculations, reference equality for objects/arrays | Preventing component re-renders from parent state changes |

# `useCallback` Hook Guide

A comprehensive overview of React's `useCallback` hook: syntax, core concepts, practical usage, and best practices.

## 1. Quick Summary Table: `React.memo` vs `useMemo` vs `useCallback`

| Feature | `React.memo` | `useMemo` | `useCallback` |
| :--- | :--- | :--- | :--- |
| **Type** | Higher-Order Component (HOC) | React Hook | React Hook |
| **What it Memoizes** | Entire **Component render output** | The **result of a calculation** | A **function instance / definition** |
| **Primary Goal** | Skip re-rendering a component if its `props` haven't changed | Skip expensive re-computations unless dependencies change | Maintain function reference stability across re-renders |
| **Return Value** | A new memoized React component | The cached calculated value | The cached function itself |
| **Syntax** | `React.memo(Component)` | `useMemo(() => compute(), [deps])` | `useCallback(fn, [deps])` |
| **Typical Use Case** | Wrapping heavy child components | Filtering huge lists, expensive math operations, caching object references | Passing callbacks to `React.memo` components or `useEffect` dependencies |

---

## 2. Core Concept & Syntax (`useCallback`)

`useCallback` is a React Hook that caches (memoizes) a **function definition** between re-renders.

### Syntax

```javascript
const cachedFn = useCallback(fn, dependencies);
```

* **`fn`**: The function value you want to cache.
* **`dependencies`**: An array of reactive values (`props`, `state`, or variables inside the component) referenced inside `fn`. React re-creates `fn` only when a dependency changes.

---

## 3. Why Do We Need `useCallback`?

In JavaScript, functions are objects. Every time a React component re-renders, **all functions defined inside it are re-created from scratch**:

```javascript
// On EVERY render, handleClick gets a NEW memory address
const handleClick = () => {
  console.log("Clicked!");
};
```

This dynamic re-creation is usually cheap and fine. However, problems arise in two main situations:

1. **Passing functions to memoized child components (`React.memo`)**: A new function reference breaks `React.memo` prop equality checks, causing unnecessary child re-renders.
2. **Functions used inside `useEffect` dependencies**: A new function reference causes the effect to re-run on every single render.

---

## 4. Practical Example: Preventing Child Re-renders

### Without `useCallback` (Broken Memoization)

```javascript
import React, { useState } from 'react';

// Child component wrapped in React.memo
const Button = React.memo(({ onClick, children }) => {
  console.log(`Rendering button: ${children}`);
  return <button onClick={onClick}>{children}</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Re-created on EVERY render, even when only `text` changes!
  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      {/* Button WILL re-render every time you type in the input! */}
      <Button onClick={increment}>Increment Count</Button>
    </div>
  );
}
```

### With `useCallback` (Fixed)

```javascript
import React, { useState, useCallback } from 'react';

const Button = React.memo(({ onClick, children }) => {
  console.log(`Rendering button: ${children}`);
  return <button onClick={onClick}>{children}</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Caches function reference across renders
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // Empty dependency array because state updater function is stable

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      {/* Button will NOT re-render when typing in the input */}
      <Button onClick={increment}>Increment Count</Button>
    </div>
  );
}
```

---

## 5. Practical Example: Stabilizing `useEffect` Dependencies

If a custom function is called inside `useEffect`, wrapping it in `useCallback` prevents infinite re-render loops or unnecessary network requests.

```javascript
import React, { useState, useEffect, useCallback } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Memoize fetch function so it only changes when userId changes
  const fetchUserData = useCallback(async () => {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data = await response.json();
    setUser(data);
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]); // Safe to include fetchUserData in dependency array

  return <div>{user ? `Name: ${user.name}` : 'Loading...'}</div>;
}
```

---

## 6. Best Practices & Caveats

1. **Don't Overuse It**: Creating functions with `useCallback` adds slight overhead (array allocations, dependency checks). Do not use it for simple inline click handlers on native HTML elements like `<button onClick={...}>`.
2. **Use State Updater Functions**: If your callback relies on current state only to update it, pass a function to `setState` (`setCount(prev => prev + 1)`) to keep dependency arrays empty `[]`.
3. **Always Pair with `React.memo`**: `useCallback` alone will **not** prevent a child component from re-rendering if that child component is not wrapped in `React.memo`.
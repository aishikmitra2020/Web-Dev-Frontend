# React useEffect Hook

## Introduction
- It helps to fetch data from APIs (its also a sidee effect)<br>
- The useEffect hook in React is used for handling <b>side effects</b> in functional components.

#### Side Effects
A side effect is any operation that <b>affets something outside the scope of a function (Pure Function)</b>. In React, side effects are managed using hooks like useEffect to unsure they are handled in a controlled and predicatble manner.

Fetching Data is also a side effect because we are interacting with an expternal data source such as a API or Server and then fetched data usually changes the component's state casuing a re-render.

## React Rendering & useEffect (Short Note)

React components re-render whenever their state, props, or context changes. If it is a normal function, then every time the component re-renders, the fcuntion will run but useEffect prevents it. When it runs totally depends on its dependency array.
- <b>[]</b> - Runs only when the component mounts for the first time
- <b>[s1, s2]</b> - when the given state variable changes, useEffect runs again

### Flow
```
Component Mounts
       │
       ▼
Component Renders
       │
       ▼
React Updates DOM
       │
       ▼
Browser Paints UI
       │
       ▼
useEffect Runs
       │
       ▼
User Action (e.g., Button Click)
       │
       ▼
State Changes? (setState)
       │
   ┌───┴────┐
   │        │
  No       Yes
   │        │
   ▼        ▼
 Stop   Component Re-renders
              │
              ▼
         DOM Updated
              │
              ▼
     useEffect Runs Again
   (Depends on Dependency Array)
```

## Syntax
```js
useEffect(() => {
    // your side effect code goes here

    return ()=> {
        // cleanup function code (optional)
    }
}, [dependencies])
```

1. <b>Initial Render</b> - When component mounts, useEffect run its effect function to perform operations like data fetching

2. <b>Dependencies</b> - It determines the when the hook wil run. If any value in the array changes, the effect will run

3. <b>Cleanup</b> - useEffect can return a cleanup function to clear up after the effect such as unsubscribing from an event or clearing a filter

## Usage
1. Fetching Data from APIs
2. Subscribing to or unsubscribing from a service
3. Updating the browser's DOM
4. Logging Data to the console

# Cleanup Function
When does it runs:
- Before the effect runs again (If your effect has dependencies)
```js
useEffect(() => {
    console.log("Effect");

    return () => {
        console.log("Cleanup");
    };
}, [count]);
```
```
Effect (count = 0)

count changes

Cleanup (for count = 0)
Effect (count = 1)

count changes

Cleanup (for count = 1)
Effect (count = 2)
```

- When the component unmounts

### What if we dont'use cleanup functions?
```js
const [count, setCount] = useState(0);
useEffect(()=> {
       const interval = setInterval(()=>{
              setCount((prev) => prev + 1);
       }, 1000)
}, [])
```
Here, we aren't using cleanuop function. The problems we will be facing are-
```
Component Mounted
        ↓
Interval Starts
        ↓
Component Unmounted
        ↓
Interval is STILL running ❌
```
This can cause:
- Memory leaks
- Unnecessary CPU usage
- Attempts to update a component that no longer exists
- Bugs if the component is mounted and unmounted repeatedly

### Visual comparison
✅ With cleanup
```
Mount
   │
   ▼
Start Interval
   │
   ▼
1 → 2 → 3 → 4
   │
User hides component
   │
   ▼
clearInterval()
   │
   ▼
Timer stops ✅
```
---
❌ Without cleanup
```
Mount
   │
   ▼
Start Interval
   │
   ▼
1 → 2 → 3 → 4
   │
User hides component
   │
   ▼
Component removed
   │
   ▼
Interval STILL RUNNING ❌
   │
   ▼
setCount()
setCount()
setCount()
...
```
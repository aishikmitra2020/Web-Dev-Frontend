# React useState Hook

## Introduction

`useState` is a built-in React Hook that allows functional components to store and manage state.

State represents data that can change over time. Whenever state changes, React automatically re-renders the component to display the updated data.

Examples of data managed using state:

- Counter values
- Form inputs
- User information
- Loading states
- API response data
- Toggle states (open/close, show/hide)

---

# Basic Syntax

```jsx
const [state, setState] = useState(initialValue);
```

## Why we use it?
If we change normal variables, then every time the component re-renders, its value is reset to the initial value because normal variables are recreated during every render. Therefore, changes made to normal variables are not preserved between renders.

But when we use the useState hook, React stores the state value separately from the component function. When the state is updated using the setter function, React remembers the new value and triggers a re-render with the updated state value.

### Without useState
```js
function Counter() {
    let count = 0;
}
```
### Flow
```
Render 1:
count = 0

Change:
count = 1

Render 2:
count = 0  ❌
```

### With using useState
```js
function Counter() {
    const [count, setCount] = useState(0);

    function increase(){
        setCount(count + 1);
    }

    return (
        <>
            <h1>{count}</h1>
            <button onClick={increase}>
                Increase
            </button>
        </>
    );
}
```

### Flow
```
Initial Render

React stores:
count = 0


Button click

setCount(1)


React updates its stored state

count = 1


React re-renders component


UI displays:
1

__ __ ___ ____

React Memory
      |
      ↓
count = 0
      |
      ↓
setCount(1)
      |
      ↓
React updates stored value
      |
      ↓
Re-render
      |
      ↓
count = 1
```

## Using Previous State (`prev`)
<u><b>React Behaviour</b></u>- React batching means that React groups multiple state updates together and performs only one re-render instead of re-rendering after every single update.

Thus, if we do,
```js
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);

# Here the value will not be updated, it will be just updated to '1' at last
```

Correct Approach
```js
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```
Now React processes each update with the latest value.
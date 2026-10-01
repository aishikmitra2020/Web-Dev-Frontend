# Redux Full Tutorial
# Introduction to Redux

A comprehensive guide explaining what Redux is, why it is used, its core concepts, best practices, and a complete code example.

---

## What is Redux?

Redux is a tool that helps **manage data** (also known as *"state"*) in large React applications. It allows developers to keep all application data in a single place, known as the **Redux store**, making it easy to share and update data across different parts of the application.

---

## Why Use Redux?

In small applications, state can be managed directly using React's built-in state. However, as an application grows, passing data between deeply nested components becomes complex and difficult to maintain.

Redux solves this issue by providing a **centralized store** that holds all the application data, accessible and updatable by any component in the app.

## Installation
```bash
npm i redux
```

---

## Core Building Blocks

Redux relies on three main concepts:

1. **Store:** The centralized place where Redux keeps all your application data (acts like an in-memory database).
2. **Action:** Plain JavaScript objects that describe *what* change you want to make to the state (e.g., adding a task).
3. **Reducers:** Pure functions that specify *how* the state changes in response to actions.

---

## Deep Dive into Redux Concepts

### 1. Actions

An action is an object that tells Redux what operation to perform. It must have a `type` property and optionally a `payload` carrying data.

```javascript
// Action: Incrementing Counter
{
  type: "counter/add",
  payload: { incrementBy: 10 }
}

// Action: Decrementing Counter
{
  type: "counter/decrement",
  payload: { decrementBy: 10 }
}
```

***Action Creator***: A dunction that creates an action object. This makes creating actions easier with diff data.
```js
function actionCreator(data) {
    return { type: "ACTION_TYPE", payload: data}
}
```

### 2. Reducer Functions

A reducer is a function that decides how the state should change based on the action. It takes two arguments: **`state`** (current state) and **`action`** (dispatched action), and returns a **new state**.

```javascript
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
```

#### Key Rules & Best Practices for Reducers:
* **Immutable State:** Never modify the old state directly. Always return a new state object (e.g., using `...state` spread operator).
* **Return Value:** Reducers must always return a new state object.
* **Action Types Naming:** Use a combination of the *state domain* and *event* separated by a slash (e.g., `task/add`, `task/delete`).

---

### 3. Redux Store & Methods

The store holds all application data in memory.

* **`createStore(reducer)`:** Creates the store using a reducer function.
* **`store.dispatch(action)`:** Sends an action to the store to trigger a state update.
* **`store.getState()`:** Retrieves the current state of the Redux store.

```javascript
import { createStore } from "redux";

const store = createStore(reducer);

// Dispatching an action
store.dispatch({ type: "task/add", payload: "Learn Redux" });

// Accessing state
console.log(store.getState());
```

---

## Complete Working Example (Task Manager)

Below is a complete implementation demonstrating action types, initial state, immutable reducer logic, store creation, dispatching actions, and reading state using `getState()`.

```javascript
import { createStore } from "redux";

// 1. Action Types
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";

// 2. Initial State
const initialState = {
  task: []
};

// 3. Reducer Function
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload]
      };
    case DELETE_TASK:
      // Correctly return a new array with the targeted item filtered out
      const updatedTask = state.task.filter((_, index) => index !== action.payload);
      return {
        ...state,
        task: updatedTask
      };
    default:
      return state;
  }
};

// 4. Create Redux Store
const store = createStore(taskReducer);

// 5. Action Creators
const addTask = (taskName) => ({
  type: ADD_TASK,
  payload: taskName
});

const deleteTask = (index) => ({
  type: DELETE_TASK,
  payload: index
});

// --- Execution ---
console.log("Initial State:", store.getState()); 
// Output: { task: [] }

store.dispatch(addTask("Learn Redux"));
store.dispatch(addTask("Build a Project"));
console.log("After Adding Tasks:", store.getState()); 
// Output: { task: ["Learn Redux", "Build a Project"] }

store.dispatch(deleteTask(0));
console.log("After Deleting Task at Index 0:", store.getState()); 
// Output: { task: ["Build a Project"] }
```

**Actions are optional. We can also directly dispatch like in the code given below**
```jsx
import { createStore } from "redux";

// Step : Create a Reducer function
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";

const initialState = {
    task: [],
    isLoading: false,
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                task: [...state.task, action.payload]
            }
        case DELETE_TASK:
            const updatedTask = state.task.filter((currTask, index) => {
                return index != action.payload
            })

            return {
                ...state,
                task: updatedTask
            }
        default:
            return state;
    }

}

// Step 2: Create the redux store using the reducer
const store = createStore(taskReducer);
console.log(store)

// Step 4: Log the initial state
// The getState is a asyncronous function that returns the current state of a Redux application. It includes the entire state of the application, including all the reducers and their respective states
console.log(store.getState())

// Step 4: Dispatch an action to add a task
store.dispatch({ type: ADD_TASK, payload: "Lear Redux with me" })
console.log("updated state: ", store.getState());

store.dispatch({ type: ADD_TASK, payload: "2nd call" })
console.log("updated state: ", store.getState());

store.dispatch({ type: ADD_TASK, payload: "3rd call" })
console.log("updated state: ", store.getState());

// DEL_TASK
store.dispatch({ type: DELETE_TASK, payload: 1 })
console.log("updated state: ", store.getState());
```

> **NOTE:** `createStore` method is now deprecated as now we use Redux Toolkit. But we must learn both (vanilla Redux and Redux Toolkit) for the sake of understanding

---

## Key Advantages of Redux

* **Centralized State Management:** Keeps state organized in one central location.
* **Global Access:** Eliminates prop drilling across components.
* **Predictable Updates:** State transformations are predictable via pure reducer functions.
* **DevTools:** Offers time-travel debugging and state inspection tools.
* **Async Support:** Integrates with middleware like **Redux Thunk** or **Redux Saga** for handling asynchronous API calls.


## Connectin Redux with React using `react-redux`

### Step 1: Install `react-redux`
```bash
npm i react-redux
```

### Step 2: Export the `store`
```js
// store.jsx
import { createStore } from "redux";

export const store = createStore(reducerFunc);
```

### Step 3: Integration at `main.jsx`
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux'
import { store } from './store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> // wrap the app using this Provider
      <App />
    </Provider>
  </StrictMode>,
)

```

## Access Redux State in React using useSelector
Use the useSelector hook to read data from the Redux store.
```jsx
import { useSelector } from 'react-redux';

// Get state from Redux store
// useSelector -> hook
// (state) => state.task -> selector function (here it is an arrow function)
const count = useSelector(state => state.property);
```
**Selector function:** We define a selector function that takes the entire Redux store state as an argument and returns the specific piece of data we need.
> **NOTE:** It is not recommended to return the entire state as they will cause a rerender whenever *anything* in state changes. It will also trigger a warning in the browser console


## Dispatch Actions in React using `useDispatch`
```js
// store.jsx

// code ...

// Action Creators
export const addTask = (data) => {
    return { type: ADD_TASK, payload: data }
}

export const deleteTask = (taskIndex) => ({
  type: DELETE_TASK,
  payload: taskIndex
});
```

```js
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from '../store';

export default function Todo() {

  // Get state from Redux store
  const tasks = useSelector((state) => state.task);

  // Get the dispatch function
  const dispatch = useDispatch();

  // handleFormSubmit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(addTask(task));
    return setTask("");
  }

  // handleTaskDelete
  const handleTaskDelete = (index) => {
    return dispatch(deleteTask(index))
  }

  return (
    <>
    // code...
    </>
  );
}
```

## Installing Redux Dev Tools
### Step 1: Installing in browser
**Redux DevTools**: https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en&pli=1

### Step 2: Installing the npm package
```js
npm i @redux-devtools/extension
```
https://www.npmjs.com/package/@redux-devtools/extension

### Step 3: Setting up the Middleware
```js
// store.js

import { createStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';

export const store = createStore(taskReducer, composeWithDevTools());
```
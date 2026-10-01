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

---

# Redux Middleware: Redux Thunk

## Overview
**Redux Thunk** is a middleware that enables action creators to return a **function** (often asynchronous) instead of a plain action object. 

By default, Redux only supports synchronous data flow via standard action objects (`{ type, payload }`). Redux Thunk intercepts functions passed to `dispatch`, provides them with the store's `dispatch` and `getState` methods, and allows you to execute asynchronous operations—such as fetching data from an API—before dispatching standard actions to update the state.

---

## 1. Installation

Install `redux-thunk` along with the Redux DevTools extension for debugging:

```bash
npm install redux-thunk @redux-devtools/extension redux
```

---

## 2. Store Configuration

To enable Thunk, apply it using Redux's `applyMiddleware` function. You can wrap it with `composeWithDevTools` to connect Redux DevTools.

```javascript
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { taskReducer } from "./taskReducer";

// Create store with Thunk middleware and Redux DevTools enabled
export const store = createStore(
  taskReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
```

---

## 3. Reducer & State Setup

```javascript
// Action Types
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASKS = "task/fetch";

// Initial State
const initialState = {
  task: [],
  isLoading: false,
};

// Task Reducer
export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload]
      };

    case DELETE_TASK:
      return {
        ...state,
        task: state.task.filter((_, index) => index !== action.payload)
      };

    case FETCH_TASKS:
      return {
        ...state,
        task: [...state.task, ...action.payload]
      };

    default:
      return state;
  }
};
```

---

## 4. Action Creators

### Standard Action Creators (Synchronous)
These return plain JS objects directly to the reducer.

```javascript
export const addTask = (data) => ({
  type: ADD_TASK,
  payload: data
});

export const deleteTask = (taskIndex) => ({
  type: DELETE_TASK,
  payload: taskIndex
});
```

### Thunk Action Creator (Asynchronous)
This returns an `async` function. Redux Thunk intercepts this function and passes `dispatch` as its argument.

```javascript
export const fetchTask = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
      const data = await res.json();

      // Extract task titles and dispatch to reducer
      const taskTitles = data.map((currTask) => currTask.title);
      dispatch({ type: FETCH_TASKS, payload: taskTitles });
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };
};
```

---

## 5. Usage Example

```javascript
import { store } from "./store";
import { addTask, deleteTask, fetchTask } from "./actions";

// 1. Dispatching synchronous actions
store.dispatch(addTask("Learn Redux Thunk"));
store.dispatch(addTask("Build a project"));

// 2. Dispatching asynchronous thunk action
store.dispatch(fetchTask());

// 3. Dispatching a delete action
store.dispatch(deleteTask(0)); // Removes task at index 0
```

## 5. Usage Example (Component)

```jsx
import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, fetchTask } from '../store';

export default function Todo() {

    const [task, setTask] = useState("");

    const tasks = useSelector((state) => state.task);
    console.log('tasks:', tasks);

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

    // handleFetchTasks
    const handleFetchTasks = () => {
        dispatch(fetchTask());
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">
                    To-Do List
                </h1>

                <form onSubmit={handleFormSubmit} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="flex-1 px-4 py-2 text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
                    >
                        Add Task
                    </button>
                </form>

                <button
                        onClick={handleFetchTasks}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
                    >
                        Fetch Task
                    </button>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {tasks.length === 0 ? (
                        <p className="text-center text-slate-400 py-4">No tasks yet!</p>
                    ) : (
                        tasks.map((task, indx) => (
                            <div key={indx} className="rounded-lg border border-slate-200 bg-slate-50 p-3 flex items-stretch">
                                <p
                                    className={`flex-1 text-slate-700 select-none transition-all ${task.completed ? 'line-through text-slate-400' : ''
                                        }`}
                                >
                                    {task}
                                </p>
                                <button className="ml-2 text-red-500 hover:text-red-700 text-xl">
                                    <MdDeleteForever onClick={() => handleTaskDelete(indx)} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
```

---

## Logic Flow & Code Explanation

### Architectural Flow

```
+-----------------------------------------------------------------------+
|                               DISPATCH                                |
+-----------------------------------------------------------------------+
                                   |
                                   v
                      +-------------------------+
                      |   Redux Thunk Check     |
                      +-------------------------+
                                 /   \
                  Is Function?  /     \  Is Plain Object?
                               /       \
                              v         v
             +--------------------+   +--------------------+
             | Execute Function   |   | Send directly to   |
             | (Perform API Call) |   | Reducer            |
             +--------------------+   +--------------------+
                       |                        |
                       v                        v
             +--------------------+   +--------------------+
             | Dispatch standard  |   | State updated in   |
             | action with result |   | Reducer            |
             +--------------------+   +--------------------+
```

### Step-by-Step Logic Breakdown

1. **Dispatch Invocation:**
   When `store.dispatch(fetchTask())` is called, `fetchTask()` evaluates to an inner `async (dispatch) => { ... }` function rather than an action object `{ type, payload }`.

2. **Middleware Interception:**
   `redux-thunk` inspects every dispatched value:
   * **Plain Object:** Passes it directly along to `taskReducer`.
   * **Function:** Stops it from reaching the reducer immediately and executes it, passing `store.dispatch` (and `store.getState`) into it as arguments.

3. **Asynchronous Execution:**
   Inside the thunk function, network requests run asynchronously using `fetch(...)`. Execution pauses at `await` without blocking the main UI thread.

4. **Completion & Real Dispatch:**
   Once the API responds with JSON data:
   * The titles are extracted into an array.
   * `dispatch({ type: FETCH_TASKS, payload: taskTitles })` is called with a **plain action object**.

5. **State Update:**
   This second dispatch carries a standard object, so Redux Thunk allows it through to `taskReducer`. The reducer runs the `FETCH_TASKS` case and appends the remote tasks to `state.task`.



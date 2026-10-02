# Redux Toolkit Overview

## What is Redux Toolkit?

**Redux Toolkit (RTK)** is an official toolset from the Redux team that makes working with Redux easier and less time-consuming.

Instead of doing everything manually—like creating actions, reducers, and managing state immutability—RTK gives you built-in functions that handle most of that work for you.

In simpler terms, it's a shortcut that helps you manage your app's state with less code and fewer mistakes. The goal is to make Redux more beginner-friendly and reduce the amount of code you need to write.

## Why Redux Toolkit?

* **Less Boilerplate:** In traditional Redux, you write a lot of repetitive code just to get basic things done. RTK cuts down on all that extra code and gives you a cleaner, simpler way to manage state.

* **Simpler Setup:** It automatically sets up your store, adds middleware for things like async actions, and connects you to Redux DevTools for debugging without extra configuration.

* **Built-in Async Handling:** If you've ever used Redux Thunk for async tasks like fetching data from an API, RTK has a built-in feature called `createAsyncThunk` that makes handling async actions even easier.

## Advantages

1. **Less Boilerplate Code:** Normally with Redux, you need to write action types, action creators, and reducers separately. With RTK's `createSlice`, you handle all of this in one place with far fewer lines of code.

2. **Easier to Work with State:** RTK uses **Immer** under the hood, which allows you to write state changes as if you are mutating the state directly, while still preserving immutability safely.

3. **Better Async Logic:** Handling async tasks is much simpler using `createAsyncThunk`, which automatically handles loading, success, and error states.

4. **Great Defaults:** RTK sets up Redux DevTools, middleware, and other configurations out of the box so you can focus on building your app.

## Installation
```bash
npm i @reduxjs/toolkit
```

## Complete Code Implementation

Below is a complete implementation showing both traditional Redux reducer concepts and modern Redux Toolkit (`createSlice`, `configureStore`, custom Thunk action creator, and action dispatching):

```js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// 1. Action Types -> "domain/event" format
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASKS = "task/fetch";

// 2. Initial State
const initialState = {
    task: [],
    isLoading: false,
};

// 3. Traditional Redux Reducer
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                task: [...state.task, action.payload]
            };
        case DELETE_TASK:
            const updatedTask = state.task.filter((currTask, index) => {
                return index !== action.payload;
            });

            return {
                ...state,
                task: updatedTask
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

// 4. Redux Toolkit Slice
const taskSlice = createSlice({
    name: "task",
    initialState,

    // Case reducers / micro reducers
    reducers: {
        addTask(state, action) {
            // Under the hood, Immer allows direct mutation syntax safely
            state.task.push(action.payload);
            
            // Alternative options:
            // state.task = [...state.task, action.payload]
        },
        deleteTask(state, action) {
            // Option 1: state.task.splice(action.payload, 1);
            // Option 2:
            state.task = state.task.filter((currTask, index) => index !== action.payload);
        },
    }
});

// Export auto-generated Action Creators
export const { addTask, deleteTask } = taskSlice.actions;

// 5. Configure Redux Store
export const store = configureStore({
    reducer: {
        taskReducer: taskSlice.reducer,
    },
});

// 6. Thunk Middleware Function (Async Action Creator)
export const fetchTask = () => {
    return async (dispatch) => {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
            const task = await res.json();

            dispatch({ type: FETCH_TASKS, payload: task.map((currTask) => currTask.title) });
        } catch(err) {
            console.log(err);
        }
    };
};

// 7. Dispatching Actions
store.dispatch(addTask("Learn Redux with me"));
store.dispatch({ type: ADD_TASK, payload: "2nd call" }); // Dispatching raw action object
store.dispatch(addTask("3rd call")); // Using auto-generated action creator
store.dispatch(addTask("4th call"));
store.dispatch(addTask("5th call"));
store.dispatch(addTask("6th call"));
store.dispatch(deleteTask(1)); // Delete task at index 1

// Log current Redux store state
console.log(store.getState());
```

---

## Using Traditional Reducers with `configureStore`

> **Note:** You do **not** need to use `createSlice` to use `configureStore`. `configureStore` works seamlessly with traditional switch-case Redux reducers as well!

### Example:

```js
// Traditional switch-case Reducer function
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                task: [...state.task, action.payload]
            };
        case DELETE_TASK:
            const updatedTask = state.task.filter((currTask, index) => {
                return index !== action.payload;
            });

            return {
                ...state,
                task: updatedTask
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

// Passing traditional reducer directly to configureStore
export const store = configureStore({
    reducer: {
        taskReducer: taskReducer, // Pass the reducer function directly!
    },
});
```

### Important Difference to Remember:
* **RTK Slices:** When using `createSlice`, the slice object contains the reducer under `.reducer` (`taskSlice.reducer`).
* **Traditional Reducers:** Traditional reducer functions are already plain functions, so pass them directly without `.reducer` (`taskReducer: taskReducer`).

Even with traditional reducers, `configureStore` still provides all of its benefits:
1. Automatically combining reducers via `combineReducers`.
2. Setting up **Redux Thunk** middleware by default.
3. Automatically turning on **Redux DevTools**.

---

## Detailed Breakdown of the Code

### 1. Action Types Definition

```js
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASKS = "task/fetch";
```

* Follows the **`domain/event`** naming convention recommended by Redux best practices.
* These strings uniquely identify state modifications across the application.

### 2. Initial State Object

```js
const initialState = {
    task: [],
    isLoading: false,
};
```

* Sets the default shape of this state slice.
* `task`: An array that holds task string values or items.
* `isLoading`: A boolean flag useful for tracking API request states.

### 3. Traditional Reducer vs RTK `createSlice`

#### Traditional Reducer:

```js
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                task: [...state.task, action.payload]
            };
        // ...
    }
};
```

* **Pure Immutable Logic:** Requires explicitly copying previous state using object and array spread syntax (`...state`, `[...state.task, ...]`).
* **Verbose:** Needs manual switch-case handling and default state fallbacks.

#### RTK `createSlice` Reducer:

```js
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask(state, action) {
            state.task.push(action.payload);
        },
        deleteTask(state, action) {
            state.task = state.task.filter((currTask, index) => index !== action.payload);
        },
    }
});
```

* **Immer Integration:** You can write mutating code like `state.task.push(...)`. Immer traps these mutations and produces a new, immutable state copy behind the scenes.
* **Alternative Approaches inside Slice:**
  * Direct Mutating syntax (Recommended): `state.task.push(action.payload)`
  * Reassignment: `state.task = [...state.task, action.payload]`
  * Explicit Return (Not recommended with Immer mutations): `return { ...state, task: [...] }`

### 4. `createSlice` API Reference

#### Parameters Accepted by `createSlice(options)`

| Parameter | Type | Required? | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Yes** | A string namespace used as a prefix for generated action type constants (e.g., `'task/addTask'`). |
| `initialState` | `any` | **Yes** | The starting state value or state object for this slice. |
| `reducers` | `object` | **Yes** | An object containing case reducer functions. The keys become the action creator function names. |
| `extraReducers` | `object` / `function` | Optional | Allows slice to respond to external action types (e.g., actions produced by `createAsyncThunk`). |

#### What `createSlice` Returns

Calling `createSlice` returns a slice object with the following properties:

1. **`taskSlice.reducer`**: The combined slice reducer function used in `configureStore`.
2. **`taskSlice.actions`**: An object containing auto-generated action creators corresponding to the keys in `reducers`.
3. **`taskSlice.name`**: The slice name string (`"task"`).
4. **`taskSlice.caseReducers`**: The individual case reducer logic functions defined under `reducers`.

### 5. Understanding `taskSlice.actions`

```js
export const { addTask, deleteTask } = taskSlice.actions;
```

* Automatically generates action creator functions so you don't have to write them manually.
* Example: `addTask("Task 1")` creates and returns the action object:
  ```js
  { type: "task/addTask", payload: "Task 1" }
  ```

### 6. Store Configuration with `configureStore`

```js
export const store = configureStore({
    reducer: {
        taskReducer: taskSlice.reducer,
    },
});
```

* Automatically attaches middleware (such as Redux Thunk).
* Enables Redux DevTools extension integration automatically.
* Enforces development-time checks (e.g., detecting state mutations outside Immer).

### 7. Thunk Middleware (Async Action Creator)

```js
export const fetchTask = () => {
    return async (dispatch) => {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
            const task = await res.json();

            dispatch({ type: FETCH_TASKS, payload: task.map((currTask) => currTask.title) });
        } catch(err) {
            console.log(err);
        }
    };
};
```

* **Asynchronous Logic:** Redux Thunk middleware lets you return a function instead of a plain action object.
* The returned async function receives `dispatch` as its argument to dispatch actions once data fetching resolves.

### 8. Dispatching Actions and State Retrieval

```js
store.dispatch(addTask("Learn Redux with me"));
store.dispatch({ type: ADD_TASK, payload: "2nd call" }); // Dispatching raw action object
store.dispatch(deleteTask(1)); // Delete item at index 1

console.log(store.getState());
```

* Demonstrates dispatching via **auto-generated action creators** (`addTask(...)`), **manual action objects** (`{ type: ADD_TASK, payload: ... }`), and state inspection with `store.getState()`.

## Understanding `useSelector` and State Structure

When consuming state in a React component:

```js
const tasks = useSelector((state) => state.taskReducer.task);
console.log('tasks:', tasks);
```

### Why `state.taskReducer.task`?

```
[Redux Store Root State]
        │
        ├── taskReducer (Key in store reducer config)
        │         │
        │         └── task (Property defined in initialState)
```

1. **`state`**: Represents the entire Redux store root state object.
2. **`state.taskReducer`**: Points to the slice reducer registered under `taskReducer` key in `configureStore`.
3. **`state.taskReducer.task`**: Accesses the specific `task` array property defined inside `initialState`.

## Connect Redux Toolkit + React
### Steps are same as Redux + React
```bash
npm install react-redux
```

```jsx
// main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './storeRTK.jsx' // Fir Redux Toolkit (RTK)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
```
import in store `main.jsx` and wrap the `App` component with `<Provider store={store}></Provider>`

## `useDispatch` and `useSelector`
- It works same as it works in React + Redux

### Complete Example Code
```jsx
// storeRTK.jsx

import { configureStore, createSlice } from "@reduxjs/toolkit";

// Action Types -> "domain/event"
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASKS = "task/fetch"

const initialState = {
    task: [],
    isLoading: false,
}

// const taskReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_TASK:
//             return {
//                 ...state,
//                 task: [...state.task, action.payload]
//             }
//         case DELETE_TASK:
//             const updatedTask = state.task.filter((currTask, index) => {
//                 return index !== action.payload
//             })

//             return {
//                 ...state,
//                 task: updatedTask
//             }
//         case FETCH_TASKS:
//             return {
//                 ...state,
//                 task: [...state.task, ...action.payload]
//             }
//         default:
//             return state;
//     }

// }

// RTK Slice
const taskSlice = createSlice({
    name: "task",
    initialState,

    // root reducers or micro reducers -> object of functions(action creators)
    reducers: {
        // under thwe hood, we have immers library which allows us to write mutating code but it is not mutating the state, it is creating a new state
        addTask(state, action) {
            // we can also 
            state.task.push(action.payload);
            // OR
            // state.task = [...state.task, action.payload]
            // OR (NOT RECOMMENDED)
            // return {
            //     ...state,
            //     task: [...state.task, action.payload]
            // }
        },
        deleteTask(state, action) {
            // state.task.splice(action.payload, 1);
            // OR
            state.task = state.task.filter((currTask, index) => index !== action.payload);
        },
    }
})

export const { addTask, deleteTask } = taskSlice.actions;

export const store = configureStore({
    reducer: {
        taskSlice: taskSlice.reducer,
    },
})

// thunk middleware function (action creator)
export const fetchTask = () => {
    return async (dispatch) => {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3")
            const task = await res.json();

            dispatch({ type: FETCH_TASKS, payload: task.map((currTask) => currTask.title) })
        } catch(err) {
            console.log(err)
        }
    }
}

// Step 6: Dispatch an action to add a task
store.dispatch(addTask("Lear Redux with me"))
store.dispatch({ type: ADD_TASK, payload: "2nd call" }) // without using action creator
store.dispatch(addTask("3rd call")) // using action creator
store.dispatch(addTask("4th call"))
store.dispatch(addTask("5th call"))
store.dispatch(addTask("6th call"))
store.dispatch(deleteTask(1)) // DEL Task

// log the initial state
console.log(store.getState());
```

```jsx
// TodoRTK.jsx

import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, fetchTask } from '../storeRTK';

export default function TodoRTX() {

    const [task, setTask] = useState("");

    const tasks = useSelector((state) => state.taskSlice.task);
    console.log('tasks:', tasks);

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
                    {tasks?.length === 0 ? (
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
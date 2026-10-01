# useReducer Hook
```js
const [state, dispatch] = useReducer(reducer, initialState);
```

- It returns an array containing the current state and dispatch function.

<b><u>Dispatch function</u></b> is used to send actions to the reducer, which in turn updates the state based on the action's type and any associated data (payload).

<b><u>Reducer Function:</u></b> A function that takes the current state and an action as arguments, and returns a new state.

<b><u>Initial State:</u></b> The initial state value. (The initial state can be a simple value, an object, or even derived from a function if the initialization is complex.)
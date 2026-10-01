# What is state in react?
• In React, **state refers to an object that holds data or information about the component**. State is managed within the component (just like variables declared in a function). However, unlike regular variables, when state changes, React re-renders the component to reflect these changes, keeping the user interface in sync with the data.

• State is dynamic and mutable(changeable), meaning it can change over time usually in response to user actions, server responses, or other events.

```js
export const State = () => {
    let value = 0;

    const handleButtonClick = () => {
        value++;
        console.log(value);
    };

    return (
        <>
        <h1>{value}</h1>
        <button onClick={handleButtonClick}>Increment</button>
        </>
    );
};
```
Here, the value containing variable is getting updated but not reflected in UI. It is due to the fact that React does not re-render components when a variable changes.

Why this is happening?
-   It's because those are normal variables and React.js doesn't know that it's going to be changed.

-   And that react should respond or update DOM based on that.

-   Those values are already rendered on DOM, there is no way they will be re-rendered.

-   For that React.js provides a function called "useState".

-   This type of function which starts with "use" is called hook.

-   This is a special function which has some features provided by react.js

-   we will learn about other hooks in future.

# useState Hook in React
The `useState` hook allows you to add state to functional components. It returns an array where the first element is the current state value, and the second element is a function used to update that state. (setter function)

```js
const [count, setCount] = useState();
```
-   We are using `const` to prevent accidental mutation of `count` variable as it is immutable.

-   As if we don't use `const`, then we can change the value of `count` variable directly without calling the setter function and that wouldn't trigger a re-render of the component and the UI will not update accordingly.

-   So to prevent this accidental mutation, we use `const`. So that we can only mutate the value of `count` variable through the setter function. (not directly by reassigning or any such method).

-   The default value of the state variable is 'undefined'.

# How React State works?
The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.

-   In React, state is a way to store and manage data that can change over the lifetime of a component. When state changes, React re-renders the component to reflect the new state. This ensures that the user interface stays in sync with the underlying data.

# React Reconciliation
It is the process through which React updates the Browser DOM.

# The Diffing Algorithm
Diffing short for Differences Algorithm is used to differentiate the DOM Tree for efficient updates."**

-   Note: When React.js creates a new tree, it will re-run or re-render the affected component and all its children. So, in this case It will re-run our <Counter /> component, it won’t re-render other components outside. Let’s demonstrate it.


```js
function App() {
  return (
    <div>
      <ParentComponent>
        <ChildComponent />
        <AnotherChildComponent />
      </ParentComponent>
      <SiblingComponent />
    </div>
  );
}
```

Here’s how the re-rendering works:

## Initial Render:
When the App component first renders, React renders ParentComponent, ChildComponent, AnotherChildComponent, and SiblingComponent.

## State Change in ParentComponent:
Suppose there is a state change in ParentComponent. React will re-render ParentComponent and all its children (ChildComponent and AnotherChildComponent).

## Components Outside:
SiblingComponent is not affected by the state change in ParentComponent. Therefore, it will not be re-rendered.

# Why the state value doesn't reset to its initial value on re-render?
***First Render:*** ```const [count, setCount] = useState(0);```

```count``` is initialized to ```0```.

***Button Click:*** ```increment``` function is called.

```setCount(count + 1)``` updates ```count``` to ```1```.

***Re-render:*** React re-renders the component. (when user clicks button for the 2nd time)

```const [count, setCount] = useState(0);``` sees that ```count``` is now ```1``` and uses ```1``` as the *current state*. The ```useState``` hook is smart enough to only use the initial value the very first time the component renders.


# Derived State
## Derived State
Derived state is any state that can be computed based on other state or props. It is not stored directly in the component's state but is calculated when needed. This approach helps avoid duplication and keeps the state simpler and more manageable.

Example:
```js
const userCount = users.length;
```

## Benefits of Derived State

-   **Avoid Redundancy:** By deriving values from existing state, you avoid storing redundant data.

-   **Consistency:** Ensures that derived values are always in sync with the underlying props or state.

-   **Simplicity:** Reduces the complexity of state management by minimizing the number of state variables.

-   **Performance Optimization:** Avoids unnecessary re-renders since derived values are recalculated only when dependencies change.

-   **Maintainability:** Makes code easier to debug and refactor by centralizing logic in one place.

In the context of derived state, the term "redundant" means unnecessary duplication of data that can instead be computed from existing state or props.

# Lifting the State Up in React
**Lifting State Up** is a pattern in React where you move the state from child components to a common parent component so that multiple child components can share and synchronize this state. This ensures that the state is managed at a higher level in the component hierarchy, allowing data to flow down as props and actions (such as events) to flow up.

**Use Case:**

When you have two or more components that need to share the same state, you should lift the state up to their nearest common ancestor. This allows these components to stay in sync and ensures that the state is managed in a single place.

## Updating Parent State from child and vice versa
- For updating state of children from parent, you can use the concept called **Lifting the state up**.
- Here, you will lift the state from child to parent then pass that state down using props.

- For updating state of parent from children, you can pass a function that updates the state from parent to children as props, then children can call that function to update it.

## Lifting the State Up in React

**Parent Component:**  
Holds the state `inputValue` and the state handler `setInputValue`.

**InputComponent:**  
Receives `inputValue` and `setInputValue` as props. It updates the state via `setInputValue` when the input changes.

**DisplayComponent:**  
Receives `inputValue` as a prop and displays the current input value.

## Updating Parent State from Child and Vice-Versa

- For updating state of children from parent, you can use the concept called **Lifting the state up**.
- Here, you will lift the state from child to parent, then pass that state down using props.

- For updating state of parent from children, you can pass a function that updates the state from parent to children as props, then children can call it to update it.





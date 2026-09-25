# Context API, Custom Hooks and 'use' API
## Context API
- It is a way to pass data through the component tree without having to pass props down manually at entry level
- <b><u>createContext: </u></b> creates a Context object
- <b><u>Provider: </u></b> A component that provides the context value to its children
- <b><u>useContext: </u></b> (Consumer) A hook that allows you to consume a context

<b>Initial Value:</b> We don't pass an initial value directly to the context.

<b>Context Creation:</b> createContext returns a Context component, not a variable. createContext returns a context object with two components: Provider and Consumer. The Provider component is used to provide the context value to its children, while the Consumer component is used to consume the context value in a child component.
The first letter of the Context component's name must be uppercase.

<b>Provider Component:</b> The Provider is a property of the Context component. We pass the value to the Provider, which makes it accessible to child components.
The value should be passed inside double curly braces {{ }} if it's more then one.

<b>Consuming Context Data:</b> To access the context data, we use the useContext hook. As a parameter, we pass the entire context to useContext to access all values provided by the Provider.

```js
function App() {

    const userName = "Anik";

    return (
        <UserContext.Provider value={userName}>
            <Header />
        </UserContext.Provider>
    );
}
```

<b>Flow:</b>
```
UserContext.Provider
        ↓
      Header
        ↓
   UserProfile
```
<b>Header and UserProfile can access the context.</b>

```js
import { useContext } from "react";

function UserProfile() {

    const userName = useContext(UserContext);

    return <h2>Hello {userName}</h2>;
}
```

<b>Whole Code: </b>
```js
import { createContext, useContext } from "react";

// 1. Create Context
const UserContext = createContext();


// 2. Provider
function App() {

    const userName = "Anik";

    return (
        <UserContext.Provider value={userName}>
            <Header />
        </UserContext.Provider>
    );
}


// Header doesn't need userName
function Header() {

    return (
        <div>
            <h1>My Website</h1>
            <UserProfile />
        </div>
    );
}


// 3. Consume Context
function UserProfile() {

    const userName = useContext(UserContext);

    return <h2>Hello {userName}</h2>;
}

export default App;
```

But the approach in my code is more professional.

## Custom Hooks
Creating custom hooks in React is a powerful way to encapsulate logic and make your components cleaner and more maintainable.

1. <b>Prefix with use:</b> Custom hooks must start with the word use. This convention ensures that hooks are easily identifiable and adhere to the hook rules.

2. <b>Use Built-in Hooks:</b> Custom hooks should utilize React's built-in hooks (e.g., useState, useEffect, useContext) to leverage React's state and lifecycle features.

3. <b>Avoid Side Effects Outside Hooks:</b> Side effects (e.g., data fetching, subscriptions) should be managed within hooks using useEffect or other appropriate hooks.

4. <b>Keep Hooks Pure:</b> Hooks should be free from side effects and return values or functions that the component can use.

## 'use' API
- It is a React API that lets you read the value of a resource like a Promise or Context.
- flexible alternative to useContext
- useContext cannot be used inside conditional statements and loops but use api can be used
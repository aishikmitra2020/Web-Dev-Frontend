// updater function --> A function passed as an argument to setState() usually. ex - setYear(y => y + 1)
//                  Allow for safe updates based on the previous state not the current state
//                  Used with multiple state updates and asyncronous functions
//                  Good practice to use updater function

import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

    const increment = () => {
        // Uses the CURRENT state to calculate the NEXT state.
        // set functions do not trigger an update.
        // React batches together state updates for performance reasons.
        // NEXT state becomes the CURRENT state after an update.

        // In React, state updates using setState (such as setCount) are asynchronous and batched. This means that multiple updates to the same state variable within the same function call will not take effect immediately. Instead, React will group them together and apply only the last one.

        // Why is setState asynchronous?
        // React batches state updates for performance reasons. If setState were synchronous, every update would cause a re-render immediately, making the app inefficient. Instead, React schedules state updates and may combine multiple updates into a single re-render.
        // setCount(count + 1);
        // setCount(count + 1);
        // setCount(count + 1);
        // setCount(count + 1);

        // What actually happens behind the scene
        // Let's assume count = 0 initially.
        // setCount(count + 1) → setCount(0 + 1) → setCount(1)
        // setCount(count + 1) → setCount(0 + 1) → setCount(1)
        // setCount(count + 1) → setCount(0 + 1) → setCount(1)
        // setCount(count + 1) → setCount(0 + 1) → setCount(1)

        // Since setCount does not immediately update count, each call still uses the old count value (0). React batches these updates, so only the last one is applied, resulting in count = 1 instead of count = 4.

        // Batching - Batching in React means that multiple state updates inside the same event cycle are grouped together into a single re-render instead of causing multiple separate renders.


        // To update count multiple times correctly, use the functional form of setState
        // Stale State - Stale state occurs when you update state using an outdated (old) value instead of the latest updated value. This often happens because React state updates are asynchronous and batched, meaning multiple updates inside the same function do not take effect immediately.
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);

        // Takes the PENDING state to calculate NEXT state
        // React puts your updater function in a queue (waiting in line)
        // During the next render, it will call them in the same order

        // prevCount this variable given by the setCount function, but we could name it anything. due to convention we use the name prevCount. We can also take the first letter of the state variable, it is also a convention

        // Unlike setCount(count + 1), which uses a stale state, the functional update form ensures that each update receives the latest state (prevCount). Since React executes functional state updates in order, count increases correctly step by step.

        // Why This Works?
        // Each setCount now gets the most recently updated state (prevCount), ensuring the state updates step by step.
        // If count = 0, then:
        // prevCount = 0 → 1
        // prevCount = 1 → 2
        // prevCount = 2 → 3
        // prevCount = 3 → 4
    }
    const decrement = () => {
        // setCount(count - 1);

        setCount(c => c - 1)
        setCount(c => c - 1)
        setCount(c => c - 1)
    }
    const reset = () => {
        // setCount(0);

        // We don't need the previous state so we don't need the updater function
        setCount(c => c = 0)
    }

    return(
        <div className="counter-container">
            <p className="count-display">{count}</p>
            <button className="counter-button" onClick={decrement}>Decrement</button>
            <button className="counter-button" onClick={reset}>Reset</button>
            <button className="counter-button" onClick={increment}>Increment</button>
        </div>
    );
}

export default App

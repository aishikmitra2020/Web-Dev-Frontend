# Event Handling in ReactJS
Event handling in React.js is the process of **capturing and responding to user interactions, such as clicks, keystrokes, or form submissions, within a React application.** Event handling in React follows a similar pattern to standard JavaScript event handling but with some key differences, such as using **synthetic events** for **cross-browser compatibility** and providing consistent event handling across different elements and browsers.

# What is SyntheticBaseEvent in React?
When you handle events in React, like clicking a button or typing in an input box, React wraps the native browser events are wrapped in something called a **SyntheticEvent**. This SyntheticEvent is a wrapper around the browser's native event, making sure that events behave consistently across all the browsers.

# Events in ReactJS
Here, are some widely used **React.js events:**

1. **onClick**: Triggered when an element is clicked.
2. **onChange**: Triggered when the value of an input element changes.
3. **onSubmit**: Triggered when a form is submitted.
4. **onKeyPress**: Triggered when a key is pressed while an element has focus.
5. **onMouseMove**: Triggered when the mouse moves over an element.
6. **onMouseEnter**: Triggered when the mouse pointer enters an element.
7. **onKeyPress**: Triggered when a key is pressed while an element has focus.
8. **onMouseMove**: Triggered when the mouse moves over an element.
9. **onMouseLeave**: Triggered when the mouse pointer leaves an element.
10. **onKeyPress**: Triggered when a key is pressed while an element has focus.
11. **onMouseMove**: Triggered when the mouse moves over an element.
12. **onKeyDown**: Triggered when a key is pressed down.
13. **onKeyPress**: Triggered when a key is pressed while an element has focus.
14. **onMouseMove**: Triggered when the mouse moves over an element.
15. **onKeyUp**: Triggered when a key is released.
16. **onKeyPress**: Triggered when a key is pressed while an element has focus.
17. **onMouseMove**: Triggered when the mouse moves over an element.
18. **onFocus**: Triggered when an element receives focus.
19. **onKeyPress**: Triggered when a key is pressed while an element has focus.
20. **onMouseMove**: Triggered when the mouse moves over an element.
21. **onBlur**: Triggered when an element loses focus.
22. **onKeyPress**: Triggered when a key is pressed while an element has focus.
23. **onMouseMove**: Triggered when the mouse moves over an element.
24. **onInput**: Triggered when the value of an input element is changed (similar to onChange).
25. **onKeyPress**: Triggered when a key is pressed while an element has focus.
26. **onMouseMove**: Triggered when the mouse moves over an element.

# Event Naming Conventions
**CamelCase**: Event names in JSX should be written in camelCase.
Example: `onClick`, `onChange`, `onSubmit`.
Prefix with **'on'**: Event handlers should be prefixed with **"on"**.
Example: `onClick`, `onMouseEnter`.

## Function Naming Conventions
*   Here also we follow **camelCase** naming convention
*   **Prefix** with **'handle'**: It is a common convention to **prefix event handler functions** with **"handle"** to clearly indicate their purpose.

    *   Example: `handleClick`, `handleChange`, `handleSubmit`.

*   **Descriptive Names:** Function names should be **descriptive and reflect what the function does**. Avoid vague names like `clickHandler` or `handleFormSubmit`. Be specific about the action being performed.

    * Example: Use `handleFormSubmit` instead of just `handleSubmit` if it's specifically for form submission.


# Passing Event Handlers as Props in React.js
Passing event handlers as props in React.js is a common pattern used to allow ***child components to communicate with parent components.*** This pattern is useful in various scenarios, including:

1. **Form Handling**
    *   Passing event handlers like onChange or onSubmit to form components allows child components to update form data and notify the parent component of changes.

2. **User Interaction**
    *   Event handlers like onClick can be passed to interactive elements (e.g., buttons, links) to trigger specific actions in the parent component, such as opening a modal or navigating to a different page.

3. **State Management**
    * Event handlers can be used to update state in the parent component, which can then be passed down to child components as props to reflect the updated status.

4. **Callback Functions**
    *   Event handlers can serve as callback functions to handle asynchronous operations or update state based on the result of an operation.


# Event Propagation

Event propagation refers to the process of how events propagate or travel through the DOM (Document Object Model) hierarchy.

In JavaScript, there are 3 phases of event propagation:

1. **Capturing phase:** The event starts from the root of the DOM and goes down to the target element.

2. **Target phase:** The event reaches the target element where it occurs.

3. **Bubbling phase:** The event starts from the target element and bubbles up to the root of the DOM. (opposite to Capturing phase)


# Event Propagation in React.js

*   In React.js, event propagation refers to the process by which events propagate or "bubble" up from the target element through its parent elements in the DOM hierarchy. React follows the same event propagation model as regular JavaScript DOM events.

*   When an event occurs on an element in a React component, such as a button click, the event is first captured at the target element and then bubbles up through the parent elements, triggering any event handlers that have been defined along the way. This allows you to handle events at different levels of the component hierarchy.

*   React provides a way to stop event propagation using the `stopPropagation()` method which can be called on the event object within an event handler. This prevents the event from bubbling up further in the DOM, ensuring that only the intended event handler is triggered.
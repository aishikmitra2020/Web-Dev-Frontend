import React from 'react'

// Previously (before React v18), we have to write this 'import React from 'react'', but after that it is not needed

const App = () => {
  // return <h1>Hello, Thapa Technical</h1>

  // The above line behind the scene works like this
  // This below line also works the same
  return React.createElement("h1", null, "Hello, Thapa Technical");

  // But if we write html elements directly inside the JS then it is be called a JSX syntax

  // React converts JSX into React elements. When the state or props change, React creates a new Virtual DOM and compares it with the previous Virtual DOM (diffing). Then, it updates only the necessary parts of the real DOM efficiently, instead of re-rendering everything

  // React Elements are the building blocks of Virtual DOM
}

console.log(React.createElement("h1", null, "Hello, Thapa Technical"))

// We will get an object (also known as React.Element) and this is what converted into actual DOM elements and render the data in UI

// While a React.element is a building block and a part of the Virtual DOM itself. Rather, it is an object within the Virtual DOM tree that describes what should be rendered on the screen

// React Elements forms the VIrtual DOM
// React elements are the building blocks of Virtual DOM


// FLOW:
// JSX (HTML-like syntax inside JavaScript) is compiled by Babel into React.createElement() calls. These calls generate React elements (plain JavaScript objects), which collectively form the Virtual DOM, allowing React to efficiently update the real DOM.

// Babel is a Compiler

// Before React 19, JSX was compiled using Babel (or similar compilers). Starting from React 19, React includes its own built-in compiler, allowing JSX to be compiled without Babel for better performance.

// React cannot directly use JSX. JSX must be compiled into JavaScript first, either by Babel (React 18 and earlier) or by React's built-in compiler (React 19+).

// React can only understand JavaScript, not JSX. JSX must be compiled into JavaScript first.


// What are Componenet in React?
// They are the functions that returns JSX (JavaScript XML)

export default App

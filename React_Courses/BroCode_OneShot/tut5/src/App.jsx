// React Hook --> Special functions that allows functional components to use React features without writing class components (React v16.8)
// Ex- useState, useEffect, useContext, useReducer, useCallback, and more...

// useState() --> A React hook that allows the creation of a stateful (retains its value) variable and a setter function to update its value in the Virtual DOM.
// [name, setName]

// onChange --> event handler used primarilly with form elements
//              ex- <input>, <textarea>, <select>, <radio>
//              Triggers a function every time the value of the input changes

import MyComponent from "./MyComponent.jsx";
import MyComponent2 from "./MyComponent2.jsx";
import Counter from "./Counter.jsx";

function App() {
  // return(<MyComponent />);
  return(
    <>
      <Counter />
      <MyComponent />
      <MyComponent2 />
    </>
  );
}

export default App

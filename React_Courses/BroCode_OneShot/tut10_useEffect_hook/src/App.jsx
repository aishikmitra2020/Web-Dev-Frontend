// useEffect() --> React hook that tells React DO SOME CODE WHEN (pick one):
//                This component re-renders
//                This component mounts
//                The state of a value changes

// useEffect(function, [dependencies])

// second argument '[dependencies]' is optional

// 1. useEffect(() => {})             // Runs after every re-render
// 2. useEffect(() => {}, [])          // Runs only on mount
// 3. useEffect(() => {}, [value])     // Runs on mount + when value changes

// USES
// #1    Event Listeners
// #2    DOM Manupulation
// #3    Subscriptions(real-time updates)
// #4    Fetching Data from an API
// #5    Clean up when a component unmounts

// Mount -- When a component is created and appended to the DOM
// unmount - When a component is removed from the DOM

import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("green");

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  // Using [] refers that this hook code will only run when the component is create and append or added to the DOM initially and if we do not use [], it will run every time our component re-renders

  // useEffect(() => {
  //   document.title = `My Counter Program`
  // }, []); // We just want to set this title once so we have used []
  
  // useEffect(() => {
  //   document.title = `Count: ${count}`
  // });

  // useEffect(() => {
  //   document.title = `Count: ${count} ${color}`
  // }, [count]); // When we pass a variable in the dependencies array, it actually runs the code in the function every time when our component is mounted and the given variable value changes

  useEffect(() => {
    // document.title = `Count: ${count} ${color}`
    document.title = `Size: ${width} x ${height}`;
  }, [count, color, width, height]);

  // document.title = `Count: ${count} ${color}` // If we write like this it will also work same as the useEffect hook. It will run in every re-render, but we use useEffect hook to organize our code and useEffect allows some additional features like we can add some cleanup functions inside it


  // This will add thousands of event listeners as it will add event listeners in every re-renders but we want to add the event listener once while this component is mounted and it will work fine
  // window.addEventListener("resize", handleResize);
  // console.log("EVENT LISTENER ADDED")


  // Adding the event listeners only when the component mounts
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup function.
    // This will run either before the next re-render or when the component unmounts
    return () => {
      // Removed the event listener in the cleanup function. This is always a good practice as it prevents from many unexpected behaviours
      window.removeEventListener("resize", handleResize)
      console.log("EVENT LISTENER REMOVED")
    }
  }, []);

  // we can have more than one useEffect hook within our Component

  function addCount(){
    setCount(c => c + 1);
  }

  function subtractCount(){
    setCount(c => c - 1);
  }

  function changeColor(){
    setColor(c => c === "green" ? "red" : "green");
  }

  function handleResize(){
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  return (
    <>
    <p style={{color: color}}>Count: {count}</p>
    <button onClick={addCount}>Add</button>
    <button onClick={subtractCount}>Subtract</button> <br />
    <button onClick={changeColor}>Change Color</button>

    <div>
      <p>Window Width: {width}px</p>
      <p>Window Height: {height}px</p>
    </div>
    </>
  );
}

export default App

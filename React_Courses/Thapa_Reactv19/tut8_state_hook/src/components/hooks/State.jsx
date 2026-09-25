
// Here, the value containing variable is getting updated but not reflected in UI. It is due to the fact that React does not re-render components when a variable changes.
// So we use state hook for this purpose. any changes in the state variable using the setter function will trigger a re-render of the component.

import { useState } from "react"

// export const State = () => {
//     let value = 0;

//     const handleButtonClick = () => {
//         value++;
//         console.log(value);
//     };

//     return (
//         <>
//         <h1>{value}</h1>
//         <button onClick={handleButtonClick}>Increment</button>
//         </>
//     );
// };


// Using useState Hook
export const State = () => {
    // console.log(useState()); // It returns an array. The first element is the state variable and second one is the setter function which updates the state variable.

    // let array = useState();
    // console.log(array);

    // Destructuring the array returned by useState()
    // const [count, setCount] = useState();
    // We are using 'const' to prevent accidental mutation of count variable as it is immutable.
    // As if we don't use 'const', then we can change the value of count variable directly without calling the setter function and that wouldn't trigger a re-render of the component and the UI will not update accordingly.
    // So to prevent this accidental mutation, we use 'const'. SO that we can only mutate the value of count variable through the setter function. (not directly by reassigning or any such method)

    // The default value is 'undefined'.

    const [count, setCount] = useState(0);

    console.log("Parent Component Rendered");

    const handleButtonClick = () => {
        setCount(()=>count+1); // using updater function to increment the value
    };

    return (
        <>
        <div>
         <h1>{count}</h1>
         {/* <button onClick={() => setCount(count + 1)}>Increment</button> */}
         <button onClick={handleButtonClick}>Increment</button>
        </div>

        <ChildComponent />
        </>
    )
};

const ChildComponent = () => {
    console.log('ChildComponent Rendered');
    return <h3>This is a child component</h3>
}

export const Sibling = () => {
    console.log('Sibling Component Rendered');
    return <h3>This is a sibling component</h3>
}

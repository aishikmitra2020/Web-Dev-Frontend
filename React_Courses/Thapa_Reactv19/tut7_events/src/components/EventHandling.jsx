import React from 'react'

const EventHandling = () => {

    // function handleButtonClick(){
    //     alert('Button clicked');
    // }

    const handleButtonClick = (event) => {
        // Instead of returning a basic event object it return a 'SyntheticBaseEvent'
        console.log(event);

        console.log(event.target);
        console.log(event.type);

        alert('Button clicked');
    }

    const handleWelcome = (name) => {
        alert(`Hello, ${name}`)
    }

    return <>

    {/*
    Event Handling in React

    In React, event handlers receive the event object as an argument by default. However, when you use an arrow function directly in the onClick attribute without passing the event explicitly, React doesn’t pass the event object to your handler function. This is because the arrow function creates a new function and calls your handler without passing any arguments.
    */}
    
    {/* Function components with Named Functions */}
    {/* When we are passing just the function ref, we needn't to invoke/call the function right there, as it will call the function immediately even the event doesn't occurred */}

    {/* It by default pases, the synthetic event object as an argument to the named function */}
        <button onClick={handleButtonClick} className='p-5 bg-green-500 m-2'>click me!</button>

        {/* But while we have to call the fuunction inside an arrow function, then only it will be called when the event occurs. */}
        <button onClick={(e) => handleButtonClick(e)} className='p-5 bg-green-500 m-2'>click me2!</button>

        {/* Inline Event Handlers */}
        <button onClick={(event) => console.log(event)} className='p-5 bg-green-500 m-2'>click me4!</button>

        {/* Function Components with Inline Arrow Functions */}
        <button onClick={() => alert('Button5 Clicked')} className='p-5 bg-green-500 m-2'>click me5!</button>

        {/* Passing Arguments to Event Handlers */}
        <button onClick={() => handleWelcome("Aishik")} className='p-5 bg-green-500 m-2'>click me5!</button>
    </>
}

export default EventHandling

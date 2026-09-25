// useState() = Re-renders the component when the state value changes

// useRef() --> "use reference" Does not cause re-renders when its value changes.
//              When you want a component to "remember" some information accross re-renders,
//              but you don't want that information to trigger new renders.

// 1.     Accessing/Interacting with DOM elements
// 2.     Handling Focus, Animations, and Transitions
// 3.     Managing Timers and Intervals

// useState() triggers re-renders but useRef() doesn't

import { useState, useEffect, useRef } from "react"

function MyComponent(){
    // let [number, setNumber] = useState(0);

    // const ref = useRef();

    // useRef returns a ref object with a single current property initially set to the initial value ou provided
    // We may or may not pass the initial value
    const ref = useRef(5);
    
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);

    // console.log(ref);

    useEffect(() => {
        console.log("COMPONENT RENDERED")
        console.log(inputRef)
    })

    function handleClick(){
        // setNumber(n => n+1);

        // ref.current = ref.current + 1;
        ref.current++;
        // console.log(ref.current);
        
        // 'inputRef.current' has the input element
        inputRef.current.focus();
        inputRef.current.style.backgroundColor = "yellow";

        inputRef2.current.style.backgroundColor = "";
        inputRef3.current.style.backgroundColor = "";
    }

    function handleClick2(){
        inputRef2.current.focus();
        inputRef2.current.style.backgroundColor = "yellow";

        inputRef.current.style.backgroundColor = "";
        inputRef3.current.style.backgroundColor = "";
    }

    function handleClick3(){
        inputRef3.current.focus();
        inputRef3.current.style.backgroundColor = "yellow";

        inputRef2.current.style.backgroundColor = "";
        inputRef.current.style.backgroundColor = "";
    }

    return(
        <div>
            <button onClick={handleClick}>Click me</button>

            {/* Now, the 'inputRef' will have this input as its value */}
            <input ref={inputRef} type="text" />
            {/* 'ref' attribute of an html element is a special attribute to create references to elements */}

            <br/>
            <button onClick={handleClick2}>Click me2</button>
            <input ref={inputRef2} type="text" />
            <br/>
            <button onClick={handleClick3}>Click me3</button>
            <input ref={inputRef3} type="text" />
        </div>
    );
}

export default MyComponent
import React, { forwardRef, useId, useRef } from 'react'

const ForwardRef = () => {
    const username = useRef(null);
    const password = useRef(null);

    const handleFormSubmit = (e)=> {
        e.preventDefault();
        console.log(username.current.value, password.current.value)
    };

  return (
    <form onSubmit={handleFormSubmit}>
        <ChildInput label="username" ref={username} />
        <ChildInput label="password" ref={password} />
        <button type='submit'>Submit</button>
    </form>
  )
}

// before Reactv19
// const ChildInput = forwardRef((props, ref) => {
//     const id = useId();
    
//     return (
//         <div>
//             <label htmlFor={id}>{props.label}</label>
//             <input type="text" ref={ref} />
//         </div>
//     )
// })


// after Reactv19
// we can treat refs as normal props
// we can also do destructuring.. (props) => ({ label, ref })
const ChildInput = (props) => {
    const id = useId();
    
    return (
        <div>
            <label htmlFor={id}>{props.label}</label>
            <input type="text" ref={props.ref} />
        </div>
    )
};


export default ForwardRef;
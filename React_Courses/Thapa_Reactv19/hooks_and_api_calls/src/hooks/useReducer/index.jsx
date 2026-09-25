import React, { useReducer, useState } from 'react'

const index = () => {

    const reducer = (state, action) => {
        console.log(state, action);

        if(action.type === "INCREMENT"){
            return state + 1;
        }
        else if(action.type === "DECREMENT"){
            return state - 1;
        }
        else if (action.type === "RESET"){
          return state = 0;
        }
    }

    // const [count, setCount] = useState(0);
    const [count, dispatch] = useReducer(reducer, 0);
    
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch({type: "INCREMENT"})}>Increment</button>
      <button onClick={() => dispatch({type: "DECREMENT"})}>Decrement</button>
      <button onClick={() => dispatch({type: "RESET"})}>Reset</button>
    </div>
  )
}

export default index

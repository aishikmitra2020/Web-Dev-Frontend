import React, { useReducer, useState } from 'react'

const tut2 = () => {

    const initialState = {
        count: 0,
        inc: 2,
        dec: 2,
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case "INCREMENT":
                return { ...state, count: state.count + 1 };
            case "DECREMENT":
                return { ...state, count: state.count - 1 }; 
            case "RESET":
                return { ...state, count: 0 };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    
  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({type: "INCREMENT"})}>Increment</button>
      <button onClick={() => dispatch({type: "DECREMENT"})}>Decrement</button>
      <button onClick={() => dispatch({type: "RESET"})}>Reset</button>
    </div>
  )
}

export default tut2

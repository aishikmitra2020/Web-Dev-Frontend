// Cleanup Function 
import React, { useState, useEffect } from 'react'

const tut2 = () => {

    const [count, setCount] = useState(0);

    useEffect(()=> {
        const interval = setInterval(()=>{
            setCount((prev) => prev + 1);
        }, 1000)

        return ()=> clearInterval(interval)
    }, [])

  return (
    <div>
      <h2>Count : {count}</h2>
    </div>
  )
}

export default tut2

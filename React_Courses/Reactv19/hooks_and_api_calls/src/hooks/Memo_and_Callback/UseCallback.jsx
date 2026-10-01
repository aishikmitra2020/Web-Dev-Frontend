import React, { useCallback, useState } from 'react'

const Button = memo(({ onClick, children }) => {
  console.log(`Rendering button - ${children}`)

  return <button onClick={onClick}>{children}</button>
})

const UseCallback = () => {

    const [count, setCount] = useState(0);
    
    // Increment
    // const increment = () => {
    //   console.log("Increment Inside")
    //   setCount((prev) => prev + 1);
    // }

    const increment = useCallback(() => {
        console.log("Increment Inside");
        setCount((prev) => prev + 1);
    }, [])

    
    // Decrement
    // const decrement = () => setCount((prev)=> prev - 1);

    const decrement = useCallback(() => {
      console.log("Decrement Inside")
      setCount((prev) => prev - 1);
    });
    
  return (
    <div>
      <h1>{count}</h1>

      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
    </div>
  )
}

export default UseCallback

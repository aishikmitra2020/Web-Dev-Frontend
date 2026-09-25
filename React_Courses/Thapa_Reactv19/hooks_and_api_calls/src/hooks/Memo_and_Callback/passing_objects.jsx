// passing object as props to child component
import React, { useRef, useState, useMemo, memo } from 'react'

const Child = memo(({ bioData }) => {
    const renderCount = useRef(0);

    return <>
    <div>
        <h2>Hey, {bioData.name} of {bioData.age} years</h2>
        <p>{renderCount.current++} times</p>
    </div>
    </>
})

const Parent = () => {
    const [count, setCount] = useState(0);

    const mybioData = useMemo(() => {
      return {
          name: "Aishik",
          age: 17
        }
    }, [])
    // object is assined to a diff memory location every time the parent component re-renders, so the child component will re-render as well. To avoid this, we can use useMemo to memoize the object and only create a new object when the dependencies change. In this case, we have an empty dependency array, so the object will only be created once and will not change on subsequent renders.

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>

      <Child bioData={mybioData} />
    </div>
  )
}

export default Parent

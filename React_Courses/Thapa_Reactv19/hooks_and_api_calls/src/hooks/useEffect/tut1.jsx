import React, { useEffect, useState } from 'react'

const tut1 = () => {
    
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(0);

    // useEffect(()=>{
    //     console.log("Hello useeffect")
    //     // [] dependency array - it means the hook will only run once when the component mounts (not when state variable changes or any thing)
    //     // [var] => it means the hook will run when everytime the value of the given variable(s) changes.
    // }, [count])


    // clock
    useEffect(() => {
      setInterval(() => {
        const updatedDate = new Date();
        setDate(updatedDate.toLocaleTimeString());
      }, 1000)
    }, [])

    useEffect(() => {
      document.title = `Count: ${count}`
    }, [count])

  return (
    <div>

      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <h3>{date}</h3>
    </div>
  )
}

export default tut1

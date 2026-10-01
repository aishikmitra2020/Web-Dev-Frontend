import React, { useRef, useEffect } from 'react'

const tut1 = () => {
    const headingRef = useRef(null);
    
    useEffect(() => {
        console.log(headingRef.current);
        // headingRef.current.style.color = "red";
    }, [])

  return (
    <div>
      <h1 ref={headingRef}>Hello World</h1>
    </div>
  )
}

export default tut1

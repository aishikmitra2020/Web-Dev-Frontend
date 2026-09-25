import { useContext } from 'react'
import { UserContext } from './ComponentA.jsx'
import ComponentD from "./ComponentD.jsx"

// In this example, this ComponentC is also a CONSUMER COMPONENT.
// For this CONSUMER COMPONENT, the ComponentA is the nearest PROVIDER COMPONENT, so we have setup the Context in ComponentA

function ComponentC(){

  const user = useContext(UserContext);
  
  return (
    <div className='box'>
      <h1>ComponentC</h1>
      <h2>{`Hello again ${user}`}</h2>
      <ComponentD />
    </div>
  )
}

export default ComponentC

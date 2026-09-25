import { useContext } from 'react'
import { UserContext } from './ComponentA.jsx'

// In this example, this ComponentD is also a CONSUMER COMPONENT.
// For this CONSUMER COMPONENT, the ComponentA is the nearest PROVIDER COMPONENT, so we have setup the Context in ComponentA

function ComponentD(){

  const user = useContext(UserContext);

  return (
    <div className='box'>
      <h1>ComponentD</h1>
      <h2>{`Bye, ${user}`}</h2>
    </div>
  );
}

export default ComponentD

// Video 28 - 31
import React from 'react'
import { Sibling, State } from './components/hooks/State'
import DerivedState from './components/DerivedState'
import LiftingState from './components/LiftStateUp'

const App = () => {
  return (
    <div>
      {/* <State />
      <Sibling /> */}
      <DerivedState />
      <LiftingState />
    </div>
  )
}

export default App

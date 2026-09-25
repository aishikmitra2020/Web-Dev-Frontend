import React from 'react'
import UseStateTut from './hooks/useState'
import UseEffectTut1 from './hooks/useEffect/tut1'
import UseEffectTut2 from './hooks/useEffect/tut2'
import APITut1 from './api/tut1'
import APITut2 from './api/tut2'
import UseRefTut1 from './hooks/useRef/tut1'
import UseRefTut2 from './hooks/useRef/ForwardRef'
import { BioProvider } from './ContextAPI_and_CustomHooks'
import { Home } from './ContextAPI_and_CustomHooks/Home'
import Services from './ContextAPI_and_CustomHooks/Services'
import ReducerTut1 from './hooks/useReducer'
import ReducerTut2 from './hooks/useReducer/tut2'
import ReactMemo from './hooks/Memo_and_Callback/ReactMemo'
import UseMemo from './hooks/Memo_and_Callback/UseMemo'
import ReactMemo3 from './hooks/Memo_and_Callback/passing_objects'

const App = () => {
  return (
    <>
      <h1><u>useState</u></h1>
      <UseStateTut />

      <h1><u>useEffect</u></h1>
      <UseEffectTut1 />
      <UseEffectTut2 />

      {/* <APITut1 /> */}
      <h1><u>API Calls</u></h1>
      <APITut1/>
      <APITut2 />

      <h1><u>useRef</u></h1>
      <UseRefTut1 />
      <UseRefTut2 />

      <h1><u>useId</u></h1>


      <h1><u>useContext</u></h1>
      <BioProvider>
        <Home />
        <Services />
      </BioProvider>

      <h1><u>useReducer</u></h1>
      <ReducerTut1 />
      <ReducerTut2 />

      <h1><u>useMemo</u></h1>
      <ReactMemo />
      <UseMemo />
      <ReactMemo3 />
    </>
  )
}

export default App;

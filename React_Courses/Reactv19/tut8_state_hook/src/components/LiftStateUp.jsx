import React, {useState} from 'react'

const LiftingState = () => {
  const [inputValue, setInputValue] = useState('');
  return (
    <>
    <InputComponent inputValue={inputValue} setInputValue={setInputValue} />
    <DisplayComponent inputValue={inputValue} setInputValue={setInputValue} />
    </>
  )
}

const InputComponent = ({inputValue, setInputValue}) => {
    // const [inputValue, setInputValue] = useState('');
    // Instead of using the state hook here we will be using in the parent component, it is called lifting state
    return (
        <>
        <input type='text' placeholder='enter your name' value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
        </>
    )
}

const DisplayComponent = (props) => {
  return <p>The current input value is: {props.inputValue}</p>
}

export default LiftingState

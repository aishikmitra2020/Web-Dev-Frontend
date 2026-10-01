import React, { useState } from 'react'
import './Todo.css'

const TodoForm = ({onAddTodo}) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (val) => {
        setInputValue(val);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onAddTodo(inputValue);
        setInputValue("");
    }

  return (
    <section className='form'>
        <form onSubmit={handleFormSubmit}>
            <div>
                <input type="text" className='todo-input' autoComplete='off' value={inputValue} onChange={(event) => handleInputChange(event.target.value)} /> {/* This is a Controlled Element */}
            </div>
            <div>
                <button type='submit'>Add task</button>
            </div>
        </form>
    </section>
  )
}

export default TodoForm

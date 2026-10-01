import React, { useState } from 'react'
import './Todo.css'

const TodoForm = ({onAddTodo}) => {
    const [inputValue, setInputValue] = useState({});

    const handleInputChange = (val) => {
        setInputValue({ id: val, content: val, checked: false });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onAddTodo(inputValue);
        setInputValue({id: "", content: "", checked: false});
    }

  return (
    <section className='form'>
        <form onSubmit={handleFormSubmit}>
            <div>
                <input type="text" className='todo-input' autoComplete='off' value={inputValue.content} onChange={(event) => handleInputChange(event.target.value)} /> {/* This is a Controlled Element */}
            </div>
            <div>
                <button type='submit'>Add task</button>
            </div>
        </form>
    </section>
  )
}

export default TodoForm

// ChatGPT Method (no warning and looks better!)
// import React, { useState } from 'react';
// import './Todo.css';

// const TodoForm = ({ onAddTodo }) => {
//   const [inputValue, setInputValue] = useState('');

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();

//     if (!inputValue.trim()) return; // Avoid adding empty todos

//     const newTodo = {
//       id: Date.now(),
//       content: inputValue,
//       checked: false,
//     };

//     onAddTodo(newTodo);
//     setInputValue('');
//   };

//   return (
//     <section className='form'>
//       <form onSubmit={handleFormSubmit}>
//         <div>
//           <input
//             type='text'
//             className='todo-input'
//             autoComplete='off'
//             value={inputValue}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <button type='submit'>Add task</button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default TodoForm;


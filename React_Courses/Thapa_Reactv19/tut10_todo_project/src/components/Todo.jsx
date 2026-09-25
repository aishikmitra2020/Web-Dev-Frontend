import React, { useEffect, useState } from 'react'
import { MdCheck, MdDeleteForever } from "react-icons/md";
import "./Todo.css"

const Todo = () => {
    // input fields where we can change the value is called Controlled Element
    // and others those user can't change is called Uncontrolled Element
    const [inputValue, setInputValue] = useState("");
    const [task, setTask] = useState([]);
    const [dateTime, setDateTime] = useState("");

    const handleInputChange = (val) => {
        setInputValue(val);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault(); // this is gonna prevent the reload on form submit

        if (!inputValue) return; // check if empty
        if (task.includes(inputValue)) { // chk that the item already exists or not
            setInputValue("");
            return;
        }

        setTask((prevTask) => [...prevTask, inputValue]);
        setInputValue("");
    };

    // Date and Time
    useEffect(() => {
            const interval = setInterval(() => {
            const now = new Date();
            const formattedDate = now.toLocaleDateString();
            const formattedTime = now.toLocaleTimeString();

            setDateTime(`${formattedDate} - ${formattedTime}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // console.log("Hello"); // the component re-renders after every 1 sec as the state changes when we are not using the useEffect

    // Delete Todo
    const handleDeleteTodo = (value) => {
        // console.log(value);
        const updatedTask = task.filter((currTask) => currTask!=value);
        setTask(updatedTask);
    }

    // clear all todos
    const handleClearTodoData = () => {
        setTask([]);
    }

    return (
        <section className='todo-container'>
            <header>
                <h1>Todo List</h1>
                <h2 className='date-time'>{dateTime}</h2>
            </header>
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
            <section className='myUnOrdList'>
                <ul>
                    {
                        task.map((currTask, index) => {
                            return <li key={index} className='todo-item'>
                                <span>{currTask}</span>
                                <button className='check-btn'>
                                    <MdCheck />
                                </button>
                                <button className='delete-btn' onClick={() => handleDeleteTodo(currTask)}>
                                    <MdDeleteForever />
                                </button>
                            </li>
                        })
                    }
                </ul>
            </section>
            <section>
                <button className='clear-btn' onClick={handleClearTodoData}>Clear All</button>
            </section>
        </section>
    )
}

export default Todo

import React, { useState } from 'react'
import "./Todo.css"
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoDate from './TodoDate';

const Todo = () => {
    const [task, setTask] = useState([]);

    const handleFormSubmit = (inputValue) => {
        if (!inputValue) return;
        if (task.includes(inputValue)) return;
        setTask((prevTask) => [...prevTask, inputValue]);
    }

    // Delete Todo
    const handleDeleteTodo = (value) => {
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
                <TodoDate />
            </header>
            <TodoForm onAddTodo={handleFormSubmit} />
            <section className='myUnOrdList'>
                <ul>
                    {
                        task.map((currTask, index) => {
                            return <TodoList key={index} currTask={currTask} handleDeleteTodo={handleDeleteTodo} />
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

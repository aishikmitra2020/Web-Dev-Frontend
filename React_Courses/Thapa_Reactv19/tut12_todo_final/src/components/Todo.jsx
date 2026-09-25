import React, { useState } from 'react'
import "./Todo.css"
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoDate from './TodoDate';

const Todo = () => {
    const [task, setTask] = useState([]);

    const handleFormSubmit = (inputValue) => {
        const  { id, content, checked } = inputValue;

        // to check if the input field is empty or not
        if (!content) return;

        // to check if the data already exists or not
        // if (task.includes(inputValue)) return;
        const ifTodoContentMatched = task.find((currTask) => currTask.content == content);
        if (ifTodoContentMatched) return;

        setTask((prevTask) => [...prevTask, { id, content, checked }]);
        // In latest versions of ReactJS, there is a new feature introduced that if the property name and the vlaue name is same, then we can just write it once
        /*
        Here,
        { id, content, checkded } = 
        { id: id, content: content, checkded: checkded }
        */
    }

    // Delete Todo
    const handleDeleteTodo = (value) => {
        const updatedTask = task.filter((currTask) => currTask.content!=value);
        setTask(updatedTask);
    }

    // clear all todos
    const handleClearTodoData = () => {
        setTask([]);
    }

    // handleChckedTodo
    const handleChckedTodo = (content) => {
        const updatedTask = task.map((currTask) => {
            if(currTask.content === content) {
                return {...currTask, checked: !currTask.checked};
            } else {
                return currTask;
            }
        });

        setTask(updatedTask);
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
                        task.map((currTask) => {
                            return <TodoList key={currTask.id} currTask={currTask.content} handleDeleteTodo={handleDeleteTodo} checked={currTask.checked} handleChckedTodo={handleChckedTodo} />
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

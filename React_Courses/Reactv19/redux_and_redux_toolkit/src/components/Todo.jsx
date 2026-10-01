import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, fetchTask } from '../store';

export default function Todo() {

    const [task, setTask] = useState("");

    // Get state from Redux store
    // useSelector -> hook
    // (state) => state.task -> selector function (here it is an arrow function)
    const tasks = useSelector((state) => state.task);
    console.log('tasks:', tasks);

    // Get the dispatch function
    const dispatch = useDispatch();

    // handleFormSubmit
    const handleFormSubmit = (e) => {
        e.preventDefault();

        dispatch(addTask(task));
        return setTask("");
    }

    // handleTaskDelete
    const handleTaskDelete = (index) => {
        return dispatch(deleteTask(index))
    }

    // handleFetchTasks
    const handleFetchTasks = () => {
        dispatch(fetchTask());
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">
                    To-Do List
                </h1>

                <form onSubmit={handleFormSubmit} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="flex-1 px-4 py-2 text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
                    >
                        Add Task
                    </button>
                </form>

                <button
                        onClick={handleFetchTasks}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
                    >
                        Fetch Task
                    </button>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {tasks.length === 0 ? (
                        <p className="text-center text-slate-400 py-4">No tasks yet!</p>
                    ) : (
                        tasks.map((task, indx) => (
                            <div key={indx} className="rounded-lg border border-slate-200 bg-slate-50 p-3 flex items-stretch">
                                <p
                                    className={`flex-1 text-slate-700 select-none transition-all ${task.completed ? 'line-through text-slate-400' : ''
                                        }`}
                                >
                                    {task}
                                </p>
                                <button className="ml-2 text-red-500 hover:text-red-700 text-xl">
                                    <MdDeleteForever onClick={() => handleTaskDelete(indx)} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
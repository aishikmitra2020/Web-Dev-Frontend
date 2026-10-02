import { configureStore, createSlice } from "@reduxjs/toolkit";

// Action Types -> "domain/event"
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASKS = "task/fetch"

const initialState = {
    task: [],
    isLoading: false,
}

// const taskReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_TASK:
//             return {
//                 ...state,
//                 task: [...state.task, action.payload]
//             }
//         case DELETE_TASK:
//             const updatedTask = state.task.filter((currTask, index) => {
//                 return index !== action.payload
//             })

//             return {
//                 ...state,
//                 task: updatedTask
//             }
//         case FETCH_TASKS:
//             return {
//                 ...state,
//                 task: [...state.task, ...action.payload]
//             }
//         default:
//             return state;
//     }

// }

// RTK Slice
const taskSlice = createSlice({
    name: "task",
    initialState,

    // root reducers or micro reducers -> object of functions(action creators)
    reducers: {
        // under thwe hood, we have immers library which allows us to write mutating code but it is not mutating the state, it is creating a new state
        addTask(state, action) {
            // we can also 
            state.task.push(action.payload);
            // OR
            // state.task = [...state.task, action.payload]
            // OR (NOT RECOMMENDED)
            // return {
            //     ...state,
            //     task: [...state.task, action.payload]
            // }
        },
        deleteTask(state, action) {
            // state.task.splice(action.payload, 1);
            // OR
            state.task = state.task.filter((currTask, index) => index !== action.payload);
        },
    }
})

export const { addTask, deleteTask } = taskSlice.actions;

export const store = configureStore({
    reducer: {
        taskSlice: taskSlice.reducer,
    },
})

// thunk middleware function (action creator)
export const fetchTask = () => {
    return async (dispatch) => {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3")
            const task = await res.json();

            dispatch({ type: FETCH_TASKS, payload: task.map((currTask) => currTask.title) })
        } catch(err) {
            console.log(err)
        }
    }
}

// Step 6: Dispatch an action to add a task
store.dispatch(addTask("Lear Redux with me"))
store.dispatch({ type: ADD_TASK, payload: "2nd call" }) // without using action creator
store.dispatch(addTask("3rd call")) // using action creator
store.dispatch(addTask("4th call"))
store.dispatch(addTask("5th call"))
store.dispatch(addTask("6th call"))
store.dispatch(deleteTask(1)) // DEL Task

// log the initial state
console.log(store.getState());
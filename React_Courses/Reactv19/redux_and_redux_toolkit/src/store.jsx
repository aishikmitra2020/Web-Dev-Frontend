import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from "redux-thunk";

// Step : Create a Reducer function
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASKS = "task/fetch"

const initialState = {
    task: [],
    isLoading: false,
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                task: [...state.task, action.payload]
            }
        case DELETE_TASK:
            const updatedTask = state.task.filter((currTask, index) => {
                return index != action.payload
            })

            return {
                ...state,
                task: updatedTask
            }
        case FETCH_TASKS:
            return {
                ...state,
                task: [...state.task, ...action.payload]
            }
        default:
            return state;
    }

}

// Step 2: Create the redux store using the reducer
// export const store = createStore(taskReducer);
// console.log(store)

// using dev tools
// export const store = createStore(taskReducer, composeWithDevTools());

// using 'thunk'
// const store = createStore(rootReducer, applyMiddleware(thunk));

// dev tools + thunk
export const store = createStore(taskReducer, composeWithDevTools(applyMiddleware(thunk)));


// Step 4: Log the initial state
// The getState is a asyncronous function that returns the current state of a Redux application. It includes the entire state of the application, including all the reducers and their respective states

// console.log(store.getState())

// 5. Action Creators
export const addTask = (data) => {
    return { type: ADD_TASK, payload: data }
}

export const deleteTask = (taskIndex) => ({
  type: DELETE_TASK,
  payload: taskIndex
});

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
store.dispatch(addTask("Lear Redux with me")) // using action creator
// console.log("updated state: ", store.getState());

store.dispatch({ type: ADD_TASK, payload: "2nd call" }) // without using action creator
// console.log("updated state: ", store.getState());

store.dispatch(addTask("3rd call")) // using action creator
// console.log("updated state: ", store.getState());

store.dispatch(addTask("4th call"))
store.dispatch(addTask("5th call"))
store.dispatch(addTask("6th call"))


// DEL_TASK
store.dispatch(deleteTask(1))
// console.log("updated state: ", store.getState());
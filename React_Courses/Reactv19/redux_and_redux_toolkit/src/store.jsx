import { createStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';

// Step : Create a Reducer function
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";

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
        default:
            return state;
    }

}

// Step 2: Create the redux store using the reducer
// export const store = createStore(taskReducer);
// console.log(store)

// using dev tools
export const store = createStore(taskReducer, composeWithDevTools());


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
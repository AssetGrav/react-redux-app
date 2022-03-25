import { createAction, createSlice, nanoid } from '@reduxjs/toolkit'
import todosServices from '../services/todos.service';
import { setError } from './errors';

const initialState =
  {
    entiries: [],
    isLoading: true
  };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entiries = action.payload
      state.isLoading = false
    },
    update(state, action) {
      const elementIndex = state.entiries.findIndex(
        (el) => el.id === action.payload.id
      )
      state.entiries[elementIndex] = {
        ...state.entiries[elementIndex],
        ...action.payload
      }
    },
    remove(state, action){
        state.entiries = state.entiries.filter((elem) => elem.id !== action.payload.id)
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestedFailed(state, action) {
      state.isLoading = false
    },
    created(state, action) {
      state.entiries.push(action.payload);
    }
}})

const createTask = createAction("task/createTask")

const { actions, reducer: taskReducer } = taskSlice
const { update, remove, recived, taskRequested, taskRequestedFailed, created } = actions

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosServices.fetch();
    dispatch(recived(data))
  } catch (error) {
    dispatch(taskRequestedFailed());
    dispatch(setError(error.message));
  }
}
export const taskCreate = (id) => async (dispatch, getState) => {
  console.log("id", id)
  dispatch(createTask());
  try {
    const postTask = getState().task.entiries.find((elem) => {
      return elem.id === id
    })

    const data = await todosServices.post(postTask);
    console.log("d", data);
    const elem = { ...data, id: nanoid() }
    dispatch(created(elem))
  } catch (error) {
    dispatch(setError(error.message));
  }  
}
export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
}
export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}
export function taskDeleted(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.task.entiries;
export const getTaskLoadingStatus = () => (state) => state.task.isLoading;

export default taskReducer;

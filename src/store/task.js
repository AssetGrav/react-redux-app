import { createSlice } from '@reduxjs/toolkit'
import todosServices from '../services/todos.service';
import { setError } from './errors';

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      )
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload
      }
    },
    remove(state, action){
        state.entities = state.entities.filter((elem) => elem.id !== action.payload.id)
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestedFailed(state, action) {
      state.isLoading = false
    }
}})
const { actions, reducer: taskReducer } = taskSlice
const { update, remove, recived, taskRequested, taskRequestedFailed } = actions

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
  try {
    const postTask = getState().task.entities.find((elem) => {
      return elem.id === id
    })
    console.log(postTask)
    const data = await todosServices.post(postTask);
    console.log(data)
    dispatch(update(data))
  } catch (error) {
    dispatch(setError(error.message));
  }  
}
export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id: id, completed: true }));
}
export function titleChanged(id) {
  return update({ id: id, title: `New title for ${id}` });
}
export function taskDeleted(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.task.entities;
export const getTaskLoadingStatus = () => (state) => state.task.isLoading;

export default taskReducer;

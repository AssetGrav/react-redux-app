import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import ReactDOM from 'react-dom';
import { titleChanged, taskDeleted, completeTask, getTasks, getTaskLoadingStatus, loadTasks, taskCreate } from "./store/task";
import confiqureStore from './store/store';
import { getError } from './store/errors';

const store = confiqureStore();

const App = (params) => {

  const state = useSelector(getTasks());
  const isLoading = useSelector(getTaskLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  }
  const deletedTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  }
  const createTask = (taskId) => {
    dispatch(taskCreate(taskId))
  }
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <p>{error}</p> 
  }
  console.log(state)
  return (
    <>
      <h1>App</h1>
      
      <ul>
        {state.map((el)=>
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}
            >
              Completed
            </button>
            <button onClick={() => changeTitle(el.id)}
            >
              Change Title
            </button>
            <button onClick={() => deletedTask(el.id)}
            >
              Delete
            </button>
            <button onClick={() => createTask(el.id)}
            >
              Create
            </button>
            <hr/>
          </li>
          )}
      </ul>
    </>
  )}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

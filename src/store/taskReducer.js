import { taskUpdate, taskDelete } from "./actionTypes";

export function taskReducer(state = [], action) {
    switch (action.type) {
      case taskUpdate: {
        const newArray = [...state];
        const elementIndex = newArray.findIndex(
          (el) => el.id === action.payload.id
        );
        newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload }
        return newArray
      }
      case taskDelete: {
        const newArray = [...state];
        const elementIndex = newArray.findIndex(
            (el) => el.id === action.payload.id
        )
        console.log(newArray);
        const resultArray = newArray.filter((elem) => elem !== newArray[elementIndex])
        console.log(resultArray)
        return resultArray
      };
      default:
        return state;
    }
}
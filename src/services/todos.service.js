import { nanoid } from "@reduxjs/toolkit";
import httpService from "./http.service";

const todosEndpoint = "todos/";
const todosServices = {
    fetch: async () => {
        const {data} = await httpService.get(todosEndpoint, {
            params: {
                _page: 1,
                _limit: 10
            }
        })
        return data;
    },
    post: async (elem) => {
        const {data} = await httpService.post(todosEndpoint, elem) 
        console.log("data", data)
        return data;
    }
}
export default todosServices;

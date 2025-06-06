
import { get, put } from "..";
import Facultyroute from "./route";


const Facultyservice = {
    updatePost: async ({id,obj}) => {
        const result = await put(`${Facultyroute?.updateProfile}/${id}`, obj);
        return result;
    },
    getProfile: async (id) => {
        const result = await get(`${Facultyroute?.getProfile}/${id}` );
        return result;
    },
    getDepartment: async () => {
        const result = await get(`${Facultyroute?.getDepartment}` );
        return result;
    },
    getallfaculty:async (page,limit)=>{
        const result = await get(`${Facultyroute?.getallfaculty}`+ `?page=${page}&limit=${limit}` );
        return result;
    }
    

};

export default Facultyservice;
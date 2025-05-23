import { get, put } from "..";
import studentRoute from "./route";

const studentService = {
    updatePost: async ({id,obj}) => {
        const result = await put(`${studentRoute?.updateProfile}/${id}`, obj);
        return result;
    },
    getProfile: async (id) => {
        const result = await get(`${studentRoute?.getProfile}/${id}` );
        return result;
    },

};

export default studentService;
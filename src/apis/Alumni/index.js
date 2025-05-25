
import { get, put } from "..";
import Alumniroute from "./route";

const AlumniService = {
    updatePost: async ({id,obj}) => {
        const result = await put(`${Alumniroute?.updateProfile}/${id}`, obj);
        return result;
    },
    getProfile: async (id) => {
        const result = await get(`${Alumniroute?.getProfile}/${id}` );
        return result;
    },

};

export default AlumniService;
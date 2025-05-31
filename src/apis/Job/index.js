import { deletedtoken, gettoken, post, posttoken, puttoken } from "../index";
import jobRoutes from "./route";
import postRoutes from "./route";


const JobService = {
    addJob: async (obj) => {
        const result = await posttoken(jobRoutes?.addjob, obj);
        return result;
    },
    updateJob: async ({id,obj}) => {
        const result = await puttoken(jobRoutes?.updatejob + `${id}`, obj);
        return result;
    },
    getjob: async (page,limit) => {
        const result = await gettoken(postRoutes?.getjob + `?page=${page}&limit=${limit}`);
        return result;
    },
    getalljob: async (page,limit) => {
        const result = await gettoken(postRoutes?.getalljob + `?page=${page}&limit=${limit}`);
        return result;
    },
    deletejob: async (id) => {
        const result = await deletedtoken(postRoutes?.deletejob + `/${id}`);
        return result;
    },
};

export default JobService;
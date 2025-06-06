import {  gettoken, posttoken,  } from "..";
import resumeRoute from "./route";


const resumeService = {
    createResume: async (obj) => {
        const result = await posttoken(`${resumeRoute?.createresume}`, obj);
        return result;
    },
    getResume: async () => {
        const result = await gettoken(resumeRoute?.getresume );
        return result;
    },

};

export default resumeService;
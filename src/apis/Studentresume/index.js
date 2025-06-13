import {  gettoken, posttoken,  } from "..";
import resumeRoute from "./route";


const resumeService = {
    createResume: async (obj) => {
        const result = await posttoken(`${resumeRoute?.createresume}`, obj);
        return result;
    },
    getResume: async (name) => {
        const result = await gettoken(`${resumeRoute?.getresume}/${name}` );
        return result;
    },
    getResumebyid: async () => {
        const result = await gettoken(`${resumeRoute?.getResumebyid}` );
        return result;
    },

};

export default resumeService;
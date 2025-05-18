import { get } from "..";
import webroute from "./route";

const WebServices = {
    getHome: async () => {
        const result = await get(webroute.gethome);
        return result;
    },
    getAbout: async () => {
        const result = await get(webroute.getabout);
        return result;
    },
    getEvent: async (page,limit) => {
        const result = await get(webroute.getEvents + `?page=${page || 1}&limit=${limit || 10}`);
        return result;
    },
    getTerms: async (page,limit) => {
        const result = await get(webroute.getTerms + `?page=${page || 1}&limit=${limit || 10}`);
        return result;
    },

};
export default WebServices

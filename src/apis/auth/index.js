import { get, post } from "..";
import authRoute from "./route";
import webroute from "./route";

const authServices = {
    postLogin: async (obj) => {
        const result = await post(authRoute.login,obj);
        return result;
    },
    forget: async (obj) => {
        const result = await post(authRoute.forget,obj);
        return result;
    },
    reset: async (obj) => {
        const result = await post(authRoute.reset,obj);
        return result;
    },
    verifyOtp: async (obj) => {
        const result = await post(authRoute.verifyOtp,obj);
        return result;
    },
   
};
export default authServices

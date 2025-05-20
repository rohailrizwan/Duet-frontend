import { get, post } from "..";
import authRoute from "./route";
import webroute from "./route";

const authServices = {
    postLogin: async (obj) => {
        const result = await post(authRoute.login,obj);
        return result;
    },
    verifyOtp: async (obj) => {
        const result = await post(authRoute.verifyOtp,obj);
        return result;
    },
   
};
export default authServices

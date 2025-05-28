
import { get, gettoken, put } from "..";
import dashboardroute from "./route";



const Dashboardservice = {
    getdashboard: async () => {
        const result = await gettoken(`${dashboardroute?.getdata}` );
        return result;
    },
};

export default Dashboardservice;
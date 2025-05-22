import { post } from "..";
import UploadRoutes from "./route";

const UploadServices = {
  uploadImage: async (obj) => {
    const result = await post(UploadRoutes.uploadImage, obj);
    return result;
  },
};

export default UploadServices;
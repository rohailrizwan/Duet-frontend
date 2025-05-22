import { deletedtoken, gettoken, post, posttoken, puttoken } from "../index";
import postRoutes from "./route";


const PostService = {
    addpost: async (obj) => {
        const result = await posttoken(postRoutes?.addpost, obj);
        return result;
    },
    updatePost: async ({id,obj}) => {
        const result = await puttoken(postRoutes?.updatepost + `${id}`, obj);
        return result;
    },
    getpost: async (page,limit) => {
        const result = await gettoken(postRoutes?.getpost + `?page=${page}&limit=${limit}`);
        return result;
    },
    deletePost: async (id) => {
        const result = await deletedtoken(postRoutes?.deletepost + `/${id}`);
        return result;
    },
};

export default PostService;
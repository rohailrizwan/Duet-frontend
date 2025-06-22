import { posttoken, gettoken} from "../index";
import ChatRoutes from "./route";

const ChatServices = {
  sendChat: async (obj) => {
    const result = await posttoken(ChatRoutes.sendChat, obj);
    return result;
  },
  getChatList: async () => {
    const result = await gettoken(ChatRoutes.getChatList);
    return result;
  },
  getChatHistory: async (senderId , recieverId,page) => {
    const result = await gettoken(ChatRoutes.getChatHistory + `/${senderId}/${recieverId}?page=${page}&limit=1000`);
    return result;
  },


};

export default ChatServices;
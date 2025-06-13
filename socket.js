import io from "socket.io-client";
import { baseUrl } from "./src/Config/axios";

const socket = io(baseUrl); // Change if hosted remotely

export default socket;

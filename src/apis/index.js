
import { ErrorHandler } from "../utils/ErrorHandler.js";
import {authInstance, instance} from '../Config/axios.js'
export const get = async (endPoint, param) => {
  try {
    const result = await instance.get(endPoint, { params: param });
    if (result.status == 200) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};
export const post = async (endPoint, data) => {
  try {
    const result = await instance.post(endPoint, data);
    if (result.status == 200 || result.status == 206) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};
export const patch = async (endPoint, data) => {
  try {
    const result = await instance.patch(endPoint, data);
    if (result.status == 200) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};
export const put = async (endPoint, data) => {
  try {
    const result = await instance.put(endPoint, data);
    if (result.status == 200) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};
export const deleted = async (endPoint) => {
  try {
    const result = await instance.delete(endPoint);
    if (result.status == 200) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};


// token

export const gettoken = async (endPoint, param) => {
  try {
    const result = await authInstance.get(endPoint, { params: param });
    if (result.status == 200 || result?.status == 201) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};
export const posttoken = async (endPoint, data) => {
  try {
    const result = await authInstance.post(endPoint, data);
    if (result.status == 200 || result.status == 206 || result.status == 201) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};
export const patchtoken = async (endPoint, data) => {
  try {
    const result = await authInstance.patch(endPoint, data);
    if (result.status == 200) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};
export const puttoken = async (endPoint, data) => {
  try {
    const result = await authInstance.put(endPoint, data);
    if (result.status == 200) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};
export const deletedtoken = async (endPoint) => {
  try {
    const result = await authInstance.delete(endPoint);
    if (result.status == 200) return result.data;
    else throw result
  } catch (e) {
    throw ErrorHandler(e)
  }
};


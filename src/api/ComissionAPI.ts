import axios from "axios";
import { generateChecksum } from "../utils";
import { Item } from "../types/Item";

const ComissionAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/policy`,
});

ComissionAPI.interceptors.request.use(
  function (config) {
    const checksum = generateChecksum(config.data);
    config.headers.Authorization = checksum;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export async function getData() {
  try {
    const response = await ComissionAPI.get("/");
    if (response.status !== 200) {
      throw new Error("Some error occurred while getting data.");
    }
    return response.data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function deleteItem(id: string) {
  try {
    await ComissionAPI.delete(`/${id}`);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}

export async function updateItem(id: string, data: Item) {
  try {
    const response = await ComissionAPI.put(`/${id}`, data);
    return response.data.item;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}

export async function createItem(data: Item) {
  try {
    const response = await ComissionAPI.post("/", data);
    return response.data.item;
  } catch (error: any) {
    console.error("Error creating item:", error);
    throw error;
  }
}

export default ComissionAPI;

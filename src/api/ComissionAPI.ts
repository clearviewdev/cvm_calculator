import axios from 'axios';
import { generateChecksum } from '../utils';
import { Item } from '../types/Item';

const ComissionAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
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
    const response = await ComissionAPI.get('/policy');
    if (response.status !== 200) {
      throw new Error('Some error occurred while getting data.');
    }
    return response.data.items;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function deleteItem(id: string) {
  try {
    await ComissionAPI.delete(`/policy/${id}`);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
}

export async function updateItem(id: string, data: Item) {
  try {
    const response = await ComissionAPI.put(`/policy/${id}`, data);
    return response.data.item;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
}

export async function createItem(data: Item) {
  try {
    const response = await ComissionAPI.post('/policy/', data);
    return response.data.item;
  } catch (error: any) {
    console.error('Error creating item:', error);
    throw error;
  }
}

export async function getFeildsData(type: 'admin' | 'form') {
  try {
    const response = await ComissionAPI.get('/field', {
      params: {
        type,
      },
    });
    if (response.status !== 200) {
      throw new Error('Some error occurred while getting data.');
    }
    return response.data.items;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function updateTitle(id: string, name: string) {
  try {
    const response = await ComissionAPI.post(`/field/${id}`, { name });
    return response.data;
  } catch (error: any) {
    console.error('Error updating title:', error);
    throw error;
  }
}

export default ComissionAPI;

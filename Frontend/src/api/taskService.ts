import axios from 'axios';
import { Platform } from 'react-native';
import { io, Socket } from 'socket.io-client';
import { ITask } from '../models/Task';

const DEV_IP = '192.168.1.39';

const getBaseURL = (): string => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return `http://${DEV_IP}:3000`;
    }
    if (Platform.OS === 'ios') {
      return 'http://localhost:3000';
    }
    return 'http://localhost:3000';
  }
  return 'http://localhost:3000';
};

const BASE_URL = getBaseURL();

console.log('URL de l\'API:', BASE_URL);

export const fetchTasksAPI = async (afterDate: string): Promise<ITask[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks?after=${afterDate}`);
    return response.data;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des tâches:', error.message, 'URL:', `${BASE_URL}/tasks?after=${afterDate}`);
    throw error;
  }
};

export const simulateTasksAPI = async (): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/simulate`);
  } catch (error: any) {
    console.error('Erreur lors de la simulation:', error.message, 'URL:', `${BASE_URL}/simulate`);
    throw error;
  }
};

export const createSocket = (): Socket => {
  return io(BASE_URL);
};
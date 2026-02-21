import { useState, useEffect, useRef } from 'react';
import { ITask } from '../models/Task';
import { fetchTasksAPI, simulateTasksAPI, createSocket } from '../api/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const socketRef = useRef<ReturnType<typeof createSocket> | null>(null);

  const handleSimulate = async () => {
    try {
      await simulateTasksAPI();
    } catch (error) {
      console.error("Erreur de simulation:", error);
    }
  };

  useEffect(() => {
    const fetchInitialTasks = async () => {
      try {
        const initialTasks = await fetchTasksAPI("2000-01-01T00:00:00.000Z");
        setTasks(initialTasks);
      } catch (error) {
        console.error("Erreur lors du chargement initial des tâches:", error);
      }
    };

    fetchInitialTasks();

    const socket = createSocket();
    socketRef.current = socket;

    socket.on('newTask', (newTask: ITask) => {
      setTasks((prevTasks) => {
        const existingIds = new Set(prevTasks.map(t => t._id));
        if (!existingIds.has(newTask._id)) {
          return [...prevTasks, newTask];
        }
        return prevTasks;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { tasks, handleSimulate };
};
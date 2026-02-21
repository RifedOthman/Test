import { Server } from 'socket.io';
import Task, { ITask } from '../models/Task';

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const runSimulation = async (io: Server): Promise<void> => {
  console.log('Démarrage de la simulation');
  
  const totalTasks = 10;
  const delay = 5000;
  const users =['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9', 'user10'];
  const titles = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5', 'Task 6', 'Task 7', 'Task 8', 'Task 9', 'Task 10'];
  const statuses = ['todo', 'in_progress', 'done'];

  for (let i = 1; i <= totalTasks; i++) {
    try {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      
      const newTask = await Task.create({
        user: randomUser, 
        title: randomTitle, 
        status: randomStatus,
        createdAt: new Date()
      });
      
      const taskData = {
        _id: newTask._id.toString(),
        user: newTask.user,
        title: newTask.title,
        status: newTask.status,
        createdAt: newTask.createdAt.toISOString()
      };
      
      io.emit('newTask', taskData);
      
      console.log(`Tâche ${i}/${totalTasks} créée: [${randomStatus}] ${randomTitle} par ${randomUser}`);
      
      if (i < totalTasks) {
        await sleep(delay);
      }
    } catch (error) {
      console.error(`Erreur lors de la création de la tâche ${i}:`, error);
    }
  }
  
  console.log('Simulation terminée');
};

/**
 * Fetch tasks after a given date
 */
export const fetchTasksAfterDate = async (dateParam: string | undefined): Promise<ITask[]> => {
  const query: { createdAt?: { $gt: Date } } = {};
  
  if (dateParam) {
    const parsedDate = new Date(dateParam);
    if (!isNaN(parsedDate.getTime())) {
      query.createdAt = { $gt: parsedDate };
    }
  }

  return await Task.find(query)
    .sort({ createdAt: 1 })
    .limit(20)
    .select('user title status createdAt')
    .catch(error => {
      console.error('Erreur lors de la récupération des tâches:', error);
      return [];
    })
};
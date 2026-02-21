import { Request, Response } from 'express';
import { Server } from 'socket.io';
import * as taskService from '../services/taskService';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const after = req.query.after as string | undefined;
    if (!after) {
      res.status(400).json({ message: 'Le paramètre de date est requis' });
      return;
    }
    const tasks = await taskService.fetchTasksAfterDate(after);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

export const startSimulation = (req: Request, res: Response): void => {
  const io = req.app.get('io') as Server;
  taskService.runSimulation(io).catch(err => console.error('Erreur lors du démarrage de la simulation:', err));

  res.status(202).json({ 
    message: 'Simulation démarrée. 10 tâches seront créées en 50 secondes.' 
  });
};
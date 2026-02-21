export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface ITask {
  _id: string;
  title: string;
  status: TaskStatus;
  user: string;
  createdAt: string;
}
import { TaskStatus } from '../models/Task';

export const COLORS = {
  background: '#F7F9FC',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  primary: '#6366F1',
  
  status: {
    todo: '#9CA3AF',
    in_progress: '#3B82F6',
    done: '#10B981',
  } as Record<TaskStatus, string>
};
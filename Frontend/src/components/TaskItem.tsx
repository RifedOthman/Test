import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ITask } from '../models/Task';

interface Props {
  task: ITask;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'todo': return '#9CA3AF';
    case 'in_progress': return '#3B82F6';
    case 'done': return '#10B981';
    default: return '#FFCC00'; 
  }
};

export const TaskItem: React.FC<Props> = ({ task }) => {
  const statusColor = getStatusColor(task.status);

  const userName = task.user || 'Anonyme';
  
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <View style={[styles.container, { borderLeftColor: statusColor }]}>
      
      <Text style={styles.title} numberOfLines={2}>{task.title}</Text>
  
      <View style={styles.footer}>
  
        <View style={styles.userContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userInitial}</Text>
          </View>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: statusColor }]}>
          <Text style={styles.badgeText}>{task.status.replace('_', ' ')}</Text>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12, 
    borderWidth: 6,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 6,
   
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FFCC00',
  },
  avatarText: {
    color: '#FFCC00',
    fontSize: 12,
    fontWeight: '900',
  },
  userName: {
    color: '#999999',
    fontSize: 13,
    fontWeight: '500',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  }
});
import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from './src/hooks/useTasks';
import { TaskItem } from './src/components/TaskItem';

function MainScreen() {
  const { tasks, handleSimulate } = useTasks();
  
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mately Test</Text>
      </View>

      <FlatList
        data={[...tasks].reverse()}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TaskItem task={item} />}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Pas de tache, Lancez uen simulation</Text>
        }
      />

      <TouchableOpacity style={styles.button} onPress={handleSimulate} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Simulate Tasks</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MainScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#111111',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    color: '#FFCC00',
    letterSpacing: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyText: {
    color: '#666666',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    fontStyle: 'italic',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#FFCC00',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    
    shadowColor: '#FFCC00',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});
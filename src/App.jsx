import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskInput, setTaskInput] = useState('');
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskInput.trim() === '') return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: taskInput.trim(), completed: false },
    ]);
    setTaskInput('');
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const remainingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div style={styles.container}>
      <h1>📝 Task Manager</h1>
      <div style={styles.inputRow}>
        <input
          type="text"
          value={taskInput}
          onChange={e => setTaskInput(e.target.value)}
          placeholder="Enter a task"
          style={styles.input}
        />
        <button onClick={handleAddTask} style={styles.addButton}>
          Add Task
        </button>
      </div>

      <p>{remainingTasks} task{remainingTasks !== 1 ? 's' : ''} remaining</p>

      <ul style={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} style={styles.taskItem}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span
              style={{
                ...styles.taskText,
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => handleDeleteTask(task.id)} style={styles.deleteButton}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 500,
    margin: '2rem auto',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  inputRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    fontSize: '1rem',
  },
  addButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #eee',
  },
  taskText: {
    flex: 1,
    marginLeft: '0.5rem',
    textAlign: 'left',
  },
  deleteButton: {
    marginLeft: '1rem',
    background: 'none',
    border: 'none',
    color: 'red',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
};

export default App;

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
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>📝  My Task Manager</h1>
        <div style={styles.inputRow}>
          <input
            type="text"
            value={taskInput}
            onChange={e => setTaskInput(e.target.value)}
            placeholder="What do you need to do?"
            style={styles.input}
          />
          <button onClick={handleAddTask} style={styles.addButton}>
            Add
          </button>
        </div>

        <p style={styles.counter}>
          {remainingTasks} task{remainingTasks !== 1 ? 's' : ''} remaining
        </p>

        <ul style={styles.taskList}>
          {tasks.map(task => (
            <li key={task.id} style={styles.taskItem}>
              <label style={styles.taskLabel}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  style={styles.checkbox}
                />
                <span
                  style={{
                    ...styles.taskText,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#999' : '#333',
                  }}
                >
                  {task.text}
                </span>
              </label>
              <button onClick={() => handleDeleteTask(task.id)} style={styles.deleteButton}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#FFC0CB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  container: {
    backgroundColor: '#90D5FF',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
  },
  heading: {
    marginBottom: '1rem',
    fontSize: '1.8rem',
    color: '#333',
    textAlign: 'center',
  },
  inputRow: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border 0.2s',
  },
  addButton: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  counter: {
    fontSize: '0.95rem',
    color: '#666',
    marginBottom: '1rem',
    textAlign: 'right',
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem',
    backgroundColor: '#f1f1f5',
    borderRadius: '8px',
    marginBottom: '0.5rem',
    transition: 'background 0.3s',
  },
  taskLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: 1,
  },
  checkbox: {
    width: '18px',
    height: '18px',
  },
  taskText: {
    fontSize: '1rem',
    flex: 1,
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    color: '#e63946',
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
};

export default App;

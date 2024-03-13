import React, { useState, useEffect } from 'react';

const LocalTasker = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), description: newTask, completed: false }]);
      setNewTask('');
      setConfirmationMessage('Item added successfully!');
      setTimeout(() => setConfirmationMessage(''), 3000); // Clear message after 3 seconds
    } else {
      setConfirmationMessage('Please enter a task description.');
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteSelectedTasks = () => {
    if (selectedTasks.length > 0) {
      const updatedTasks = tasks.filter((task) => !selectedTasks.includes(task.id));
      setTasks(updatedTasks);
      setSelectedTasks([]);
      setConfirmationMessage('Selected items deleted successfully!');
      setTimeout(() => setConfirmationMessage(''), 3000); // Clear message after 3 seconds
    } else {
      setConfirmationMessage('Please select tasks to delete.');
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  const handleCheckboxChange = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
    toggleCompletion(taskId);
  };

  return (
    <div>
      <h1>Grocery Bud</h1>
      <div className="confirmation-message">{confirmationMessage}</div>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button onClick={addTask}>Add Item</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={selectedTasks.includes(task.id)}
              onChange={() => handleCheckboxChange(task.id)}
            />
            <span
              className={task.completed ? 'completed-task' : ''}
              onClick={() => toggleCompletion(task.id)}
            >
              {task.description}
            </span>
            <button onClick={() => deleteSelectedTasks()}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocalTasker;

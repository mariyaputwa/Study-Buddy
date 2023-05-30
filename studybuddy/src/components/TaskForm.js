import React, { useState } from 'react';
import axios from 'axios';

function TaskForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      name,
      description,
      dueDate,
      category,
      priorityLevel,
      isComplete: false,
    };

    try {
      const response = await axios.post('http://localhost:3000/tasks', task);
      console.log(response.data);
      // TODO: handle successful creation
      // Clear the form
      setName('');
      setDescription('');
      setDueDate('');
      setCategory('');
      setPriorityLevel('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('An error occurred while creating the task.');
      console.log(error);
    }
  };

  // The button will be disabled if required fields are not filled
  const isFormFilled = name && dueDate && category && priorityLevel;

  return (
    <form onSubmit={handleSubmit} className="mb-4">
    <div className="mb-3">
      <label className="form-label">Task Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
    </div>
    <div className="mb-3">
      <label className="form-label">Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
    </div>
    <div className="mb-3">
      <label className="form-label">Due Date</label>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="form-control" required />
    </div>
    <div className="mb-3">
      <label className="form-label">Category</label>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" required />
    </div>
    <div className="mb-3">
      <label className="form-label">Priority Level</label>
      <input type="number" value={priorityLevel} onChange={(e) => setPriorityLevel(e.target.value)} className="form-control" required />
    </div>
    <button type="submit" className="btn" disabled={!isFormFilled}>Create Task</button>
    {errorMessage && <p>{errorMessage}</p>}

    <div className="mb-3">
  <label className="form-label">Task Name</label>
  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`form-control ${name ? '' : 'is-invalid'}`} required />
  <div className="invalid-feedback">Please provide a task name.</div>
</div>

  </form>
  );
}

export default TaskForm;


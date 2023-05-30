import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async (id, isComplete) => {
    try {
      await axios.patch(`http://localhost:3000/tasks/${id}`, { isComplete });
      fetchTasks(); // Fetch the tasks again to update the list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="list-unstyled">
      {tasks.map((task) => (
        <li key={task.id} className={`p-3 mb-2 bg-light rounded ${task.isComplete ? 'complete' : ''}`}>
          <input type="checkbox" className="form-check-input me-2" checked={task.isComplete} onChange={() => handleComplete(task.id, !task.isComplete)} />
          {task.name}
          <button className="btn btn-danger btn-sm float-end">Delete</button>
          <button className="btn btn-primary btn-sm float-end me-2">Edit</button>
        </li>
      ))}
    </ul>
  );
}

<li key={task.id} className={`p-3 mb-2 bg-light rounded ${task.isComplete ? 'complete' : ''}`}>
  <input type="checkbox" className="form-check-input me-2" checked={task.isComplete} onChange={() => handleComplete(task.id, !task.isComplete)} />
  {task.name}
  <button className="btn btn-danger btn-sm float-end" onClick={() => handleDelete(task.id)}><FontAwesomeIcon icon={faTrash} /></button>
  <button className="btn btn-primary btn-sm float-end me-2" onClick={() => handleEdit(task.id)}><FontAwesomeIcon icon={faEdit} /></button>
</li>



export default TaskList;

<p>Total tasks: {tasks.length}, Completed: {tasks.filter(task => task.isComplete).length}</p>

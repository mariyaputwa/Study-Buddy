import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Additional CSS file for custom styles
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">StudyBuddy</a>
        </div>
      </nav>
      <div className="container mt-4">
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}

export default App;

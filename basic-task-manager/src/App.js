import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<TaskList />} />
                <Route path="/add-task" element={<AddTask />} />
            </Routes>
        </Router>
    );
}

export default App;

import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');  // State to manage errors
    const uid = sessionStorage.getItem("uid");

    useEffect(() => {
        if (!uid) {
            navigate("/login");
        }
    }, [navigate, uid]);

    useEffect(() => {
        if (uid) {
            const q = query(collection(db, 'tasks'), where('userId', '==', uid));
            const unsubscribe = onSnapshot(q, 
                (snapshot) => {
                    const tasksData = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setTasks(tasksData);
                }, 
                (error) => {
                    setError('Failed to fetch tasks. Please try again later.');
                    console.error('Error fetching tasks:', error);
                }
            );
            return () => unsubscribe();
        }
    }, [uid]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'tasks', id));
        } catch (error) {
            setError('Failed to delete task. Please try again later.');
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleComplete = async (id, completed) => {
        try {
            await updateDoc(doc(db, 'tasks', id), { completed: !completed });
        } catch (error) {
            setError('Failed to update task. Please try again later.');
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mt-8">
                <h2 className="text-3xl font-bold mb-6 text-center">My Tasks</h2>
                {error && (
                    <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg">
                        {error}
                    </div>
                )}
                <a href="/add-task">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mb-4">
                        Add Task
                    </button>
                </a>
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li 
                            key={task.id} 
                            className={`p-4 rounded-lg shadow-md ${task.completed ? 'bg-green-100' : 'bg-gray-50'}`}
                        >
                            <h3 className="text-xl font-semibold" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.title}
                            </h3>
                            <p className="text-gray-700">{task.description}</p>
                            <p className="text-gray-500">Due: {task.dueDate}</p>
                            <div className="mt-4 flex space-x-2">
                                <button
                                    onClick={() => handleToggleComplete(task.id, task.completed)}
                                    className={`py-2 px-4 rounded-lg ${task.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white transition duration-200`}
                                >
                                    {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskList;

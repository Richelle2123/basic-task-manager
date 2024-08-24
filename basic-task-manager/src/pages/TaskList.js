import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
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

    const handleUpdate = async () => {
        if (selectedTask) {
            try {
                await updateDoc(doc(db, 'tasks', selectedTask.id), {
                    title,
                    description,
                    dueDate
                });
                setSelectedTask(null);
                setTitle('');
                setDescription('');
                setDueDate('');
            } catch (error) {
                setError('Failed to update task. Please try again later.');
                console.error('Error updating task:', error);
            }
        }
    };

    const openUpdateForm = (task) => {
        setSelectedTask(task);
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate);
    };

    const cancelUpdate = () => {
        setSelectedTask(null);
        setTitle('');
        setDescription('');
        setDueDate('');
    };

    const handleLogout = () => {
        sessionStorage.removeItem("uid");
        navigate("/login");
    };

    return (
        <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 font-sans">
            <div className="absolute top-4 right-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-red-600 transform hover:scale-105 transition-transform duration-200"
                >
                    Logout
                </button>
            </div>

            <div className="bg-white bg-opacity-80 p-10 rounded-xl shadow-xl max-w-2xl w-full mt-12">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">My Tasks</h2>
                
                <div className="flex justify-center mb-6">
                    <a href="/add-task">
                        <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-transform duration-200">
                            Add Task
                        </button>
                    </a>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg">
                        {error}
                    </div>
                )}

                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li 
                            key={task.id} 
                            className={`p-4 rounded-lg shadow-lg transition duration-200 ${
                                task.completed ? 'bg-green-50 border-l-4 border-green-400' : 'bg-white border-l-4 border-red-400'
                            }`}
                        >
                            <h3 className="text-xl font-semibold" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.title}
                            </h3>
                            <p className="text-gray-700">{task.description}</p>
                            <p className="text-gray-500">Due: {task.dueDate}</p>
                            <div className="mt-4 flex space-x-2">
                                <button
                                    onClick={() => handleToggleComplete(task.id, task.completed)}
                                    className={`py-2 px-4 rounded-full text-white transition duration-200 ${
                                        task.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-red-500 hover:bg-red-600'
                                    } transform hover:scale-105`}
                                >
                                    {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                                </button>
                                <button
                                    onClick={() => openUpdateForm(task)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-200 transform hover:scale-105"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-200 transform hover:scale-105"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {selectedTask && (
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">Update Task</h3>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="w-full bg-red-500 text-white py-3 rounded-full shadow-lg hover:bg-red-600 transform hover:scale-105 transition-transform duration-200"
                                >
                                    Update Task
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelUpdate}
                                    className="w-full bg-gray-500 text-white py-3 rounded-full shadow-lg hover:bg-gray-600 transform hover:scale-105 transition-transform duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskList;

import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await addDoc(collection(db, 'tasks'), {
                title,
                description,
                dueDate,
                userId: auth.currentUser.uid,
                completed: false,
            });
            setSuccess('Task added successfully!');
            setTitle('');
            setDescription('');
            setDueDate('');
            navigate('/');
        } catch (error) {
            console.error('Error adding task:', error);
            setError('Failed to add task. Please try again later.');
        }
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
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Add Task</h2>
                
                <div className="flex justify-center mb-6">
                    <a href="/">
                        <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-transform duration-200">
                            Back
                        </button>
                    </a>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-lg">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-transform duration-200"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;

import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');  // State to manage errors
    const [success, setSuccess] = useState('');  // State to manage success messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear any previous error
        setSuccess('');  // Clear any previous success message
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
        } catch (error) {
            console.error('Error adding task:', error);
            setError('Failed to add task. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mt-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Add Task</h2>
                <a href="/">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mb-4">
                        Back
                    </button>
                </a>
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;

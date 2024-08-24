import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // State to hold error message
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');  // Clear previous error
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            console.error('Error registering:', error);
            setError(error.message);  // Set the error message
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 font-sans">
            <div className="bg-white bg-opacity-80 p-10 rounded-xl shadow-xl max-w-md w-full">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Register</h2>
                <form onSubmit={handleRegister} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                    {error && (
                        <div className="bg-red-100 text-red-700 p-2 rounded-lg">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-transform duration-200"
                    >
                        Register
                    </button>
                </form>
                <div className="flex justify-center mt-4">
                    <a
                        href="/login"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Already have an account? Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Register;

import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
            sessionStorage.setItem("uid", auth.currentUser.uid);
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                alert('Invalid email or password. Please try again.');
            } else {
                alert('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 font-sans">
            <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-xl max-w-sm w-full">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-transform duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="flex justify-center mt-4">
                    <a
                        href="/register"
                        className="text-sm text-orange-600 hover:underline"
                    >
                        Don't have an account? Signup
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;

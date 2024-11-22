import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', { email, password });

      if (response.data.message === 'Logged in successfully') {
        toast.success("Login successful!");
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userName', response.data.user.username); 
        setEmail('');
        setPassword('');
        navigate('/'); 
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center p-8 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg">
            Login
          </button>
          <p className="pt-4">
            Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

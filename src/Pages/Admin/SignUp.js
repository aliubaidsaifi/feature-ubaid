import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast for notifications
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/register', { 
        username,
        email,
        password,
      });

      if (response.status === 201) { 
        toast.success("Registration successful!"); 
        setUsername('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
              toast.error("Error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center p-8 bg-gray-100">
      <ToastContainer /> 
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
        
        <p className="pt-4 ">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

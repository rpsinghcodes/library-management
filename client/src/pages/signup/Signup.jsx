import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext";
import {  useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const SignupForm = () => {
    const {user, signup} = useContext(AuthContext);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: 'user',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setMessage('Registration successful!');

    setTimeout(() => {
      setMessage('');
      setFormData({
        role: 'user',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }, 3000);

    signup(formData.username, formData.email, formData.password, formData.role);
    navigate('/');
  };

  if(user.isLogedIn) {
    return navigate("/dashboard");
  }
  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Sign Up</h2>

      {message && (
        <div className="mb-6 p-4 text-green-700 bg-green-100 rounded-lg animate-fade-in">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Selector */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Username Input */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 ${
              errors.username ? 'border-red-500 ring-red-300' : 'focus:ring-blue-500'
            }`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 mt-1 animate-bounce">{errors.username}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 ${
              errors.email ? 'border-red-500 ring-red-300' : 'focus:ring-blue-500'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 mt-1 animate-bounce">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 ${
              errors.password ? 'border-red-500 ring-red-300' : 'focus:ring-blue-500'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 mt-1 animate-bounce">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 ${
              errors.confirmPassword ? 'border-red-500 ring-red-300' : 'focus:ring-blue-500'
            }`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 mt-1 animate-bounce">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Already registered? <Link to="/" className="text-blue-600 hover:underline">Login here</Link>
      </p>
    </div>
  );
};

export default SignupForm;


// export default function Signup() {
//     const {user} = useContext(AuthContext);
//     const redirect =  useNavigate();
//     const [Credential, setCredential] = useState({ username: '', email: '', password: '', role: '' });
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(Credential);
//         try {
//             const response = await fetch('http://localhost:4000/api/auth/signup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(Credential),
//             });
//             if (!response.ok) {
//                 console.log("Error");
//             }
//             const data = await response.json();
//             console.log(data);
//         } catch (error) {
//             console.log(error);
//         }

//     }
//     if(user.isLogedIn) {
//         return redirect("/dashboard");
//     }
//     return (
//         <div>
//             <p>Signup</p>
//             <p>UserName</p>
//             <select name="role" onChange={(e) => setCredential({...Credential, role: e.target.value})}>
//                 <option value="admin">Admin</option>
//                 <option value="user">User</option>
//             </select>
//             <input type="text" name="username" placeholder="Enter your username" onChange={(e) => setCredential({...Credential, username: e.target.value})}/>
//             <p>Email</p>
//             <input type="text" name="email" placeholder="Enter your email" onChange={(e) => setCredential({...Credential, email: e.target.value})}/> 
//             <p>Password</p>
//             <input type="password" name="password" placeholder="Enter your password" onChange={(e) => setCredential({...Credential, password: e.target.value})}/>
//             <button onClick={handleSubmit}>Signup</button>
//         </div>

//     )
// }
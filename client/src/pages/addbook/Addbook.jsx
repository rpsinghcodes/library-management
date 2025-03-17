import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Addbook = () => {
    console.log('hello');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publisher: '',
    year: '',
    image: '',
    genre: ''
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    

    setTimeout(() => {
      setMessage('');
      setFormData({
        title: '',
        author: '',
        description: '',
        publisher: '',
        year: '',
        image: '',
        genre: ''
      });
    }, 3000);

    const resposne = await fetch(`${import.meta.env.VITE_APP_URL}/api/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(formData)
    })
    if(resposne.ok) {
      setMessage('Book added successfully!');
    }

    const data = await resposne.json();
    console.log(data);
    alert('Book added successfully');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Add a New Book</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.keys(formData).map((field) => (
          <div key={field} className="relative">
            <label className="block text-lg font-medium text-gray-700 mb-2 capitalize">
              {field}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 ${
                errors[field] ? 'border-red-500 ring-red-300' : 'focus:ring-blue-500'
              }`}
              placeholder={`Enter ${field}`}
            />
            {errors[field] && (
              <p className="text-red-500 mt-1 animate-bounce">{errors[field]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Add Book
        </button>
      </form>
      {message && (
        <div className="mb-6 p-4 text-green-700 bg-green-100 rounded-lg animate-fade-in">
          {message}
        </div>
      )}
      <Link to="/dashboard" className='text-blue-600 hover:underline transition text-center block'>Go Back</Link>
    </div>
  );
};

export default Addbook;
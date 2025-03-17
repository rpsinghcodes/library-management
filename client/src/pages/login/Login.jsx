import { useContext, useState  } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";



const LoginForm = () => {
    const {user, login} = useContext(AuthContext);
    console.log(user);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: 'user',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    setTimeout(() => {
      setMessage('');
      setFormData({ role: 'user', email: '', password: '' });
    }, 3000);

    let res = await login(formData.email, formData.password);
    if(!res) {
        console.log('inalid credentials');
        setMessage('Invalid Credentials');
    }
  };

  if(user.isLogedIn) {
    return navigate("/dashboard");
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Login</h2>

      {message && (
        <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg animate-fade-in">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Create Account <Link to="/signup" className="text-blue-600 hover:underline">Signup here</Link>
      </p>
    </div>
  );
};

export default LoginForm;


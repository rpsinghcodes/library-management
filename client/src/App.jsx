import Dashboard from "./pages/dashboard/Dashboard"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Addbook from "./pages/addbook/Addbook"
import {Routes, Route} from 'react-router-dom';
import Detail from "./pages/detail/Detail";
function App() {

  return (
    <>
    <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addbook" element={<Addbook />} />
        <Route path="/detail/:id" element={<Detail />} />
        {/* for unknown routes   */}
        <Route path="*" element={<Login />} />
      
    </Routes>
    </>
  )
}

export default App

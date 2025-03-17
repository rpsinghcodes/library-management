import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BooksContext } from "../../context/BooksContext";

export default function Navbar({onChange}) {
    const {user} = useContext(AuthContext);
    const {updateGenre, updateAuthor, updateYear} = useContext(BooksContext);

    function logout() {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <nav className="bg-white shadow-md w-full px-6 py-4 flex items-center justify-between">
          
          <div className="text-2xl font-bold text-blue-600">BookVault</div>
    
          
          <div className="flex items-center gap-3">
            
            <select  name="genre" onClick={(e) => updateGenre(e.target.value)} className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All</option>
              <option value="self-help">Self Help</option>
              <option value="philosophy">Philosophy</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="fantasy">Fantasy</option>
              <option value="horror">Horror</option>
            </select>
    
            
            <select name="author" onClick={(e) => updateAuthor(e.target.value)} className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All</option>
              <option value="jk-rowling">J.K. Rowling</option>
              <option value="george-orwell">George Orwell</option>
              <option value="stephen-king">Stephen King</option>
            </select>
    
            
            <select name="year" onClick={(e) => updateYear(e.target.value)} className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>              
              <option value="2021">2021</option>
            </select>
          </div>
    
          
          <div className="flex-grow max-w-sm">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={onChange}
            />
          </div>
    
          
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">Welcome, {user.username}!</span>
            {user.role === "admin" && <Link to="/addbook" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
              Add Book
              </Link>}
    
            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
              Logout
            </button>
          </div>
        </nav>
      );
}


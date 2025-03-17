import Navbar from "../../components/navbar/Navbar.jsx"
import Card from "../../components/card/Card.jsx"
import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BooksContext } from "../../context/BooksContext";



export default function Dashboard() {
    const { getBooks, books, handleSearch} = useContext(BooksContext);
    const redirect = useNavigate();
    const {user} = useContext(AuthContext);
    useEffect(() => {
        getBooks();
        if(!user.isLogedIn) {
            return redirect("/");
        }
    },  [])    
    
    return (
        <div>
            <Navbar onChange={handleSearch}/>
            <div className="flex flex-wrap gap-4 justify-center py-10">
            { books.map((book) => (
                <Card key={book._id} img={book.image} title={book.title} author={book.author} id={book._id}/>
            ))}
            {books == [] && <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-center">No Books Found</h1>
            </div>}
                
            </div>
        </div>
    )
}
import { createContext, useEffect, useState } from "react";

const ENDPOINT = import.meta.env.VITE_APP_URL;
export const BooksContext = createContext({
    books: [],
    setBooks: () => {},
    addBook: () => {},
    getBooks: () => {},
    handleSearch: () => {},
    updateGenre: () => {},
    updateAuthor: () => {},
    updateYear: () => {}
});

export default function BooksProvider({ children }) {
    const [books, setBooks] = useState([]);

    const addBook = async (book) => {
        try {
            const response = await fetch(`${ENDPOINT}/api/books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify(book),
            });
            if (response.ok) {
                const data = await response.json();
                setBooks((prevBooks) => [...prevBooks, data]);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };

    function handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === "") {            
            getBooks();
        } else {
            const filteredBooks = books.filter((book) =>
                book.title.toLowerCase().includes(searchTerm)
            );
            setBooks(filteredBooks);
        }
    }

    function updateGenre(genre) {
        const filteredBooks = books.filter((book) => book.genre === genre);
        setBooks(filteredBooks);
        if(genre === "all") {
            getBooks();
        }
    }

    function updateAuthor(author) {
        const filteredBooks = books.filter((book) => book.author === author);
        setBooks(filteredBooks);
        if(author === "all") {
            getBooks();
        }
    }

    function updateYear(year) {
        const filteredBooks = books.filter((book) => book.year === year);
        setBooks(filteredBooks);
        if(year === "all") {
            getBooks();
        }
    }

  

    

    const getBooks = async () => {
        try {
            const response = await fetch(`${ENDPOINT}/api/books`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <BooksContext.Provider value={{ books, setBooks, addBook,  getBooks, handleSearch , updateGenre, updateAuthor, updateYear}}>
            {children}
        </BooksContext.Provider>
    );
}       
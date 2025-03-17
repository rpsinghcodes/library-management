import Book from "../../models/books.model.js";

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}   


const addBook = async (req, res) => {
    try {
        const {title, author, description,  publisher, year, image, genre} = req.body;
        if(!title || !author || !description || !publisher || !year || !image || !genre) {
            return res.status(400).json({message: "Please provide all the fields"});
        }
        const book = new Book({title, author, description,  publisher, year, image, genre, userId: req.userId});
        const savedBook = await book.save();
        return res.status(201).json(savedBook);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export {getAllBooks, getBookById, addBook};
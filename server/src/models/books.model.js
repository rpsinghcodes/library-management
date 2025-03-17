import mongoose from 'mongoose';

const booksSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    publisher: {type: String, required: true},
    year: {type: Number, required: true},
    image: {type: String, required: true},
    genre: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

const Book = mongoose.model('Book', booksSchema);

export default Book;
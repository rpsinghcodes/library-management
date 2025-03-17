import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
const ENDPOINT = import.meta.env.VITE_APP_URL;
const BookDetail = () => {
    const { id } = useParams();

    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`${ENDPOINT}/api/books/${id}`);
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        if (id) {
            fetchBook();
        }
    }, [id]);

    if (!book) {
        return <div className="flex items-center justify-center min-h-screen text-xl">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
        <Link to="/dashboard" className='mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'>Go Back</Link>
            

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-96 object-cover"
                />

                <div className="p-8">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">{book.title}</h1>
                    <p className="text-lg text-gray-700 mb-4">{book.description}</p>

                    <div className="mt-4">
                        <p className="text-gray-600"><strong>Author:</strong> {book.author}</p>
                        <p className="text-gray-600"><strong>Published Year:</strong> {book.year}</p>
                        <p className="text-gray-600"><strong>Genre:</strong> {book.genre}</p>
                        <p className="text-gray-600"><strong>Publisher:</strong> {book.publisher}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;

import { useState } from 'react';

const SuccessModal = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full transform transition-transform duration-500 ${isOpen ? 'scale-100' : 'scale-90'}">
                <h2 className="text-3xl font-extrabold text-green-600 mb-4 text-center">Success!</h2>
                <p className="text-lg text-gray-700 mb-6 text-center">Book added successfully.</p>

                <button
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const AddBookPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddBook = async () => {
        // Simulate a successful book addition
        setIsModalOpen(true);

        // Automatically close modal after 3 seconds
        setTimeout(() => setIsModalOpen(false), 3000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <button
                onClick={handleAddBook}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Add Book
            </button>

            <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default AddBookPage;

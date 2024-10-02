import axios from 'axios';
import { useState } from 'react';

function AddItem() {
    const [product, setProduct] = useState({
        name: '',
        model: '',
        suppliers: '',
        date: '',
        quantity: '',
        price: '',
        details: '',
        imageUrl: '', // Add imageUrl to the state
    });

    const [message, setMessage] = useState('');  // State for success/error messages
    const [isError, setIsError] = useState(false);  // State to track if it's an error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');  // Clear any existing messages

        try {
            const response = await axios.post('http://localhost:5000/api/products', product);
            console.log('Product added:', response.data);

            // Set success message
            setIsError(false);
            setMessage('Product added successfully!');

            // Clear form after submission
            setProduct({
                name: '',
                model: '',
                suppliers: '',
                date: '',
                quantity: '',
                price: '',
                details: '',
                imageUrl: '', // Reset imageUrl as well
            });
        } catch (error) {
            console.error('Error adding product:', error);

            // Set error message
            setIsError(true);
            setMessage('Error adding product. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            
            {/* Message display for success or error */}
            {message && (
                <div
                    className={`mb-4 text-center py-2 px-4 rounded ${
                        isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}
                >
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="model">Product Model</label>
                    <input
                        type="text"
                        name="model"
                        id="model"
                        value={product.model}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="suppliers">Suppliers</label>
                    <input
                        type="text"
                        name="suppliers"
                        id="suppliers"
                        value={product.suppliers}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">Date</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={product.date}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="details">Details</label>
                    <textarea
                        name="details"
                        id="details"
                        value={product.details}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        value={product.imageUrl}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default AddItem;

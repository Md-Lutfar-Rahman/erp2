import { useEffect, useState } from 'react';
import axios from 'axios';

function TotalProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        _id: '', // Include the ID for editing
        name: '',
        description: '',
        quantity: 0,
        price: 0,
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                console.log('Fetched Products:', response.data); // Debugging log
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.response ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Delete product function
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
        } catch (err) {
            console.error('Error deleting product:', err);
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    // Open modal to edit product
    const openEditModal = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
        console.log('Editing Product:', product); // Debugging log
    };

    // Handle form submission for editing
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting Edit:', currentProduct); // Debugging log
        try {
            const response = await axios.put(`http://localhost:3000/products/${currentProduct._id}`, {
                name: currentProduct.name,
                description: currentProduct.description,
                quantity: currentProduct.quantity,
                price: currentProduct.price,
            });
            console.log('Update Response:', response.data); // Debugging log
            // Update the product in the list
            setProducts(products.map((product) => (product._id === response.data._id ? response.data : product)));
            setIsModalOpen(false);
            resetCurrentProduct(); // Reset current product after successful update
        } catch (err) {
            console.error('Error updating product:', err);
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    // Reset current product state
    const resetCurrentProduct = () => {
        setCurrentProduct({ _id: '', name: '', description: '', quantity: 0, price: 0 });
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        resetCurrentProduct();
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <div className="text-red-500">
                <p>Error fetching products: {error}</p>
                <p>Check if the server is running and the API endpoint is correct.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 p-4 bg-white shadow-md rounded">
            <h2 className="text-2xl font-semibold mb-4">Total Products</h2>
            {products.length === 0 ? (
                <p className="text-gray-500">No products available.</p>
            ) : (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Description</th>
                            <th className="py-2 px-4 border">Quantity</th>
                            <th className="py-2 px-4 border">Price</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="py-2 px-4 border">{product.name}</td>
                                <td className="py-2 px-4 border">{product.details}</td>
                                <td className="py-2 px-4 border">{product.quantity}</td>
                                <td className="py-2 px-4 border">${product.price}</td>
                                <td className="py-2 px-4 border">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => openEditModal(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => deleteProduct(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal for editing product */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded shadow-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={currentProduct.name}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    value={currentProduct.description}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    value={currentProduct.quantity}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: parseInt(e.target.value) })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    value={currentProduct.price}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TotalProducts;

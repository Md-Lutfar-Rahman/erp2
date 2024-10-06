import { useEffect, useState } from 'react';
import axios from 'axios';

function TotalProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        _id: '',
        name: '',
        model: '',
        suppliers: '',
        date: '',
        quantity: 0,
        price: 0,
        details: '', // New field
        imageUrl: '' // New field
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [expandedDetails, setExpandedDetails] = useState({}); // Track which product's details are expanded

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                console.log('Fetched Products:', response.data);
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

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
            setSuccessMessage('Product deleted successfully!');
        } catch (err) {
            console.error('Error deleting product:', err);
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
        setError(null);
        setSuccessMessage(null);
        console.log('Editing Product:', product);
    };

    const openDeleteConfirmation = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            deleteProduct(productToDelete._id);
        }
        closeDeleteModal();
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting Edit:', currentProduct);
        if (currentProduct.name === '' || currentProduct.price <= 0 || currentProduct.quantity < 0) {
            setError('Please fill out all fields correctly.');
            setSuccessMessage(null);
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/products/${currentProduct._id}`, {
                name: currentProduct.name,
                model: currentProduct.model,
                suppliers: currentProduct.suppliers,
                date: currentProduct.date,
                quantity: currentProduct.quantity,
                price: currentProduct.price,
                details: currentProduct.details, // Updated field
                imageUrl: currentProduct.imageUrl // Updated field
            });
            console.log('Update Response:', response.data);

            setProducts(products.map((product) => (product._id === response.data._id ? response.data : product)));
            setSuccessMessage('Product updated successfully!');
            setError(null);

            setTimeout(() => {
                closeModal();
            }, 2000);
        } catch (err) {
            console.error('Error updating product:', err);
            setError(err.response ? err.response.data.message : err.message);
            setSuccessMessage(null);
        }
    };

    const resetCurrentProduct = () => {
        setCurrentProduct({ _id: '', name: '', model: '', suppliers: '', date: '', quantity: 0, price: 0, details: '', imageUrl: '' });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetCurrentProduct();
        setError(null);
        setSuccessMessage(null);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const toggleDetails = (productId) => {
        setExpandedDetails((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    const truncateDetails = (details, wordLimit = 5) => {
        const words = details.split(' ');
        if (words.length <= wordLimit) {
            return details;
        }
        return `${words.slice(0, wordLimit).join(' ')}...`;
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error && !isModalOpen) {
        return (
            <div className="text-red-500">
                <p>Error fetching products: {error}</p>
                <p>Check if the server is running and the API endpoint is correct.</p>
            </div>
        );
    }

    return (
        <div className="max-w-8xl mx-auto mt-10 p-4 bg-white shadow-md rounded">
            <h2 className="text-2xl font-semibold mb-4">Total Products</h2>
            {products.length === 0 ? (
                <p className="text-gray-500">No products available.</p>
            ) : (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Model</th>
                            <th className="py-2 px-4 border">Suppliers</th>
                            <th className="py-2 px-4 border">Date</th>
                            <th className="py-2 px-4 border">Quantity</th>
                            <th className="py-2 px-4 border">Price</th>
                            <th className="py-2 px-4 border w-1/5">Details</th> {/* Adjust width here */}
                            <th className="py-2 px-4 border">Image</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="py-2 px-4 border">{product.name}</td>
                                <td className="py-2 px-4 border">{product.model}</td>
                                <td className="py-2 px-4 border">{product.suppliers}</td>
                                <td className="py-2 px-4 border">{product.date}</td>
                                <td className="py-2 px-4 border">{product.quantity}</td>
                                <td className="py-2 px-4 border">BDT &#2547; &nbsp;{product.price}</td>
                                <td className="py-2 px-4 border">
                                    {expandedDetails[product._id]
                                        ? product.details
                                        : truncateDetails(product.details)}
                                    <button
                                        className="text-blue-500 ml-2"
                                        onClick={() => toggleDetails(product._id)}
                                    >
                                        {expandedDetails[product._id] ? 'Read less' : 'Read more...'}
                                    </button>
                                </td>
                                <td className="py-2 px-4 border">
                                    {product.imageUrl && (
                                        <img src={product.imageUrl} alt={product.name} className="h-16 w-16 object-cover" />
                                    )}
                                </td>
                                <td className="py-2 px-4 border">
                                    <div className="flex space-x-2"> {/* Use flex for alignment */}
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                            onClick={() => openEditModal(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => openDeleteConfirmation(product)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal for editing product */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded shadow-lg p-6 w-96 relative">
                        <h3 className="text-lg font-semibold mb-4">Edit Product</h3>

                        {/* Success and error messages */}
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Name</label>
                                <input
                                    type="text"
                                    value={currentProduct.name}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                    className="border rounded w-full px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Model</label>
                                <input
                                    type="text"
                                    value={currentProduct.model}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, model: e.target.value })}
                                    className="border rounded w-full px-3 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Suppliers</label>
                                <input
                                    type="text"
                                    value={currentProduct.suppliers}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, suppliers: e.target.value })}
                                    className="border rounded w-full px-3 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Date</label>
                                <input
                                    type="date"
                                    value={currentProduct.date}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, date: e.target.value })}
                                    className="border rounded w-full px-3 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Quantity</label>
                                <input
                                    type="number"
                                    value={currentProduct.quantity}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: e.target.value })}
                                    className="border rounded w-full px-3 py-2"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Price</label>
                                <input
                                    type="number"
                                    value={currentProduct.price}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                    className="border rounded w-full px-3 py-2"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Details</label>
                                <textarea
                                    value={currentProduct.details}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, details: e.target.value })}
                                    className="border rounded w-full px-3 py-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Image URL</label>
                                <input
                                    type="text"
                                    value={currentProduct.imageUrl}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })}
                                    className="border rounded w-full px-3 py-2"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                                <button type="button" onClick={closeModal} className="ml-2 bg-gray-300 px-4 py-2 rounded">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded shadow-lg p-6 w-96 relative">
                        <h3 className="text-lg font-semibold mb-4">Delete Product</h3>
                        <p>Are you sure you want to delete {productToDelete?.name}?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            <button onClick={closeDeleteModal} className="ml-2 bg-gray-300 px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TotalProducts;

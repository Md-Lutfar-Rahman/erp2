import { useEffect, useState } from 'react';
import axios from 'axios';

function TotalProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch products from the backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products'); // Ensure your server runs on the correct port
                setProducts(response.data); // Update the state with the fetched data
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err); // Log the error for debugging
                setError(err.response ? err.response.data.message : err.message); // Display error details
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product._id} className="border p-4 rounded-md shadow-sm bg-gray-100">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-gray-700">{product.description}</p> {/* Adjust based on your data structure */}
                            <p className="mt-2">Quantity: {product.quantity}</p>
                            <p className="font-bold">Price: ${product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TotalProducts;

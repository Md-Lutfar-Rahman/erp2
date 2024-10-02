import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';  // Import axios for making API requests

function Home() {
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(true);  // Loading state to show when fetching data
    const [error, setError] = useState(null);  // Error state to handle any issues

    useEffect(() => {
        // Fetch total number of products from the server
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products'); // Adjust API URL if needed
                setTotalProducts(response.data.length);  // Set total products based on the data length
                setLoading(false);  // Data fetching complete
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.response ? err.response.data.message : err.message);
                setLoading(false);  // Data fetching complete (even if failed)
            }
        };

        fetchProducts();  // Call the function to fetch products
    }, []);  // Empty dependency array means it runs once on component mount

    // Display loading state while fetching the total products
    if (loading) {
        return <p>Loading...</p>;
    }

    // Display error message if there's a problem fetching the products
    if (error) {
        return (
            <div className="text-red-500">
                <p>Error fetching total products: {error}</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 cursor-pointer">
                    <Link to="/task-crm" className="block w-full">Task CRM</Link>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 cursor-pointer">
                    <h2 className="text-2xl font-semibold mb-4">Total Products: {totalProducts}</h2>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 cursor-pointer">
                    <Link to="/projects" className="block w-full">Projects</Link>
                </div>
                <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md hover:bg-purple-600 cursor-pointer">
                    <Link to="/groups" className="block w-full">Groups</Link>
                </div>
                <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:bg-yellow-600 cursor-pointer">
                    <Link to="/finance" className="block w-full">Finance</Link>
                </div>
                <div className="bg-red-500 text-white p-6 rounded-lg shadow-md hover:bg-red-600 cursor-pointer">
                    <Link to="/team" className="block w-full">Team</Link>
                </div>
                <div className="bg-indigo-500 text-white p-6 rounded-lg shadow-md hover:bg-indigo-600 cursor-pointer">
                    <Link to="/orders" className="block w-full">Orders</Link>
                </div>
                <div className="bg-pink-500 text-white p-6 rounded-lg shadow-md hover:bg-pink-600 cursor-pointer">
                    <Link to="/incomes" className="block w-full">Incomes</Link>
                </div>
                <div className="bg-gray-500 text-white p-6 rounded-lg shadow-md hover:bg-gray-600 cursor-pointer">
                    <Link to="/status" className="block w-full">Status</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;

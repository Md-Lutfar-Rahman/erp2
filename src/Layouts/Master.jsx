// import React from 'react'
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Make sure this path is correct
import { signOut } from "firebase/auth"; // Import the signOut function
import Navbar from "../components/Navbar/Navbar";

function Master() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign the user out
            navigate("/"); // Redirect to login page after logout
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    // Get the current user from Firebase Auth
    const user = auth.currentUser;

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white h-full fixed">
                <div className="p-4 text-lg font-semibold border-b border-gray-700">
                    Sidebar Title
                </div>
                <div className="flex items-center p-4 border-b border-gray-700">
                    {user?.photoURL && (
                        <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-10 h-10 rounded-full mr-2"
                        />
                    )}
                    <span>{user?.displayName || "Guest"}</span>
                </div>
                <ul className="mt-4 space-y-2">
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="#" className="block w-full flex items-center">
                            <span className="mr-2">🏠</span> {/* Optional icon for Home */}
                            Home
                        </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="task-crm" className="block w-full">Task CRM</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="courses" className="block w-full">Courses</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="totalproducts" className="block w-full">Total Products</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="projects" className="block w-full">Projects</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="groups" className="block w-full">Groups</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="finance" className="block w-full">Finance</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="team" className="block w-full">Team</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="orders" className="block w-full">Orders</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="incomes" className="block w-full">Incomes</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="status" className="block w-full">Status</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="users" className="block w-full">Users</Link>
                    </li>
                    {/* Logout Button */}
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
                        <span className="block w-full">Logout</span>
                    </li>
                </ul>
            </div>

            {/* Main Content with Top Bar */}
            <div className="ml-64 flex-1 flex flex-col">
                {/* Top Bar (Navbar) */}
                <Navbar />

                {/* Main Content Area */}
                <div className="mt-16 p-6 bg-gray-100 flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Master;

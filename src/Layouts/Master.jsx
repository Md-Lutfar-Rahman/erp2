// import React from 'react'
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function Master() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white h-full fixed">
                <div className="p-4 text-lg font-semibold border-b border-gray-700">
                    Sidebar Title
                </div>
                <ul className="mt-4 space-y-2">
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="/" className="block w-full">Home</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="/task-crm" className="block w-full">Task CRM</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="/projects" className="block w-full">Projects</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="/groups" className="block w-full">Groups</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="/finance" className="block w-full">Finance</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="/team" className="block w-full">Team</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="/orders" className="block w-full">Orders</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="/incomes" className="block w-full">Incomes</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <Link to="/status" className="block w-full">Status</Link>
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

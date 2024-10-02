// import React from 'react'

import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="p-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 cursor-pointer">
                <Link to="/task-crm" className="block w-full">Task CRM</Link>
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

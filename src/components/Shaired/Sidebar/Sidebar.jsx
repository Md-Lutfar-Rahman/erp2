import {Link} from 'react'

function Sidebar() {
    return (
        <div>
           
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
                        <Link to="/totalproducts" className="block w-full">Total Products</Link>
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
    )
}

export default Sidebar

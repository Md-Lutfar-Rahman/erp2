
function Navbar() {
    return (
        <div className="bg-gray-400 text-white h-16 w-full fixed top-0 left-64 flex items-center justify-between px-6 shadow-md z-10">
            <ul className="flex space-x-4">
                <li className="cursor-pointer bg-orange-600 px-6 py-4 hover:text-blue-500">Add Item</li>
                <li className="cursor-pointer bg-orange-600 px-6 py-4 hover:text-blue-500">About</li>
                <li className="cursor-pointer bg-orange-600 px-6 py-4 hover:text-blue-500">Content</li>
                <li className="cursor-pointer bg-orange-600 px-6 py-4 hover:text-blue-500">Test</li>
             </ul>
        </div>
    );
}

export default Navbar;

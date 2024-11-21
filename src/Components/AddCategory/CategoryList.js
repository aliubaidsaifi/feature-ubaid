import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryList = ({ setEditingCategory, categories, fetchCategories }) => {

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}`);
      fetchCategories(); 
      toast.success('Deleted successfully!')
    } catch (error) {
      console.log('Error deleting category', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Category List</h2>
      {categories.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b-2">Name</th>
              <th className="py-3 px-4 border-b-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{category.name}</td>
                <td className="py-3 px-4 border-b flex space-x-2">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="py-1 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">No categories found.</p>
      )}
    </div>
  );
};

export default CategoryList;


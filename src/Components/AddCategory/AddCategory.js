import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = ({ editingCategory, setEditingCategory, fetchCategories }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
    } else {
      setName('');
    }
  }, [editingCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (editingCategory) {
        await axios.put(`http://localhost:8000/api/categories/${editingCategory._id}`, { name }); 
        toast.success('Category updated successfully!');
        setEditingCategory(null);
      } else {
        await axios.post('http://localhost:8000/api/categories/add', { name });
        toast.success("Category added successfully!");
        setName('');
      }
      fetchCategories(); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error || "Duplicate category name!");
      } else {
        toast.error("Error adding/updating category.");
      }
    }
  };
  const handleCancel = () => {
    setName('');
    setEditingCategory(null);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {editingCategory ? "Edit Category" : "Add New Category"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="py-2 px-5 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            {editingCategory ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;


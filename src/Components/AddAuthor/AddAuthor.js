import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAuthor = ({ editingAuthor, setEditingAuthor, fetchAuthors }) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (editingAuthor) {
      setName(editingAuthor.name);
      setBio(editingAuthor.bio);
    } else {
      setName('');
      setBio('');
    }
  }, [editingAuthor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingAuthor) {
      try {
        await axios.put(`http://localhost:8000/api/authors/${editingAuthor._id}`, { name, bio });
        toast.success("Author updated successfully!");
        setEditingAuthor(null);
        fetchAuthors();
      } catch (error) {
        toast.error("Error updating author.");
      }
    } else {
      try {
        await axios.post('http://localhost:8000/api/authors/add', { name, bio });
        toast.success("Author added successfully!");
        fetchAuthors();
      } catch (error) {
        toast.error("Error adding author.");
      }
    }
    setName('');
    setBio('');
  };

  const handleCancel = () => {
    setName('');
    setBio('');
    setEditingAuthor(null); 
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">{editingAuthor ? "Edit Author" : "Add New Author"}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Author Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />

        <textarea
          placeholder="Author Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none"
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
            {editingAuthor ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAuthor;

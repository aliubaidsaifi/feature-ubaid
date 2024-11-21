import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = ({ editingBook, setEditingBook, fetchBooks }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(null);
  const [author, setAuthor] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isbn, setIsbn] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost:8000/api/categories');
        const authorResponse = await axios.get('http://localhost:8000/api/authors');
        setCategories(categoryResponse.data.map(cat => ({ value: cat._id, label: cat.name })));
        setAuthors(authorResponse.data.map(auth => ({ value: auth._id, label: auth.name })));
      } catch (error) {
        toast.error("Error fetching categories or authors.");
      }
    };
    fetchData();

    if (editingBook) {
      setTitle(editingBook.title);
      setCategory({ value: editingBook.category?._id || editingBook.category, label: editingBook.category?.name });
      setAuthor({ value: editingBook.author?._id || editingBook.author, label: editingBook.author?.name });
      setDescription(editingBook.description);
      setPrice(editingBook.price || '');
      setIsbn(editingBook.isbn);
      setCoverImage(editingBook.coverImage);
    } else {
      resetFields();
    }
  }, [editingBook]);

  const resetFields = () => {
    setTitle('');
    setCategory(null);
    setAuthor(null);
    setDescription('');
    setPrice('');
    setIsbn('');
    setCoverImage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(price) > 100000) {
      toast.error("Price cannot exceed 1,00,000.");
      return;
    }
    if (isbn.length > 15) {
      toast.error("ISBN cannot exceed 15 characters.");
      return;
    }

    const bookData = {
      title,
      category: category ? category.value : '',
      author: author ? author.value : '',
      description,
      price,
      isbn,
      coverImage
    };

    try {
      if (editingBook) {
        await axios.put(`http://localhost:8000/api/books/${editingBook._id}`, bookData);
        toast.success("Book updated successfully!");
      } else {
        await axios.post('http://localhost:8000/api/books/add', bookData);
        toast.success("Book added successfully!");
      }
      fetchBooks();
      resetFields();
      setEditingBook(null);
    } catch (error) {
      toast.error("Error adding/updating book.");
    }
  };

  const handleCancel = () => {
    resetFields();
    setEditingBook(null);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {editingBook ? "Edit Book" : "Add New Book"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
        <Select
          options={categories}
          value={category}
          onChange={setCategory}
          placeholder="Select Category"
          isSearchable
          className="w-full"
        />
        <Select
          options={authors}
          value={author}
          onChange={setAuthor}
          placeholder="Select Author"
          isSearchable
          className="w-full"
        />

        <textarea
          placeholder="Description"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none"
        />

        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value || '00')}
            required
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="ISBN"
            value={isbn || ''}
            onChange={(e) => setIsbn(e.target.value)}
            required
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        <input
          type="text"
          placeholder="Cover Image URL"
          value={coverImage || ''}
          onChange={(e) => setCoverImage(e.target.value)}
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
            {editingBook ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;

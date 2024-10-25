import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddBookModule.css";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isbn, setIsbn] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:8000/api/categories"
        );
        const authorResponse = await axios.get(
          "http://localhost:8000/api/authors"
        );
        setCategories(categoryResponse.data);
        setAuthors(authorResponse.data);
      } catch (error) {
        console.error("Error fetching categories or authors:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title,
      category,
      author,
      description,
      price,
      isbn,
      coverImage,
    };

    try {
      await axios.post("http://localhost:8000/api/books/add", newBook);
      alert("Book added successfully!");
      setTitle("");
      setCategory("");
      setAuthor("");
      setDescription("");
      setPrice("");
      setIsbn("");
      setCoverImage("");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="addBookForm">
      <h2 className="formTitle">Add New Book</h2>

      <div className="formRow">
        <input
          type="text"
          placeholder="Enter the book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="inputField"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="selectField"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="formRow">
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="selectField"
        >
          <option value="">Select Author</option>
          {authors.map((auth) => (
            <option key={auth._id} value={auth._id}>
              {auth.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Enter the price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="inputField"
        />
      </div>

      <div className="formRow">
        <input
          type="text"
          placeholder="Enter the ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
          className="inputField"
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="inputField"
        />
      </div>
      <textarea
        placeholder="Enter the description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="textArea"
      />

      <button type="submit" className="submitButton">
        Add Book
      </button>
    </form>
  );
};

export default AddBook;

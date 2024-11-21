import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddBook from '../../Components/AddBook/AddBook'
import BookList from '../../Components/AddBook/BookList'

const Book = () => {
  const [editingBook, setEditingBook] = useState(null);
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/books/');
      setBooks(response.data);
    } catch (error) {
      console.log('Error fetching authors', error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <AddBook 
          editingBook={editingBook}
          setEditingBook = {setEditingBook}
          fetchBooks = {fetchBooks}
        />
      </div>
      <div>
        <BookList 
          setEditingBook = {setEditingBook}
          books={books}
          fetchBooks={fetchBooks}
        />
      </div>
    </div>
  )
}

export default Book

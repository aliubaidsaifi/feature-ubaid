import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAuthor from '../../Components/AddAuthor/AddAuthor';
import AuthorList from '../../Components/AddAuthor/AuthorList';

const Author = () => {
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/authors/');
      setAuthors(response.data);
    } catch (error) {
      console.log('Error fetching authors', error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <AddAuthor 
        editingAuthor={editingAuthor}
         setEditingAuthor={setEditingAuthor}
         fetchAuthors = {fetchAuthors}
          />
      </div>
      <div>
        <AuthorList 
        setEditingAuthor={setEditingAuthor}
        authors={authors} 
        fetchAuthors={fetchAuthors}
        />
      </div>
    </div>
  );
};

export default Author;

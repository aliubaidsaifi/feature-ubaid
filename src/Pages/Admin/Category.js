import React, { useState, useEffect } from 'react';
import AddCategory from '../../Components/AddCategory/AddCategory';
import CategoryList from '../../Components/AddCategory/CategoryList';
import axios from 'axios';

const Category = () => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.log('Error fetching categories', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <AddCategory
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
          fetchCategories={fetchCategories}
        />
      </div>
      <div>
        <CategoryList
          setEditingCategory={setEditingCategory}
          categories={categories}
          fetchCategories={fetchCategories} 
        />
      </div>
    </div>
  );
};

export default Category;

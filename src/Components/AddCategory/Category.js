import React, { useState } from 'react'
import axios from 'axios'
import './Category.css'


const Category = () => {

  const [name, setName] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const newCategory = {name};
    try {
      const response = await axios.post('http://localhost:8000/api/categories/add', newCategory);
      alert("Category added successfully!");
      setName('');
    } catch (error) {
      console.log("Error in adding category");
      
    }
  }
  return (

    <form onSubmit={handleSubmit} className='container'>
        <input
          type='text'
          placeholder='Name'
          id='categoryName'
          value={name}
          onChange={(e)=> setName(e.target.value)}
          required
          className='input'
        />
        <button type='submit' className='button2'>Add Category</button>
        
    </form>
  ) 
}

export default Category

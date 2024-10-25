import React, { useState } from 'react'
import axios from 'axios'
import './Author.css'


const Author = () => {

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const newAuthor = {name, bio};
    try {
      const response = await axios.post('http://localhost:8000/api/authors/add', newAuthor);
      alert("Author added successfully!");
      setName('');
      setBio('');
    } catch (error) {
      console.log("Error in adding author");
      
    }
  }
  return (

    <form onSubmit={handleSubmit} className='formContainer'>
        <input
          type='text'
          placeholder='Name'
          id='authorName'
          value={name}
          onChange={(e)=> setName(e.target.value)}
          required
          className='inputs'
        />
        <input
          type='text'
          placeholder='Bio'
          id='authorBio'
          value={bio}
          onChange={(e)=> setBio(e.target.value)}
          required
           className='inputs'
        />
        <button type='submit' className='button'>Add Author</button>
       <div></div> 
    </form>
  ) 
}

export default Author

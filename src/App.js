import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Author from './Pages/Admin/Author';
import Book from './Pages/Admin/Book';
import Category from './Pages/Admin/Category';
import Login from './Pages/Admin/Login';
import SignUp from './Pages/Admin/SignUp';
import Dashboard from './Pages/Admin/Dashboard'


const App = () => {
    return (
        <div>
        <Dashboard>
        <Routes>
            <Route path='/author' element={<Author/>}/>
            <Route path='/category' element={<Category/>}/>
            <Route path='/book' element={<Book/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>           
        </Routes>
        </Dashboard>
        </div>
    );
};

export default App;

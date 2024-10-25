// App.js
import React from 'react';
 import {Routes, Route} from 'react-router-dom';
 import Navbar from './Components/Navbar';
import Admin from './Pages/Admin';
import Books from './Pages/Books';


const App = () => {
    return (
        <div>
    
        <Navbar/>
        <Routes>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/books' element={<Books/>}/>
        </Routes>
        </div>
    );
};

export default App;

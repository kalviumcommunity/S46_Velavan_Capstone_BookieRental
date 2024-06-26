import React from 'react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import logo from '../assets/1.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

  const Username = Cookies.get('Username');
  const logOut = () => {
    Cookies.remove('Username')
    Cookies.remove('Token')
  }
  const [books , setBooks] = useState([]);
  const [errMessage , setErrMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/books')
    .then( (res) => {setBooks(res.data)} )
    .catch( (err) => {console.log(err) , setErrMessage(err)} )
  } , [books] )
    
  return (
    <>
      
      <div className='navbar sticky top-0 flex items-center justify-between bg-red-300 h-[6.5rem] border-b-4 border-red-500'>
    
        <img src={logo} className="h-44 w-44" alt="Logo" />

        {Username && <Link to='shelf'><span className='text-red-600 font-semibold text-lg'>Shelf</span></Link>}

        <input type="text" placeholder='Search...' className="px-2 py-1 bg-white text-red-500 rounded-xl focus:outline-none text-center w-64"/>

        {Username && <Link to='/chats'><span className='text-red-600 font-semibold text-lg'>Chats</span></Link>}

        {Username ? <button className="bg-white hover:bg-red-600 hover:text-white text-red-600 font-bold px-4 py-2 rounded-xl w-28 m-7" onClick={logOut}>LogOut</button>
        : <Link to='/login'>
        <button className="bg-white hover:bg-red-600 hover:text-white text-red-600 font-bold px-4 py-2 rounded-xl w-28 m-7">
        LogIn
        </button></Link>}
      
      </div>

      <div className='w-100 h-screen bg-red-200 flex items-center justify-between flex-wrap'>
        
        {errMessage ? 
        
          (<div style={{display:'flex',flexDirection:'column',height:'7vh',alignItems:'center'}}>
          <h4>{errMessage}</h4>
          <h5>Please Log out and try logging in again.</h5>
          </div>) :
        
          (books.map((book) => {
            return (
              <div className='flex flex-col items-center justify-between h-56 w-56' key={book._id}>
                <img src={book.image} className="h-48 w-44 rounded-lg" />
                <h3 className='text-lg font-medium'>{book.title}</h3>
              </div>
            )
          }))

        }

      </div>

    </>
  )
}

export default Home;
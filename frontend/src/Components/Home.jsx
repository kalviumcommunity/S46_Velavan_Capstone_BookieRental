import React from 'react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import logo from '../assets/1.png';
import { Link } from 'react-router-dom';

const Home = () => {

  const Username = Cookies.get('Username');
  const logOut = () => {
    Cookies.remove('Username')
  }
    
  return (
    <>
      
      <div className='navbar flex items-center justify-between bg-red-300 h-[6.5rem] border-b-4 border-red-500'>
    
        <img src={logo} className="h-44 w-44" alt="Logo" />

        <input type="text" placeholder='Search...' className="px-2 py-1 bg-white text-red-500 rounded-xl focus:outline-none text-center w-64"/>

        {Username ? <button className="bg-white hover:bg-red-600 hover:text-white text-red-600 font-bold px-4 py-2 rounded-xl w-28 m-7" onClick={logOut}>LogOut</button>
        : <Link to='/login'>
        <button className="bg-white hover:bg-red-600 hover:text-white text-red-600 font-bold px-4 py-2 rounded-xl w-28 m-7">
        LogIn
        </button></Link>}
      
      </div>

      <div className='w-screen h-[85.5dvh] bg-red-200'>
        <h1 className='text-center text-4xl font-bold'>Welcome to BookieRental</h1>
        <p className='text-center text-xl font-bold mt-5'>Find your next book</p>
        <p className='text-center text-xl font-bold mt-5'>Rent your favourite books</p>
        <p className='text-center text-xl font-bold mt-5'>And more...</p>
        <p className='text-center text-xl font-bold mt-5'>Enjoy your stay</p>
        <p className='text-center text-xl font-bold mt-5'>And don't forget to rate us</p>
      </div>

    </>
  )
}

export default Home

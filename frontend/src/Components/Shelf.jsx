import React from 'react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import logo from '../assets/1.png';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';

const Shelf = () => {

  const Username = Cookies.get('Username');
  const navigate = useNavigate();
  const logOut = () => {
    Cookies.remove('Username')
    Cookies.remove('Token')
    navigate('/')
  }
  const [books , setBooks] = useState([]);
  const [errMessage , setErrMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/books')
    .then( (res) => {setBooks(res.data)} )
    .catch( (err) => {console.log(err) , setErrMessage(err)} )
  } , [books] )

  const filteredBooks = books.filter((book) => book.user === Username);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/books/'+id,{headers : {Authorization: `Bearer ${Cookies.get('Token')}`}})
    .then( (res)=> {console.log(res.data)} )
    .catch( (err) => {console.log(err)} )
  }

  return (
    <>
      
      <div className='navbar sticky top-0 flex items-center justify-between bg-red-300 h-[6.5rem] border-b-4 border-red-500'>
    
        <Link to='/'><img src={logo} className="h-44 w-44" alt="Logo" /></Link>

        <Link to='/'><span className='text-red-600 font-semibold text-lg'>Home</span></Link>

        <input type="text" placeholder='Search...' className="px-2 py-1 bg-white text-red-500 rounded-xl focus:outline-none text-center w-64"/>

        {Username && <Link to='/chats'><span className='text-red-600 font-semibold text-lg'>Chats</span></Link>}

        <button className="bg-white hover:bg-red-600 hover:text-white text-red-600 font-bold px-4 py-2 rounded-xl w-28 m-7" onClick={logOut}>LogOut</button>
      
      </div>

      {errMessage ? 
        
        (<div style={{display:'flex',flexDirection:'column',height:'7vh',alignItems:'center'}}>
        <h4>{errMessage}</h4>
        <h5>Please Log out and try logging in again.</h5>
        </div>) :
      
       (<div className='w-100 h-screen bg-red-200 flex items-center justify-between flex-wrap'>

          <div className='flex items-center justify-center w-full '>
            <Link to='/newpost'><button className="bg-red-600 hover:bg-white hover:text-red-600 text-white font-bold px-4 py-2 rounded-xl w-28 ">Add Post</button></Link>
          </div>        
        
          {filteredBooks.map((book) => {
            return (
              <div className='flex flex-col items-center justify-evenly h-96 w-72 bg-white rounded-lg' key={book._id}>
                
                <img src={book.image} className="h-48 w-44 rounded-lg" />
                <h3 className='text-lg font-medium'>{book.title}</h3>
                <div className='flex justify-between items-center w-56'>
                  <Link to={`/update/${book._id}`}>
                    <button className="w-24 hover:bg-red-600 hover:text-white bg-white text-red-800 border-2 border-red-500 py-2 rounded-lg">Update</button>
                  </Link>
                  <button className="w-24 hover:bg-red-600 hover:text-white bg-white text-red-800 border-2 border-red-500 py-2 rounded-lg" onClick={()=>handleDelete(book._id)}>Delete</button>
                </div>

              </div>
            )
          })}

        </div>)}

    </>
  )

}

export default Shelf;
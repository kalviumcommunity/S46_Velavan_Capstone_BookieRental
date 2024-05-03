import React from 'react';
import { imageDB } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import Cookies from 'js-cookie';
import axios from 'axios';
import logo from '../assets/1.png';


const AddPost = () => {

  const navigate = useNavigate();
  const [err,setErr] = useState(null);
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [genre,setGenre] = useState('');
  const [status,setStatus] = useState('');
  const [amount,setAmount] = useState('');
  const [img,setImg] = useState(null);

  const uploadImage = async (file) => {
    
    const user = Cookies.get("Username");
    const imageRef = ref(imageDB, `books/${user}/${v4()}`);

    try {
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      setErr(error.message);
    }
  
  };

  const handleConfirm = async (e) =>{
    e.preventDefault();

    try{

      if(!img){
        setErr("Please select an image");
        return;
      }

      const URL = await uploadImage(img);

      if(!URL){
        setErr("Error uploading image");
        return;
      }

      const postData = {
        "image" : URL,
        "title" : title,
        "author" : author,
        "genre" : genre,
        "status" : status,
        "user" : Cookies.get("Username")
      }

      if (status === 'rent') {
        postData.rent = amount;
      } else if (status === 'sell') {
        postData.price = amount;
      }
      
      await axios.post('http://localhost:3000/books/',postData);
      navigate('/shelf')

    } catch(err){
      setErr(err.message);
    }

  }

  return (
    <>
      
      <div className='navbar flex items-center justify-between bg-red-300 h-[6.5rem] border-b-4 border-red-500'>
    
        <Link to='/'><img src={logo} className="h-44 w-44" alt="Logo" /></Link>

        <Link to='/'>
          <button className="bg-white hover:bg-red-600 hover:text-white text-red-600 font-bold px-4 py-2 rounded-xl w-28 m-7">
            Home
          </button>
        </Link>

      </div>

      <div className='w-screen h-[85.5dvh] bg-red-200 flex items-center justify-center'>
    
        <form className='flex flex-col items-center justify-around px-3 bg-white h-[80dvh] w-[29rem] rounded-lg'>

          <div className='flex flex-col items-center justify-between'>
            <h2 className="text-3xl text-red-500 font-semibold mb-2">Details , Please !</h2>
            <hr className="w-72 border-b-2 border-red-500" />
          </div>

          <div>
            <input type='text' placeholder='Title' required onChange={(e)=>setTitle(e.target.value)} className="w-[14.4rem] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
          </div>

          <div>
            <input type='text' placeholder='Author' required onChange={(e)=>setAuthor(e.target.value)} className="w-[14.4rem] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
          </div>

          <div>
            <input type='text' placeholder='Category' required onChange={(e)=>setGenre(e.target.value)} className="w-[14.4rem] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
          </div>


          <div className='flex w-[14.4rem] justify-between items-center'>
            
              <label> <input type='radio' name='status' value='rent' onChange={(e)=>setStatus(e.target.value)} /> Rent-able </label>

              <label> <input type='radio' name='status' value='sell' onChange={(e)=>setStatus(e.target.value)} /> Sell-able </label>
          
          </div>

          {status=='rent' ? 
            <div>
              <input type='number' placeholder='Rent Per Day ?' required onChange={(e)=>setAmount(e.target.value)} className="w-[14.4rem] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
            </div>
            : 
            status=='sell' ?
            <div>
              <input type='number' placeholder='The Price ?' required onChange={(e)=>setAmount(e.target.value)} className="w-[14.4rem] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
            </div>
            :
            null
          }

          <div className=' h-16 flex flex-col justify-between items-center'>
            <h2 className='font-medium'>Actual Image Of The Book :</h2>
            <input type='file' required onChange={(e)=>setImg(e.target.files[0])} className=" w-[13rem] text-center "/>
          </div>

          <button className=" w-28 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" onClick={handleConfirm}>CONFIRM</button>

          {err && <h3>{err}</h3>}

        </form>

      </div>

    </>
  )
}

export default AddPost;
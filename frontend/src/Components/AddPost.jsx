import React from 'react';
import { imageDB } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import logo from '../assets/1.png';


const AddPost = () => {

  const navigate = useNavigate();
  const [err,setErr] = useState(null);
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [descr,setDescr] = useState('');
  const [status,setStatus] = useState(false);
  const [img,setImg] = useState(null);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    
    const user = Cookies.get("Username");
    const imageRef = ref(imageDB, `images/${user}`);

    try {
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  
  };

  return (
    <>
      
      <div className='navbar flex items-center justify-between bg-red-300 h-[6.5rem] border-b-4 border-red-500'>
    
        <img src={logo} className="h-44 w-44" alt="Logo" />

        <Link to='/'>
          <button className="bg-white hover:bg-red-600 hover:text-white text-red-600 font-bold px-4 py-2 rounded-xl w-28 m-7">
            Home
          </button>
        </Link>

      </div>

      <div className='w-screen h-[85.5dvh] bg-red-200 flex items-center justify-center'>
    
        <form className='flex flex-col items-center justify-around px-3 bg-white h-[80dvh] w-[28vw] rounded-lg'>

          <div className='flex flex-col items-center justify-between'>
            <h2 className="text-3xl text-red-500 font-semibold mb-2">Details , Please !</h2>
            <hr className="w-72 border-b-2 border-red-500" />
          </div>

          <div>
            <input type='text' placeholder='Title' required  className="w-[15vw] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
          </div>

          <div>
            <input type='password' placeholder='Author' required  className="w-[15vw] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
          </div>

          <div>
            <input type='text' placeholder='Description' required  className="w-[15vw] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
          </div>

          <div>
            <input type='text' placeholder='Status' required  className="w-[15vw] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
          </div>

          <div>
            <input type='file' required onChange={(e)=>setImg(e.target.files[0])} className="w-[15vw]  text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
            <button className="w-14 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" onClick={(e)=>uploadImage(img)}>UPLOAD</button>
          </div>

          <button className=" w-28 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" onClick={()=>console.log('yes')}>CONFIRM</button>

          {err && <h3>{err.response.data}</h3>}

        </form>

      </div>

    </>
  )
}

export default AddPost;
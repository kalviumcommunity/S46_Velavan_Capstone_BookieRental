import React from 'react';
import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import logo from '../assets/1.png';

const LogIn = () => {
    
    const [name,setName] = useState("");
    const [pass,setPass] = useState("");
    const navigate = useNavigate();
    const [status,setStatus] = useState(false);
    const [err,setErr] = useState(null);

    const logIt = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/users/login',{
                name : name,
                password : pass
            });
            setName("");
            setPass("");
            Cookies.set("Username",name);
            Cookies.set('Token',response.data.token);
            setStatus(true);
            setErr(null);
            setTimeout(() => {
              navigate('/');
            }, 1500);
        } catch (err){
            console.log(err);
            setStatus(false);
            setErr(err);
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
    
                <form className='flex flex-col items-center justify-around px-3 bg-white h-[80dvh] w-[28vw] rounded-lg'>

                    <div className='flex flex-col items-center justify-between'>
                        <h2 className="text-3xl text-red-500 font-semibold mb-2">Welcome Back !</h2>
                        <hr className="w-72 border-b-2 border-red-500" />
                    </div>

                    <div>
                        <input type='text' placeholder='UserName' required onChange={(e)=>{setName(e.target.value)}} className="w-[15vw] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
                    </div>

                    <div>
                        <input type='password' placeholder='Password' required onChange={(e)=>{setPass(e.target.value)}} className="w-[15vw] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
                    </div>

                    <button className=" w-28 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" onClick={logIt}>CONFIRM</button>

                    {status && <div className="loading-bar"></div>}

                    {err && <h3>{err.response.data}</h3>}

                    <div className='flex flex-col items-center justify-between h-32 mb-7'>
                        
                        <hr className=" w-72 border-b-2 border-red-500 mt-4" />

                        <div className="text-black">New to our site ? Then just</div>

                        <Link to='/signup'>
                        <button className="w-28 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md">Sign Up</button>
                        </Link>
                    
                    </div>

                </form>

            </div>

        </>
    )
}

export default LogIn;
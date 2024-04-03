import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/1.png';

const SignUp = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");

    return (
        <>
      
            <div className='navbar flex items-center justify-between bg-red-300 h-[6.5rem] border-b-4 border-red-500'>
    
                <img src={logo} className="h-44 w-44" alt="Logo" />

                <button className="bg-white hover:bg-red-600 hover:text-white text-red-600 font-bold px-4 py-2 rounded-xl w-28 m-7">
                <Link to='/'>Home</Link>
                </button>
  
            </div>

            <div className='w-screen h-[85.5dvh] bg-red-200 flex items-center justify-center'>
                
                <form className='flex flex-col items-center justify-around px-3 bg-white h-[80dvh] w-[28vw] rounded-lg'>

                    <div className='flex flex-col items-center justify-between'>
                        <h2 className="text-3xl text-red-500 font-semibold mb-2">Hey , New User !</h2>
                        <hr className=" w-72 border-b-2 border-red-500" />
                    </div>

                    <div>
                        <input type='text' placeholder='UserName' required onChange={(e)=>{setName(e.target.value)}} className="w-[15vw] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
                    </div>

                    <div>
                        <input type='text' placeholder='Email' required onChange={(e)=>{setEmail(e.target.value)}} className="w-[15vw] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
                    </div>

                    <div>
                        <input type='text' placeholder='Password' required onChange={(e)=>{setPass(e.target.value)}} className="w-[15vw] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
                    </div>

                    <button className=" w-28 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" onClick={()=>console.log(name,email,pass)}>CONFIRM</button>

                    <hr className=" w-72 border-b-2 border-red-500 mt-4" />

                    <div className="text-black">Already a User? Then just</div>

                    <button className=" w-28 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" onClick={()=>console.log(name,email,pass)}>Log In</button>

                </form>


            </div>

        </>
    )
}

export default SignUp

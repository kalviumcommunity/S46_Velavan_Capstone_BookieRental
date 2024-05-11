import React, {useState, useEffect} from 'react';
import logo from '../assets/1.png';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

const UpdatePost = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    const [title,setTitle] = useState('');
    const [author,setAuthor] = useState('');
    const [genre,setGenre] = useState('');
    const [status,setStatus] = useState('');
    const [amount,setAmount] = useState('');
    const [err,setErr] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3000/books/${id}`)
        .then(res => {
            console.log(res.data);
            setPost(res.data);
        })
        .catch(err => {console.log(err),setErr(err)});
    }, []);

    const updatePost = (e) => {
        e.preventDefault();
        
        const postData = {
            "image" : post.image,
            "title" : title==='' ? post.title : title,
            "author" : author==='' ? post.author : author,
            "genre" : genre==='' ? post.genre : genre,
            "status" : status==='' ? post.status : status,
            "user" : post.user
        }

        if (status === 'rent') {
            postData.rent = amount==='' ? post.amount : amount;
        } else if (status === 'sell') {
            postData.price = amount==='' ? post.amount : amount;
        }

        axios.put(`http://localhost:3000/books/${id}`, postData, {headers: {Authorization: `Bearer ${Cookies.get('Token')}`}})
        .then(res => {
            console.log(res.data);
            navigate('/shelf');
        })
        .catch(err => {console.log(err),setErr(err)});
    
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
                <h2 className="text-3xl text-red-500 font-semibold mb-2">Changes , Please !</h2>
                <hr className="w-72 border-b-2 border-red-500" />
            </div>

            <div>
                <input type='text' placeholder='Title' defaultValue={post.title} required onChange={(e)=>setTitle(e.target.value)} className="w-[14.4rem] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
            </div>

            <div>
            <   input type='text'placeholder='Author' defaultValue={post.author} required onChange={(e)=>setAuthor(e.target.value)} className="w-[14.4rem] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
            </div>

            <div>
                <input type='text' placeholder='Genre' defaultValue={post.genre} required onChange={(e)=>setGenre(e.target.value)} className="w-[14.4rem] px-4 py-2 bg-red-100 text-center rounded-md focus:outline-none focus:ring focus:border-blue-500"/>
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

            <div className='flex w-[19rem] justify-between items-center'>

                <button className=" w-28 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" onClick={()=>navigate('/shelf')}>BACK</button>

                <button className=" w-28 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" onClick={updatePost}>UPDATE</button>
            
            </div>

            {err && <h3>{err}</h3>}

        </form>

      </div>
      
    </>
  )
}

export default UpdatePost;
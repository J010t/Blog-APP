import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import axios from 'axios'
import {URL} from '../url'

const Login = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState(false)
    const navigate=useNavigate()

    const handleRegister=async()=>{
        try{
            const res=await axios.post(URL+"/api/auth/register",{username,email,password});
            setUsername(res.data.username);
            setEmail(res.data.email);
            setPassword(res.data.password);
            setError(false);
            navigate("/login");
            
        }  catch(err){
            setError(true)
            console.log(err)
        }
      
    }
    return (
    <>
    <div className='w-full px-8 py-4 text-left bg-black md:px-[200px] flex justify-between items-center'>
        <div className='text-lg font-bold text-white cursor-pointer md:text-xl '>
            <Link to="/">
                MyBlog
            </Link>
        </div>
        <div className='text-lg text-white'>
            <Link to="/register">
                Register
            </Link>
        </div>
    </div>
    <div className='w-full mx-auto flex-col justify-center items-center h-[60vh] mt-40 space-y-6'>
        <div className="w-[80%] md:w-[25%] flex flex-col justify-center items-center space-y-4 mx-auto">
            <h1 className='text-xl font-bold text-left'>Create an account</h1>
            <input
                type="text" 
                onChange={(e)=>setUsername(e.target.value)}
                placeholder='Enter your username' 
                className='w-full px-4 py-2 border-2 border-black outline-0'
            />
            <input 
                type="email" 
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='Enter your email'      className='w-full p-2 border-2 border-black outline-0' 
            />
            <input 
                type="password" 
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Enter your password'
                className='w-full  p-2 border-2 border-black outline-0'
            />
            <button 
                className='w-full p-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black'
                onClick={handleRegister}
            >
                Register
            </button>
            {error && <h3 className="text-red-500 text-sm ">
                    Something went wrong
                </h3>
            }
            <div className='flex items-center justify-center space-x-2'>
                <p className='text-sm text-black'>
                    Already have an account?
                </p>
                <p className="text-sm font-semibold text-black hover:underline">
                    <Link to="/login">
                        Log In
                    </Link>
                </p>
            </div>
                
        </div>
    </div>
    </>
  )
}

export default Login
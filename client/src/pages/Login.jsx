import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"


const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate()

  const handleLogin=async()=>{
    try{
      const res=await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
      // console.log(res.data)
      setUser(res.data)
      navigate("/")

    }
    catch(err){
      setError(true)
      console.log(err)

    }

  }
  return (

    <>
    <div className='w-full px-8 py-4 text-left bg-black md:px-[200px] flex justify-between items-center'>
    <div className='text-lg font-bold text-white cursor-pointer md:text-xl '><Link to="/">MyBlog</Link></div>
    <div className='text-lg text-white'><Link to="/register">Register</Link></div>
  </div>
    <div className='w-full mx-auto flex-col justify-center items-center h-[60vh] mt-40 space-y-6'>
        <div className="w-[80%] md:w-[25%] flex flex-col justify-center items-center space-y-4 mx-auto">
            <h1 className='text-xl font-bold text-left'>Log in to your account</h1>
            <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email'  className='w-full p-2 border-2 border-black outline-0' />
            <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter your password'className='w-full  p-2 border-2 border-black outline-0' />
            <button onClick={handleLogin} className='w-full p-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black'>Log in</button>
            {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
            <div className="flex justify-center items-center space-x-2">
              <p className='text-sm text-black'>
                New here?
              </p>
              <p className='font-semibold text-black hover:underline'>
                <Link to='/register'>
                  Register
                </Link>
              </p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login
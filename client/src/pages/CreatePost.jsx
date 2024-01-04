import React from 'react'
import Navbar from '../components/Navbar'
import {ImCross} from 'react-icons/im'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL,IF } from '../url'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [file,setFile]=useState(null);
    const {user}=useContext(UserContext);
    const [cat,setCat]=useState("");
    const [cats,setCats]=useState([]);

    const navigate=useNavigate();
    const addCats = ()=>{
        let updatedCats = [...cats];
        updatedCats.push(cat);
        setCat("");
        setCats(updatedCats);
    };

    const removeCat = (i)=>{
        let newCats = [...cats];
        newCats.splice(i);
        setCats(newCats);
    };

    const handleCreate= async (e)=>{
        e.preventDefault()
        const post={
            title,
            desc,
            username:user.username,
            userId:user._id,
            categories:cats
        }
        if(file){
            const data=new FormData();
            const filename=Date.now()+file.name;
            data.append("img",filename);
            data.append("file",file);
            post.photo=filename;
            //img upload
            try{
              const imgUpload=await axios.post(URL+"/api/upload",data);
              console.log(imgUpload.data);
            }
            catch(err){
              console.log(err);
            }
        }
          //post upload
          
        try{
            const res=await axios.post(URL+"/api/posts/create",post,{withCredentials:true});
            navigate("/posts/post/"+res.data._id);
            console.log(res.data);
  
          }
          catch(err){
            console.log(err);
          }
    }

  return (
    <div>
        <Navbar/>
        <div className='px-6 md:px-[200px] mt-8 '>
        <h1 className="font-bold md:text-2xl text-xl mb-4">Create a post</h1>
        
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
            <input 
                type="text" 
                placeholder='Enter post Title' 
                className='px-4 py-2 border'
                onChange={(e)=>setTitle(e.target.value)}
            />
            <input 
                type="file" 
                placeholder='Enter image' 
                className='px-4 py-2 border'
                onChange={(e)=>setFile(e.target.files[0])}
            />
            <div className="flex flex-col">
                <div className="flex items-center space-x-4 md:space-x-8">
                    <input 
                        type="text" 
                        placeholder='Enter post category'
                        className='px-4 py-2 border '
                        alue={cat} 
                        onChange={(e)=>setCat(e.target.value)} 
                    />
                    <div 
                        className="bg-black text-white px-4 py-2 font-semibold cursor-pointer border " 
                        onClick={()=>addCats()}
                    >
                        Add
                    </div>
                </div>
                {/* categories */}
                <div className="flex px-4 mt-3">
                {cats.map((c,i)=>(
                <div key={i} className="flex ">
                    <div  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                        <p>{c}</p>
                        <p className="text-white bg-black rounded-full cursor-pointer p-2 text-sm" ><ImCross onClick={()=>removeCat(i)} /></p>
                    </div>
                </div>
            
            ))}
            </div>
            </div>
            <textarea 
                rows={15} 
                cols={25} 
                placeholder='Enter post description' 
                className='px-4 py-2 border rounded-lg'
                onChange={(e)=>setDesc(e.target.value)}
            />
            <button onClick={handleCreate} className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg ">
                Create
            </button>
        </form>
        </div>
    </div>
  )
}

export default CreatePost


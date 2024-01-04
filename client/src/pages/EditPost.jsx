import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {ImCross} from 'react-icons/im'
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"


const EditPost = () => {
    const postId=useParams().id;
    const {user}=useContext(UserContext);
    const navigate=useNavigate();
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [file,setFile]=useState(null);
    const [cat,setCat]=useState("");
    const [cats,setCats]=useState([]);

    const fetchPost=async()=>{
        try{
          const res=await axios.get(URL+"/api/posts/"+postId);
          setTitle(res.data.title);
          setDesc(res.data.desc);
          setFile(res.data.photo);
          setCats(res.data.categories);
            //console.log(res.data)   
  
        }
        catch(err){
          console.log(err)
        }
      }
  
      const handleUpdate=async (e)=>{
        e.preventDefault()
        const post={
          title,
          desc,
          username:user.username,
          userId:user._id,
          categories:cats
        }
  
        if(file){
          const data=new FormData()
          const filename=Date.now()+file.name
          data.append("img",filename)
          data.append("file",file)
          post.photo=filename
          
          //img upload
          try{
            const imgUpload=await axios.post(URL+"/api/upload",data)
          }
          catch(err){
            console.log(err)
          }
        }
        //post upload
       
        try{
          const res=await axios.put(URL+"/api/posts/update/"+postId,post,{withCredentials:true})
          navigate("/posts/post/"+res.data._id)
          // console.log(res.data)
  
        }
        catch(err){
          console.log(err)
        }
      }
    useEffect(()=>{
        fetchPost();
    },[postId]);
    const addCats = ()=>{
        let updatedCats = [...cats,];
        updatedCats.push(cat);
        setCats(updatedCats);
        setCat("");

    };

    const removeCat = (i)=>{
        let newCats = [...cats];
        newCats.splice(i);
        setCats(newCats);
    };

  return (
    <div>
        <Navbar/>
        <div className='px-6 md:px-[200px] mt-8 '>
        <h1 className="font-bold md:text-2xl text-xl mb-4">Update a post</h1>
        
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
            <input 
                type="text" 
                onChange={(e)=>setTitle(e.target.value)} value={title}
                placeholder='Enter post Title' 
                className='px-4 py-2 border'
            />
            <input 
                type="file" 
                onChange={(e)=>setFile(e.target.files[0])}
                placeholder='Enter image' 
                className='px-4 py-2 border'
            />
            <div className="flex flex-col">
                <div className="flex items-center space-x-4 md:space-x-8">
                    <input 
                        type="text" 
                        placeholder='Enter post category'
                        className='px-4 py-2 border mb-5'
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
                onChange={(e)=>setDesc(e.target.value)} value={desc}
                placeholder='Enter post description' 
                className='px-4 py-2 border rounded-lg'
            />
            <button 
                onClick={handleUpdate} 
                className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg " >
              Update                  
            </button>
        </form>
        </div>
    </div>
  )
}

export default EditPost
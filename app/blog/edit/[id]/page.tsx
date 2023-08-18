"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import  { Toaster, toast} from "react-hot-toast";
type UpdateBlogParams={
    title:string;
    description:string;
    id:string
} 
const updateBlog=async(data:UpdateBlogParams)=>{

    const res = fetch (`http://localhost:3000/api/blog/${data.id}`,{method:"PUT" , body:JSON.stringify({title:data.title, description:data.description}),
    //@ts-ignore
    "Content-Type":"application/json"})
    return (await res).json();

    };

    const DeleteBlog=async(id:string)=>{
        const res = fetch (`http://localhost:3000/api/blog/${id}`,{method:"DELETE",
        //@ts-ignore
        "Content-Type":"application/json"})
        return (await res).json();
        };
const getBlogById=async(id:string)=>{
   const res =await fetch(`http://localhost:3000/api/blog/${id}`);
   const data=await res.json();
   return data.post;
}


const EditBlog = ({params}:{params:{id:string}}) => {
    const router=useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
   

    useEffect(()=>{
        toast.loading("Fetching Blog Details",{id:"1"});
        getBlogById(params.id).then((data)=>{
      if(titleRef.current && descriptionRef.current){
        titleRef.current.value=data.title;
        descriptionRef.current.value=data.description;
        toast.success("Fetching Complete",{id:"1"})
      }
        }).catch((error)=> {
            console.log(error);
        toast.error("Error Fetching Blog",{id:"1"});
        } )
        },[])


        const handleSubmit = async(event: React.FormEvent) => {
            event.preventDefault();
            if(titleRef.current && descriptionRef.current){
              toast.loading("Sending Request",{id:"1"});
              await updateBlog({title:titleRef.current?.value,
                           description:descriptionRef.current?.value,
                        id : params.id});
    
              toast.success("Blog Posted Successfully",{id:"1"});
              router.push("/")
            }
          };

          const handleDelete=async()=>{
         toast.loading("Deleting Blog",{id:"2"});
         await DeleteBlog(params.id);
         toast.success("Blog Deleted",{id:"2"})
         router.push("/")
          }

          
  return (
    <Fragment>
    <Toaster />
   <div className="w-full m-auto flex my-4">
  <div className="flex flex-col justify-center items-center m-auto">
   <p className="text-2xl text-slate-200 font-bold p-3">
     Update your blog Blog
   </p>
   <form onSubmit={handleSubmit}>
     <input
       type="text"
       className="rounded-md px-4 py-2 my-2 w-full"
       placeholder="Enter Title"
       ref={titleRef} />
     <textarea
       className="rounded-md px-4 py-2 w-full my-2"
       placeholder="Enter Description"
       ref={descriptionRef}
     ></textarea>
    <div className="flex justify-between">
     <button className="font-semibold px-2 py-1 align-middle shadow-md bg-slate-200 rounded-md m-auto hover:bg-slate-100">
       Update
     </button>
    </div>
   </form>

     <button onClick={handleDelete} className="font-semibold align-middle px-2 py-1 shadow-md bg-red-600 rounded-md m-auto hover:bg-red-700 text-slate-100">
       Delete
     </button>

   </div>
   </div>
 </Fragment>
  )
}

export default EditBlog
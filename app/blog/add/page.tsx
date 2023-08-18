"use client";

import { useRouter } from "next/navigation";
import { Fragment,  useRef } from "react";
import { Toaster ,toast} from "react-hot-toast";







const postBlog=async({title,description}:{title:string,description:string})=>{
const res = fetch ("http://localhost:3000/api/blog",{method:"POST" , body:JSON.stringify({title, description}),
//@ts-ignore
"Content-Type":"application/json"})
return (await res).json();

}

const AddBlog = async () => {

  const router=useRouter();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);


  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    if(titleRef.current && descriptionRef.current){
      toast.loading("Sending Request",{id:"1"});
      await postBlog({title:titleRef.current?.value,description:descriptionRef.current?.value});
      toast.success("Blog Posted Successfully",{id:"1"});
      router.push("/")
      
    }
    
  };

  return (
    <Fragment>
       <Toaster />
       
      <div className="w-full m-auto flex my-4">
     <div className="flex flex-col justify-center items-center m-auto">
      <p className="text-2xl text-slate-200 font-bold p-3">
        Add A Wonderful Blog
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
        <button className="font-semibold px-2 py-1 shadow-md bg-slate-200 rounded-md m-auto hover:bg-slate-100">
          Submit
        </button>
      </form>
    </div>
      </div>
    </Fragment>

  );
  
};

export default AddBlog;

import Link from "next/link";


async function fetchBlogs(){
  const res = await fetch("http://localhost:3000/api/blog", {
    next:{
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data.posts;
}

export default async function Home() {
  const posts = await fetchBlogs();
  console.log(posts);
  
  return (
    <main className="h-full w-full">
      <div className="m-auto my-4 rounded-lg bg-slate-800 p-4 drop-shadow-lg sm:w-3/4 md:w-2/4">
        <h1 className="text-2x text-center font-[verdana] font-extrabold text-slate-200 ">
          My Full Stack Blog App with NextJS
        </h1>
      </div>
         {/* Link */}
      <div className="flex">
        <Link href={"/blog/add"} className="m-auto rounded-md bg-slate-200 p-2 text-center sm:w-2/4 md:w-1/6">
          Add New Blog
        </Link>
      </div>
      {/* Blogs */}
      <div className="flex w-full flex-col items-center justify-center">
        {posts?.map((post: any) => (
          <div className="mx-1 my-2 flex w-3/4 flex-col justify-center rounded-md bg-slate-200 p-4">
            {/* Title and Action */}
            <div className="my-3 flex items-center">
              <div className="mr-auto">
                <h2 className=" font-semibold">{post.title}</h2>
              </div>
              <Link href={`/blog/edit/${post.id}`}  className="rounded-md bg-slate-900 px-2 py-1 font-semibold text-slate-200">
                Edit
              </Link>
            </div>
            {/* Date & Description */}
            <div className="my-1 mr-auto">
              <blockquote className="font-bold text-slate-700">
                {new Date(post.date).toDateString()}
              </blockquote>
            </div>
            <div className="my-2 mr-auto">
              <pre>{post.description}</pre>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

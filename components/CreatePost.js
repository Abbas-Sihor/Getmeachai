"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUser, updateUserData } from "@/actions/useraction";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createpost } from "@/actions/useraction";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const { data: session } = useSession();
  const [data, updateData] = useState({});
  const router = useRouter()
  const [postdata, setPostdata] = useState({
  title: "",
  description: "",
  tags: "",
  thumbnail: "",
  coverpic: "",
  maincontext: "",
});
const [newtags,settaginput]=useState([])


 
  useEffect(() => {
    document.title="Dashboard - Manage Your Profile | Patronic"
    
    
      GetData();
    
  }, [session]); // Add session as a dependency

  const GetData = async () => {
    if (!session?.user?.name) return;
    try {
      const user = await fetchUser(session.user.name);
      updateData(user);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostdata((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const inputtag=postdata.tags
    const modifiytag =inputtag.split(",").map(tag=>tag.trim()).filter(tag=>tag.length>0) 
      const post = await createpost(postdata,data._id,data.username,modifiytag);
      if(post){

        toast('Profile Updated Successfully', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
                setPostdata({})
                router.push(`/${data.username}/post/${post._id}`)
      }
      else{
        alert("ERROR,Something Went Wrong\n Note All Fields Are Require Except Tags")
      }

     
  };

  const handleImageUpload = async (e, folderName, dbName) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 10 * 1024 * 1024) {
    alert("Image size should be less than 5MB");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", folderName);

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dyuc6dgxa/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await res.json();

    setPostdata((prev) => ({
      ...prev,
      [dbName]: result.secure_url, // ✅ THIS IS THE KEY FIX
    }));
  } catch (err) {
    console.error(err);
    alert("Image upload failed");
  }
};


  return (
    <>
    <ToastContainer/>
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4">
  <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-8 space-y-8">

    <h2 className="text-3xl font-semibold tracking-tight">
      Create Post
    </h2>

    {/* Title */}
    <div>
      <label className="text-sm text-gray-400">Title</label>
      <input
        name="title"
        value={postdata.title}
        onChange={handleChange}
        placeholder="Post title"
        className="mt-2 w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    {/* Description */}
    <div>
      <label className="text-sm text-gray-400">Short Description</label>
      <textarea
        name="description"
        value={postdata.description}
        onChange={handleChange}
        rows={3}
        placeholder="Brief description of your post"
        className="mt-2 w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    {/* Tags */}
    <div>
      <label className="text-sm text-gray-400">Tags</label>
      <input
        name="tags"
        value={postdata.tags}
        onChange={handleChange}
        placeholder="react, nextjs, webdev"
        className="mt-2 w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <p className="text-xs text-gray-500 mt-1">
        Separate tags using commas
      </p>
    </div>

    {/* Image URLs */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="text-sm text-gray-400">Thumbnail URL</label>
        <input
          name="thumbnail"
          onChange={(e) => handleImageUpload(e, "thumbnail_upload", "thumbnail")}
          id="thumbnail"
         type="file"
         accept="image*"
          placeholder="https://..."
          className="mt-2 w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3"
        />
        {postdata.thumbnail && (
          <img
            src={postdata.thumbnail}
            className="mt-3 h-32 w-full object-cover rounded-xl border border-gray-700"
          />
        )}
      </div>

      <div>
        <label className="text-sm text-gray-400">Cover Image URL</label>
        <input
          name="coverpic"
           type="file"
         accept="image*"
         id="coverpic"
          onChange={(e) => handleImageUpload(e, "postCover_upload", "coverpic")}
          placeholder="https://..."
          className="mt-2 w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3"
        />
        {postdata.coverpic && (
          <img
            src={postdata.coverpic}
            className="mt-3 h-32 w-full object-cover rounded-xl border border-gray-700"
          />
        )}
      </div>
    </div>

    {/* Main Content */}
    <div>
      <label className="text-sm text-gray-400">Main Content</label>
      <textarea
        name="maincontext"
        value={postdata.maincontext}
        onChange={handleChange}
        rows={6}
        placeholder="Write your post content here..."
        className="mt-2 w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-semibold"
    >
      Publish Post
    </button>

  </div>
</form>

    </>
  );
};

export default CreatePost;

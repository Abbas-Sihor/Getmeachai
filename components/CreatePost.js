"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUser, updateUserData } from "@/actions/useraction";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createpost } from "@/actions/useraction";

const CreatePost = () => {
  const { data: session } = useSession();
  const [data, updateData] = useState({});
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
    document.title="Dashboard - Manage Your Profile | GetMeAChai"
    
    
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
    const inputtag=postdata.tags
    const modifiytag =inputtag.split(",").map(tag=>tag.trim()).filter(tag=>tag.length>0) 
      const post = await createpost(postdata,data._id,data.username,modifiytag);
      console.log(post)

     
  };

  return (
    <>
    <ToastContainer/>
    <form className="max-w-2xl mx-auto" action={handleSubmit}>
      <div className="max-w-2xl mx-auto p-6 text-white rounded-full shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create A Post</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Title
          </label>
          <input
            value={postdata.title || ""}
            onChange={handleChange}
            name="title"
            type="text"
            id="title"
            placeholder="Enter The Title Of Your Post "
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            value={postdata.description || ""}
            onChange={handleChange}
            name="description"
            type="text"
            id="description"
            placeholder="Enter The Description Of Your Post"
            className="w-full mt-1 p-4 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500 scrollbar-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            value={data.username || ""}
            readOnly
            name="username"
            type="text"
            id="username"
            placeholder="Enter your username"
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Tags
          </label>
          <input
            value={postdata.tags || ""}
            onChange={handleChange}
            name="tags"
            type="text"
            id="tags"
            placeholder="Enter your Tags"
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cover-picture" className="block text-sm font-medium">
            Thumbnail
          </label>
          <input
            value={postdata.thumbnail || ""}
            onChange={handleChange}
            name="thumbnail"
            type="text"
            id="thumbnail"
            placeholder="Enter the Thumbnail link"
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="profile-picture" className="block text-sm font-medium">
            Cover Picture
          </label>
          <input
            value={postdata.coverpic || ""}
            onChange={handleChange}
            name="coverpic"
            type="text"
            id="coverpic"
            placeholder="Enter the Cover Picture link"
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="razorpay-id" className="block text-sm font-medium">
            Main Context
          </label>
          <textarea
            value={postdata.maincontext || ""}
            onChange={handleChange}
            name="maincontext"
            type="text"
            id="maincontext"
            placeholder="Enter your Main Context"
            className="w-full mt-1 p-4 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500 scrollbar-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </form>
    </>
  );
};

export default CreatePost;

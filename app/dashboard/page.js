"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateUserData } from "@/actions/useraction";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const { data: session } = useSession();
  const [data, updateData] = useState({});
  const router = useRouter();

  useEffect(() => {
    document.title="Dashboard - Manage Your Profile | Patronick"
    if (!session) {
      router.push("/"); // Redirect to home if no session
    } else {
      GetData();
    }
  }, [session]); // Add session as a dependency

  const GetData = async () => {
    try {
      const user = await fetchUser(session.user.name);
      updateData(user);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
     e.preventDefault(); // Prevent page reload
    try {
      const user = await updateUserData(data._id, data); // Pass `data` to update
      
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
        router.push("/home")
    } catch (err) {
      console.error("Error updating user data:", err);
    }
  };

  const handleImageUpload = async (e,folderName,dbName) => {
    e.preventDefault()
  const file = e.target.files[0];
  if (!file) return;

  // Optional validation
  if (file.size > 5 * 1024 * 1024) {
    alert("Image size should be less than 5MB");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", folderName); // preset name

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dyuc6dgxa/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log("Here is the data",data)

    updateData((prev) => ({
      ...prev,
      [dbName]: data.secure_url, // ✅ save URL
    }));
  } catch (err) {
    console.error(err);
    alert("Image upload failed");
  }
};


  return (
    <>
    <ToastContainer/>
    <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <div className="max-w-2xl mx-auto p-6 text-white rounded-full shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Profile Setup</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            value={data.name || ""}
            onChange={handleChange}
            name="name"
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            value={data.email || ""}
            readOnly
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Contact No
          </label>
          <input
            value={data.contact || ""}
            onChange={handleChange}
            name="contact"
            type="contact"
            id="contact"
            placeholder="Enter your Contact No"
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-300 "
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
            Tagline
          </label>
          <input
            value={data.tagline || ""}
            onChange={handleChange}
            name="tagline"
            type="text"
            id="tagline"
            placeholder="Enter your tagline"
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cover-picture" className="block text-sm font-medium">
            Cover Picture
          </label>
          {data.coverpic && (
    <img
      src={data.coverpic}
      alt="Cover Preview"
      className="w-full h-40 object-cover rounded-xl mb-3 border border-gray-700"
    />
  )}
          <input
            type="file"
  accept="image/*"
  onChange={(e)=>handleImageUpload(e,"cover_upload",'coverpic')}
            name="coverpic"
            
            id="coverpic"
            placeholder="Enter the cover pic link"
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="profile-picture" className="block text-sm font-medium">
            Profile Picture
          </label>
          {data.profilepic && (
    <img
      src={data.profilepic}
      alt="Profile Preview"
      className="w-32 h-32 object-cover rounded-full mb-3 border border-gray-700"
    />
  )}
          <input
            
              type="file"
  accept="image/*"
  onChange={(e)=>handleImageUpload(e,"profile_upload","profilepic")}
            name="profilepic"
            id="profilepic"
            placeholder="Enter the profile pic link"
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="razorpay-id" className="block text-sm font-medium">
            Razorpay ID
          </label>
          <input
            value={data.razorpayid || ""}
            onChange={handleChange}
            name="razorpayid"
            type="text"
            id="razorpayid"
            placeholder="Enter your Razorpay ID"
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="razorpay-secret" className="block text-sm font-medium">
            Razorpay Secret
          </label>
          <input
            value={data.razorpaysecret || ""}
            onChange={handleChange}
            name="razorpaysecret"
            type="password"
            id="razorpay-secret"
            placeholder="Enter your Razorpay Secret"
            className="w-full mt-1 p-4 border border-gray-600 rounded-full bg-gray-900 text-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
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

export default Page;

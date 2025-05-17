"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { fetchUser } from "@/actions/useraction";
const Navbar = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [results, setResults] = useState({});
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null); // Create a ref to track the dropdown
  const buttonRef = useRef(null); // Create a ref for the button


  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  const handleSearch = async() => {
    const user = await fetchUser(query)
    setResults(user);
    setIsModalOpen(true);
  };

  // Close dropdown when clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeDropdownOnClick = () => {
    setDropdownOpen(false); // Close the dropdown when a link is clicked
  };

  return (
    <div
  className="text-white flex justify-between p-3 bg-[#0a0e31] sticky top-0 z-50 shadow-md"
>
  <Link href={"/"}>
    <h1 className="logo flex cursor-pointer font-bold">GetMeaChai</h1>
  </Link>
  <div className="flex flex-row ">
      {/* Search Bar */}
     

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 p-4 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Search Results
            </h2>
            {results ? (
              
                
                <div className="profile text-white p-5 rounded-md border-b-2 border-white shadow-lg">
							<div className=" flex items-center justify-center flex-col">
								<div className=" rounded-full w-20 h-20 overflow-hidden mb-4">
									<img
										className="border-white border-2 rounded-full w-full h-full object-cover"
										src={results.profilepic || "/placeholder.png"}
									
									/>
								</div>
								<h3 className="text-xl font-bold font-galindo text-amber-700">
									{results.username || "Author"}
								</h3>
						
								<p className="mb-2 font-limelight text-black">{results.tagline || "Author Tagline"}</p>
								<p className="mb-2 font-limelight text-black">
								 {results.followers} Followers
								</p>
                <Link href={`/${results.username}/post`} onClick={() => {setIsModalOpen(false); setQuery("")}}>
                <button
              
              className="mt-4 px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl rounded"
            >
              View Author
            </button>
            </Link>
                </div>
                </div>
                
              
            ) : (
              <p className="text-gray-500">No results found.<br/>
              Make sure you dont have any typo error</p>
              
            )}
            <button
              onClick={() => {setIsModalOpen(false); setQuery("")}}
              className="mt-4 px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  <div className="flex ">
  <div className="flex flex-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for username..."
          className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="ml-4 mr-7 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl rounded-lg w-auto "
        >
          Search
        </button>
      </div>
    {session ? (
      <>
        <button
          ref={buttonRef}
          id="dropdownAvatarNameButton"
          onClick={toggleDropdown}
          className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 me-2 rounded-full"
            src={session.user.image}
            alt="user photo"
          />
          {session.user.email}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            id="dropdownAvatarName"
            className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div className="font-medium">Pro User</div>
              <div className="truncate">{session.user.email}</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownAvatarNameButton"
            >
              <li>
                <Link
                  href="/dashboard"
                  onClick={closeDropdownOnClick}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href={`/${session.user.name}`}
                  onClick={closeDropdownOnClick}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Your Page
                </Link>
              </li>
              <li>
                <Link
                  href="/createpost"
                  onClick={closeDropdownOnClick}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Create Post
                </Link>
              </li>
            </ul>
            <div className="py-2">
              <button
                onClick={() => {
                  signOut();
                  closeDropdownOnClick();
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </>
    ) : (
      <Link href={"/login"}>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-28px"
        >
          Login
        </button>
      </Link>
    )}
  </div>
</div>

  );
};

export default Navbar;

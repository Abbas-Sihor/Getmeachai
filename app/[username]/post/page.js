"use client";
import { fetchpost, fetchUser, followUser, noOfContributor } from "@/actions/useraction";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import React, { Suspense, use, useEffect, useState } from "react";
import Loading from "./loading";
import { useSession } from "next-auth/react";


const page = ({ params }) => {
	const { username } = use(params);
	const [author, setAuthor] = useState({});
	const [post, setpost] = useState([]);
	const [recentpost, setrecentpost] = useState([]);
	const [numpost, setnumpost] = useState();
	const [isLoaded, setIsLoaded] = useState(false);
	const [followers,setfollowers]=useState()
	const[ contributor,setContributor]=useState()
	const [isfollowing,setisfollowing]=useState(false)
	const { data: session } = useSession();
	useEffect(() => {
		getdata();
	}, [session]);
	const getdata = async () => {
		await new Promise(resolve=>setTimeout(resolve,2000))
		let data = await fetchUser(username);
		setAuthor(data);
		setfollowers(data.followers)
		let postdata = await fetchpost(username);
		setpost(postdata);
		setnumpost(postdata.length);
		const paymnetdata = await noOfContributor(username)
		setContributor(paymnetdata)

		try {
			if (data.followby.includes(session?.user?.name)) {
				setisfollowing(true);
			}
		} catch (error) {
			console.log(error);
		}

		setIsLoaded(true)
	};
	if(!isLoaded){
		return <Loading username={username}/>
	}
	const handlefollow=async()=>{
		console.log("i am here")
		const follow = await followUser(username,session?.user?.name)
		if(isfollowing){
			setisfollowing(false)
			setfollowers(followers-1)
		}
		else{
			setisfollowing(true)
			setfollowers(followers+1)
		}
	}
	return (
	
		<>
			<div className="flex h-screen">
				{/* Main Content */}
				<div className="w-[75%] overflow-auto scrollbar-none">
					<div className="grid grid-cols-2 gap-10 p-6">
						{/* <!-- Post 1 --> */}

						{post.map((post) => {
							return (
								<div
									key={post._id}
									className="post bg-gray-800 p-4 rounded-lg shadow-lg"
								>
									<div className="post1">
										<div className="w-full h-56 rounded-lg skeleton">
										<img
											className="thumbnail w-full h-56 object-cover rounded-lg"
											src={post.thumbnail}
											onLoad={(e) =>
												e.target.parentElement.classList.remove("skeleton")
											}
										/>
										</div>
										<h3 className="title text-xl font-bold text-white mt-4">
											{post.title}
										</h3>
										<p className="description text-white mt-2 line-clamp-2">
											{post.description}
										</p>
										<p className="text-gray-400 mt-2 line-clamp-1">
											{post.maincontext}
										</p>
										<Link href={`/${username}/post/${post._id}`}>
											<button
												type="button"
												className="mt-3 p-5 text-white w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
											>
												Read More
											</button>
										</Link>
										<div className="flex gap-4 mt-4">
											<i className="text-blue-500 cursor-pointer">
												<FontAwesomeIcon icon={faHeart} />
												Like
											</i>
											<i className="text-blue-500 cursor-pointer">
												<FontAwesomeIcon icon={faComment} />
												Comment
											</i>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				{/* Sidebar */}
				<div className="flex h-screen w-[25%]">
					{/* Sidebar */}
					<div className=" overflow-y-scroll bg-slate-900  flex flex-col gap-3 mt-5 mb-5 scrollbar-none">
						{/* Profile Section */}
						<div className="profile text-white p-5 rounded-md border-b-2 border-white shadow-lg">
							<div className=" flex items-center justify-center flex-col">
								<div className=" skeleton rounded-full w-20 h-20 overflow-hidden mb-4">
									<img
										className="border-white border-2 rounded-full w-full h-full object-cover"
										src={author.profilepic || "/placeholder.png"}
										onLoad={(e) =>
											e.target.parentElement.classList.remove("skeleton")
										}
									/>
								</div>
								<h3 className="text-xl font-bold font-galindo text-amber-200">
									{author.username || <p className="skeleton skeleton-text"></p>}
								</h3>
						
								<p className="mb-2 font-limelight">{author.tagline || <span className="skeleton skeleton-text"></span>}</p>
								<p className="mb-2 font-limelight">
									{numpost || <span className="skeleton skeleton-text"></span>} Post . {followers} Followers
								</p>
								<button
								onClick={handlefollow}
									type="button"
									className="text-white w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
								>
									{isfollowing? "✔ Following" :"+ Follow"}
								</button>
							</div>
						</div>

						{/* Support the Author Section */}
						<div className="support-author text-white mt-4 p-4 rounded-md flex items-center justify-center flex-col border-b-2 border-white shadow-lg">
							<h3 className="text-xl font-galindo font-bold">
								Support{" "}
								<span className="text-amber-200">
									{author.username || "Author"}
								</span>
							</h3>
							<p className="text-lg mt-2 font-limelight">
								Consider supporting{" "}
								<span className="font-bold text-amber-200 underline">
									{author.username || "Author"}
								</span>{" "}
								by donating and get access to{" "}
								<span className="font-bold">🔒 12</span> exclusive content.
							</p>
							<Link href={`/${username}`}>
								<button
									type="button"
									className="text-white  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
								>
									Donate
								</button>
							</Link>
							<p className="text-sm mt-2">{contributor } Contributors</p>
						</div>

						{/* Recent Posts Section */}
						<div className="recent-posts text-white mt-4 p-4 rounded-md">
							<h4 className="text-lg font-semibold">Recent Posts</h4>
							<ul className="mt-2 space-y-2">
								{author.recentPosts?.length > 0 ? (
									author.recentPosts.map((post, index) => (
										<li key={index} className="text-sm hover:underline">
											{post.title}
										</li>
									))
								) : (
									<p className="text-sm ">No recent posts available.</p>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>

	);
};

export default page;

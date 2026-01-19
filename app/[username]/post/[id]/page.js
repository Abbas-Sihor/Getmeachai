"use client";
import { findpost, fetchUser, likepost, addcommnet, fetchComments, fetchrecenthpost, followUser } from "@/actions/useraction";
import { useSession } from "next-auth/react";
import {
	faHeart,
	faComment,
	faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillLike ,AiOutlineLike} from "react-icons/ai";

import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import Loading from "./loading";

const page = ({ params }) => {
	const { username, id } = use(params);
	const [author, setAuthor] = useState({});
	const [post, setpost] = useState([]);
	const [recentpost, setrecentpost] = useState([]);
	const [comments, setcomment] = useState([]);
	const [likecount, setlikecount] = useState();
	const [userlike, setuserlike] = useState(false);
	const [commenttoadd, setcommenttoadd] = useState('');
	const [commentcount, setcommentcount] = useState();
	const [followers,setfollowers]=useState()
	const [isfollowing,setisfollowing]=useState(false)
	const [isLoaded, setIsLoaded] = useState(false);
	const [user,setUser]=useState({})
	const { data: session } = useSession();
	useEffect(() => {
		getdata();
	}, [session]);
	const getdata = async () => {
		let data = await fetchUser(username);
		setAuthor(data);
		setfollowers(data?.followers)
		let userdata = await fetchUser(session?.user?.name);
		setUser(userdata);
		let postdata = await findpost(id);
		setpost(postdata);
		setlikecount(postdata?.likecount);
		let commentdata = await fetchComments(id);
		setcommentcount(commentdata?.length)
		setcomment(commentdata);
		let recentpostdata = await fetchrecenthpost(username,id)
		console.log(recentpostdata)
		setrecentpost(recentpostdata)

		//check if the user has already liked the post or not
		try {
			if (postdata?.likeby.includes(session?.user?.name)) {
				setuserlike(true);
			}
		} catch (error) {
			console.log(error);
		}
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
			return <Loading/>
		}

	const handlelike = async () => {
		
		if (!user){
			return
		}
		await likepost(id, session?.user?.name);
		
			if (userlike) {
				setlikecount(likecount - 1);
			} else {
				setlikecount(likecount + 1);
			}
			setuserlike(!userlike);
		
	};

	const addcomment=async()=>{
		const comment = await addcommnet(id,session?.user?.name,commenttoadd)
		let commentdata = await fetchComments(id);
		setcommentcount(commentdata.length)
		setcomment(commentdata);
		setcommenttoadd("")		

	}
	const handlefollow=async()=>{
			console.log("i am here")
			if(!user){
				return
			}
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
	<div className="flex flex-col lg:flex-row h-auto lg:h-screen">
		{/* Main Content */}
		<div className="w-full lg:w-[75%] overflow-auto scrollbar-none">
			<div className="flex flex-col p-4 sm:p-6">
				{/* Main Post */}
				<div className="post bg-gray-800 p-4 rounded-lg shadow-lg">
					<h3 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-4">{post.title}</h3>
					<img className="w-full h-auto object-cover rounded-lg border-dotted border-white border-2" src={post.coverpic} alt="Thumbnail" />
					<p className="text-white mt-5 text-base sm:text-xl leading-7 sm:leading-9 whitespace-pre-wrap">{post.maincontext}</p>
					<p className="mt-2 text-slate-500">{post.updatedAt}</p>
					<p className="mt-2 text-slate-500">~By <Link href={`/${username}/post`}><span className="font-bold underline">{post.username}</span></Link></p>
					<div className="flex gap-4 mt-4">
						<i className="relative group text-blue-500 cursor-pointer" onClick={handlelike}>
							{likecount} {userlike ? <AiFillLike className="ml-1 inline" /> : <AiOutlineLike className="ml-1 inline" />}
							<span className="absolute left-1/2 -translate-x-1/2 -top-8 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
    {user ? "" : "Login to like"}
  </span>
						</i>
						<i className="text-blue-500 cursor-pointer">
							{commentcount} <FontAwesomeIcon icon={faComment} className="ml-1" />
						</i>
					</div>
				</div>

				<h3 className="text-white text-2xl sm:text-3xl mt-10 text-center">
					Recent Posts From <span className="font-bold">{post.username}</span>
				</h3>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 p-4">
					{recentpost?.length > 0 ? recentpost.slice(0,3).map((post) => (
						<div className="post bg-gray-800 p-4 rounded-lg shadow-lg" key={post._id}>
							<div>
								<img className="w-full h-56 object-cover rounded-lg" src={post.thumbnail} alt="Thumbnail" />
								<h3 className="title text-xl font-bold text-white mt-4 line-clamp-3">{post.title}</h3>
								<p className="text-gray-400 mt-2 line-clamp-1">{post.description}</p>
								<p className="text-slate-500 mt-1">{post.createdAt}</p>
								<Link href={`/${username}/post/${post._id}`}>
									<button className="mt-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90">
										Read More
									</button>
								</Link>
							</div>
						</div>
					)) : (
						<p className="text-white col-span-full">No Recent Post Available Except This :)</p>
					)}
				</div>
			</div>
		</div>

		{/* Sidebar */}
		<div className="w-full lg:w-[25%] bg-slate-900 px-4 pt-4 pb-10 overflow-y-auto scrollbar-none">
			{/* Profile and Comments */}
			<div className="flex flex-col gap-6">
				{/* Profile Section */}
				<div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
					<h1 className="text-xl font-bold text-white">{post.title}</h1>
					<div className="flex items-center justify-between text-sm text-gray-400">
						<div className="flex items-center gap-3">
							<img src={author.profilepic || "placeholder.png"} alt="Author Avatar" className="w-8 h-8 rounded-full" />
							<Link href={`/${username}/post`}><span>By {post.username}</span></Link>
						</div>
						<span>{post.updatedAt}</span>
					</div>
					<p className="text-white">{post.description}</p>
					<div className="flex flex-wrap gap-2">
						{post?.tags?.length > 0 ? post.tags.map((tag, index) => (
							<span key={index} className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">{tag}</span>
						)) : <p>No tags available</p>}
					</div>
					<div className="flex gap-4 mt-4">
						<i
  className="relative text-blue-500 cursor-pointer group"
  onClick={handlelike}
>
  {likecount}{" "}
  {userlike ? (
    <AiFillLike className="ml-1 inline" />
  ) : (
    <AiOutlineLike className="ml-1 inline" />
  )}

  {/* Tooltip */}
  <span className="absolute left-1/2 -translate-x-1/2 -top-8 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
    {user ? "" : "Login to like"}
  </span>
</i>

						<i className="text-blue-500 cursor-pointer">
							{commentcount} <FontAwesomeIcon icon={faComment} className="ml-1" />
						</i>
					</div>
					<div className="mt-6">
						<h3 className="text-white font-bold mb-3">Action</h3>
						<ul className="space-y-2">
							<Link href={`/${username}`} className="text-blue-500 underline">Support The Author</Link>
							<p onClick={handlefollow} className={user?"text-blue-500 underline cursor-pointer":"cursor-not-allowed text-blue-500 underline"}>
								{isfollowing ? "Unfollow" : "Follow"} The Author
							</p>
							<p className="text-slate-500">{followers} Followers</p>
						</ul>
					</div>
				</div>

				{/* Comment Section */}
				{user ? <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
					<h3 className="text-xl font-bold text-white">Comments</h3>
					<div className="flex flex-col sm:flex-row gap-3 items-start sm:items-stretch">
						<img src={user.profilepic || "/placeholder.png"} alt="User Avatar" className="w-10 h-10 rounded-full" />
						<textarea
							className="flex-grow bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							rows="3"
							placeholder="Write a comment..."
							value={commenttoadd}
							onChange={(e) => setcommenttoadd(e.target.value)}
						></textarea>
						<button onClick={addcomment} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
							Post
						</button>
					</div>

					<div className="space-y-4">
						{comments?.length > 0 ? comments.map((comment) => (
							<div className="flex gap-3 items-start" key={comment._id}>
								<img src={comment.userProfilePic} alt="Commenter Avatar" className="w-10 h-10 rounded-full" />
								<div className="bg-gray-900 p-4 rounded-lg flex-grow">
									<h4 className="font-bold text-blue-400">{comment.username}</h4>
									<p className="text-white">{comment.content}</p>
									<div className="text-sm text-gray-500 mt-2">{comment.createdAt}</div>
								</div>
							</div>
						)) : (
							<p className="text-lg text-white">No Comments...Type Something To Start A Conversation</p>
						)}
					</div>
				</div>: <p className="text-white font-semibold">Login to add and view comment</p>}
			</div>
		</div>
	</div>
);

};

export default page;

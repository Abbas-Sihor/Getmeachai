import {
	faHeart,
	faComment,
	faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillLike} from "react-icons/ai";

export default function Loading() {
  return(
    <>
			<div className="flex h-screen">
				{/* Main Content */}
				<div className="w-[75%] overflow-auto scrollbar-none">
					<div className="flex flex-col p-6">
						{/* <!-- Main Post --> */}
						<div className="post bg-gray-800 p-4 rounded-lg shadow-lg">
							<h3 className="title text-3xl font-bold text-white mt-4 mb-20 skeleton skeleton-text">
								
							</h3>
              <div className="skeleton">
							<img
								className="thumbnail w-auto h-auto object-cover rounded-lg border-dotted border-white border-2"
								
								
							/>
              </div>
							<p className="text-white mt-5 text-xl leading-9 whitespace-pre-wrap skeleton mb-5 skeleton-text">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-2">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-5 w-[80%]">
							</p>
							
							<p className="mt-2 text-slate-500 skeleton skeleton-text"></p>
							<p className="mt-2 text-slate-500 skeleton skeleton-text">
							</p>
							<div className="flex gap-4 mt-4">
								<i
									className="text-blue-500 cursor-pointer"
									
								>
								 <AiFillLike className="ml-1 inline" /> 
								</i>
								<i className="text-blue-500 cursor-pointer">
									<FontAwesomeIcon icon={faComment} className="ml-1" />
								</i>
							</div>
						</div>
						<h3 className="text-white text-3xl mt-10 text-center skeleton skeleton-text">
							
						</h3>
						<div className="grid grid-cols-3 gap-10 p-6 skeleton ">
							{/* <!-- Post 1 --> */}
							{/* <div className="post bg-gray-800 p-4 rounded-lg shadow-lg">
								<div className="post1 skeleton rounded-lg">
									<img
										className="thumbnail w-full h-56 object-cover rounded-lg"
										
										
									/>
									<h3 className="title text-xl font-bold text-white mt-4 line-clamp-3 skeleton skeleton-text">
										
									</h3>
									<p className="description text-gray-400 mt-2 line-clamp-1 skeleton skeleton-text">
									
									</p>
									<p className="text-slate-500 mt-1 skeleton skeleton-text"></p>
									<button
										type="button"
										className="mt-3 p-5 text-white w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
									>
										Read More
									</button>
								</div>
							</div> */}

							{/* <!-- Post 2 --> */}
							{/* <div className="post bg-gray-800 p-4 rounded-lg shadow-lg">
								<div className="post1 skeleton rounded-lg">
									<img
										className="thumbnail w-full h-56 object-cover rounded-lg"
								
										
									/>
									<h3 className="title text-xl font-bold text-white mt-4 line-clamp-3 skeleton skeleton-text">
									
									</h3>
									<p className="description text-gray-400 mt-2 line-clamp-1 skeleton skeleton-text">
							
									</p>
									<p className="text-slate-500 mt-1 skeleton skeleton-text"></p>
									<button
										type="button"
										className="mt-3 p-5 text-white w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
									>
										Read More
									</button>
								</div>
							</div> */}

							{/* post-3 */}
							{/* <div className="post bg-gray-800 p-4 rounded-lg shadow-lg">
								<div className="post1 skeleton rounded-lg">
									<img
										className="thumbnail w-full h-56 object-cover rounded-lg"
										
										
									/>
									<h3 className="title text-xl font-bold text-white mt-4 line-clamp-3 skeleton skeleton-text">
									
									</h3>
									<p className="description text-gray-400 mt-2 line-clamp-1 skeleton skeleton-text">
										
									</p>
									<p className="text-slate-500 mt-1 skeleton skeleton-text"></p>
									<button
										type="button"
										className="mt-3 p-5 text-white w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
									>
										Read More
									</button>
								</div>
							</div> */}
						</div>
					</div>
				</div>

				{/* Sidebar */}
				<div className="flex h-screen w-[25%]">
					{/* Sidebar */}
					<div className=" overflow-y-scroll bg-slate-900  flex flex-col gap-3 mt-5 mb-5 scrollbar-none">
						{/* Profile Section */}
						<div className="post bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
							{/* Title */}
							<h1 className=" skeleton skeleton-text text-2xl heading font-bold text-white"></h1>

							{/* Author and Metadata */}
							<div className="flex items-center justify-between text-sm text-gray-400">
								<div className="flex items-center gap-3 skeleton rounded-full">
									<img
										
										
										className="w-8 h-8 rounded-full"
									/>
									
								</div>
								<span className="ml-3 skeleton skeleton-text"></span>
							</div>

							{/* Description */}
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-0.5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-0.5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-0.5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-0.5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-0.5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-0.5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-0.5">
							</p>
							<p className="text-white text-base leading-relaxed skeleton skeleton-text mb-0.5">
							</p>
							

							{/* Tags */}
							{/* <div className="flex gap-2">
								{post?.tags?.length > 0 ? (
									post?.tags.map((tag, index) => (
										<span
											key={index}
											className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm"
										>
											{tag}
										</span>
									))
								) : (
									<p>No tags available</p>
								)}
							
							</div> */}

							{/* Engagement Buttons */}
							<div className="flex items-center gap-6 mt-4">
								<button className="text-blue-500 flex items-center gap-1">
									<FontAwesomeIcon icon={faHeart} /> Like
								</button>
								<button className="text-blue-500 flex items-center gap-1">
									<FontAwesomeIcon icon={faComment} /> Comment
								</button>
								<button className="text-blue-500 flex items-center gap-1">
									<FontAwesomeIcon icon={faShareAlt} /> Share
								</button>
							</div>

							{/* Related Posts */}
							<div className="mt-6">
								<h3 className="text-white font-bold mb-3 skeleton skeleton-text"></h3>
								{/* <ul className="space-y-2">
									<Link
										href={`/${username}`}
										className="text-blue-500 underline cursor-pointer"
									>
										Support The Author
									</Link>
								</ul> */}
							</div>
						</div>
						<div className="commentsection bg-gray-800 p-6 rounded-lg shadow-lg mt-6 space-y-4">
							{/* Comments Title */}
							<h3 className="text-xl font-bold text-white skeleton skeleton-text"></h3>

							{/* Comment Input */}
							<div className="flex gap-3 items-start skeleton rounded-full">
								<img
									
									className="w-10 h-10 rounded-full"
								/>
								<textarea
									className="flex-grow bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none skeleton skeleton-text"
									 cxz
									
								
								></textarea>
								<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
									Post
								</button>
							</div>

							{/* <div className="space-y-4">
								
							{comments?.length>0? (comments.map((comment)=>{
								return <div className="flex gap-3 items-start">
								<img
									src={comment.userProfilePic}
									alt="Commenter Avatar"
									className="w-10 h-10 rounded-full"
								/>
								<div className="bg-gray-900 p-4 rounded-lg flex-grow">
									<h4 className="font-bold text-blue-400">{comment.username}</h4>
									<p className="text-white">
										{comment.content}
									</p>
									<div className="text-sm text-gray-500 mt-2 flex gap-4">
										<span>{comment.createdAt}</span>
									</div>
								</div>
							</div>
							})) :(
								<p className="text-lg text-white">No Comments...Type Something To Start A Conversation</p>
							) }
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</>
  )
}

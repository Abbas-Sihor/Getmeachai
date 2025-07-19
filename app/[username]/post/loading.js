"use client";
import { fetchpost } from "@/actions/useraction";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { use, useEffect, useState } from "react";
export default function Loading({ username }) {
	const [numpost, setnumpost] = useState();
	const [loader,setLoader]=useState(true)
	useEffect(() => {
		getdata();
	}, []);

	const getdata = async () => {
		let postdata = await fetchpost(username);
		setnumpost(postdata.length);
		setLoader(false)
	};

	return (
		<div className="md:flex xl:flex md:h-screen xl:h-screen sm:flex-row">
			{/* Main Content */}
			<div className="w-full md:w-[75%] xl:w-[75%] overflow-auto scrollbar-none">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10 p-6">
					{/* <!-- Post 1 --> */}

					{
					Array.from({ length: numpost }).map((_, index) => (
								<div
									
									className="post bg-gray-800 p-4 rounded-lg shadow-lg"
								>
									<div className="post1">
										<div className="w-full h-56 rounded-lg skeleton">
										<img
											className="thumbnail w-full h-56 object-cover rounded-lg"
									
											
										/>
										</div>
										<h3 className="title text-xl font-bold text-white mt-4 skeleton skeleton-text">
											
										</h3>
										<p className="description text-white mt-2 line-clamp-2 skeleton skeleton-text">
											
										</p>
										<p className="text-gray-400 mt-2 line-clamp-1 skeleton skeleton-text">
											
										</p>
										
											<button
												type="button"
												className="mt-3 p-5 text-white w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
											>
												Read More
											</button>
										
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
								))}

				


				</div>
			</div>
			{/* Sidebar */}
			<div className="w-full flex h-screen  md:w-[25%] xl:w-[25%]">
				{/* Sidebar */}
				<div className=" overflow-y-scroll bg-slate-900  flex flex-col gap-3 mt-5 mb-5 scrollbar-none w-[100%]">
					{/* Profile Section */}
					<div className="profile text-white p-5 rounded-md border-b-2 border-white shadow-lg ">
						<div className=" flex items-center justify-center flex-col">
							<div className=" skeleton rounded-full w-20 h-20 overflow-hidden mb-4 ">
								<img
									className="border-white border-2 rounded-full w-full h-full object-cover"
									src={"/placeholder.png"}
								/>
							</div>
							<h3 className=" skeleton skeleton-text text-xl font-bold font-galindo text-amber-200 "></h3>

							<p className=" skeleton skeleton-text mb-2 font-limelight"></p>
							<p className="mb-2 font-limelight skeleton skeleton-text"></p>
							<button
								type="button"
								className="text-white w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
							>
								+Follow
							</button>
						</div>
					</div>

					{/* Support the Author Section */}
					<div className="support-author text-white mt-4 p-4 rounded-md flex items-center justify-center flex-col border-b-2 border-white shadow-lg">
						<h3 className="text-xl font-galindo font-bold skeleton skeleton-text"></h3>
						<p className="text-lg mt-2 font-limelight skeleton skeleton-text mb-2">
							{" "}
						</p>

						<button
							type="button"
							className="text-white  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
						>
							Donate
						</button>

						<p className="text-sm mt-2 skeleton skeleton-text"></p>
					</div>

					{/* Recent Posts Section */}
					<div className="recent-posts text-white mt-4 p-4 rounded-md">
						<h4 className="text-lg font-semibold">Recent Posts</h4>
						<ul className="mt-2 space-y-2">
							<li className="text-sm hover:underline skeleton skeleton-text"></li>

							<p className="text-sm skeleton skeleton-text"></p>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

"use client";

import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import {
	fetchUser,
	fetchPostFromFollowedAuthors,
	fetchTrendingPosts,
	fetchTreandingAuthor,
} from "@/actions/useraction";
import { TbWriting } from "react-icons/tb";
import { NotebookPen, SettingsIcon, UserCircle } from "lucide-react";
import { Heart, MessageCircle } from "lucide-react";
import Masonry from "react-masonry-css";
import { useRouter } from "next/navigation";
import Loading from "./loading";

const HomePage = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [user, setUser] = useState({});
	const [followedPosts, setFollowedPosts] = useState([]);
	const [trendingPosts, setTrendingPosts] = useState({});
	const [recommendedAuthors, setRecommendedAuthors] = useState([]);
	const [message, setMessage] = useState(false);
	const [loadinng, setLoadinng] = useState(true);

	useEffect(() => {
		if (!session) {
			router.push("/");
		}
		const fetchData = async () => {
			if (!session?.user?.name) return;
			const fetchedUser = await fetchUser(session.user.name);
			setUser(fetchedUser);

			const posts = await fetchPostFromFollowedAuthors(session.user.name);
			if (posts.message) {
				setMessage(true);
			}
			const trending = await fetchTrendingPosts();
			const filterfollowpost = posts.posts.filter(
				(post) => post._id !== trending.posts[0]._id,
			);
			setFollowedPosts(filterfollowpost);
			setTrendingPosts(trending.posts[0]);

			const authors = await fetchTreandingAuthor(session.user.name);

			setRecommendedAuthors(authors);

			setLoadinng(false);
		};
		fetchData();
	}, [session?.user?.name]);
	console.log(trendingPosts);

	if (loadinng) {
		return <Loading />;
	}
function timeAgo(createdAt) {
  return formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
}

	return (
		<div className="flex min-h-screen  text-white">
			{/* Sidebar */}
			<aside className="w-60 p-5 border-r border-white/10 backdrop-blur-lg rounded-xl hidden lg:flex flex-col gap-6 ">
				{/* User Info */}
				<div className="flex items-center gap-3">
					<img
						src={user.profilepic || session?.user?.image}
						alt="profile"
						className="w-12 h-12 rounded-full object-cover"
					/>
					<div>
						<p className="font-semibold">{session?.user?.name}</p>
						<p className="text-sm text-white/60">User</p>
					</div>
				</div>

				{/* Actions */}
				<div className="flex flex-col gap-2">
					<button
						className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition"
						onClick={() => router.push("/createpost")}
					>
						<NotebookPen size={18} />
						Create Post
					</button>
					<button
						className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition"
						onClick={() => router.push("/dashboard")}
					>
						<SettingsIcon size={18} />
						Settings
					</button>
				</div>

				{/* Following */}
				<div className="mt-5">
					<p className="text-center mb-2 font-medium">Authors You Follow</p>
					<div className="flex flex-col gap-2">
						{user.following?.length ? (
							user.following.map((author, idx) => (
								<div
									key={idx}
									className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
									onClick={() => router.push(`/${author}/post`)}
								>
									<UserCircle size={18} />
									<span className="text-sm">{author}</span>
								</div>
							))
						) : (
							<p className="text-xs text-white/50 text-center">
								No authors followed yet
							</p>
						)}
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 p-6">
				<div className="flex flex-col lg:flex-row gap-6 w-full">
					{/* LEFT – FOLLOWED POSTS */}
					<div className="flex flex-col gap-4 w-full lg:w-[40%]">
            <h1 className="text-2xl font-limelight">{message?"Recommended and Trending Post":"Post From Author You Follow"}</h1>
						{followedPosts?.map((post) => (
							<div
								key={post._id}
								onClick={() =>
									router.push(`/${post.author.username}/post/${post._id}`)
								}
								className="rounded-2xl bg-gray-800 p-5 shadow-sm flex flex-col md:flex-row gap-4 cursor-pointer"
							>
								{/* CONTENT */}
								<div className="flex flex-col justify-between flex-1 gap-3">
									<h2 className="font-serif text-white text-lg md:text-[22px]">
										{post.title}
									</h2>

									<div className="flex items-center gap-2 text-xs text-gray-400">
										<img
											src={post.author.profilepic}
											className="w-7 h-7 rounded-full"
										/>
										<span>{post.author.username}</span>
										<span>•</span>
										<span>{timeAgo(post.createdAt)}</span>
									</div>

									<p className="text-sm text-gray-400 line-clamp-3">
										{post.description}
									</p>

									<div className="border-t border-gray-700 pt-2 flex gap-5 text-gray-400">
										<div className="flex items-center gap-1 text-sm">
											<Heart size={16} />
											<span>{post.likecount}</span>
										</div>
										<div className="flex items-center gap-1 text-sm">
											<MessageCircle size={16} />
											<span>6</span>
										</div>
									</div>
								</div>

								{/* IMAGE */}
								<div className="w-full md:w-56 aspect-[16/9] rounded-xl overflow-hidden flex-shrink-0">
									<img
										src={post.thumbnail}
										className="w-full h-full object-cover"
									/>
								</div>
							</div>
						))}
					</div>

					{/* RIGHT SECTION */}
					<div className="flex-1 flex flex-col gap-10">
              
						{/* TRENDING POST */}
						<div
							className="w-full p-6 rounded-2xl bg-white/90 shadow-lg cursor-pointer"
							onClick={() =>
								router.push(
									`/${trendingPosts?.author?.username}/post/${trendingPosts?._id}`,
								)
							}
						>
							<div className="relative aspect-[16/9] rounded-xl overflow-hidden">
								<img
									src={trendingPosts?.thumbnail}
									className="w-full h-full object-cover"
								/>
								<div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
									🔥 TRENDING POST
								</div>
							</div>

							<div className="pt-4 space-y-3">
								<h2 className="text-xl font-bold text-gray-900">
									{trendingPosts?.title}
								</h2>

								<p className="text-gray-600 line-clamp-3">
									{trendingPosts?.description}
								</p>

								<div className="flex text-sm text-gray-500">
									❤️ {trendingPosts?.likecount} Likes
								</div>

								<div className="flex justify-between text-xs text-gray-400">
									<span>Author: {trendingPosts?.author?.username}</span>
									<span>{timeAgo(trendingPosts?.createdAt)}</span>
								</div>
							</div>
						</div>

						{/* RECOMMENDED AUTHORS */}
                <h1 className="text-2xl font-limelight text-center">Recommended Authors</h1>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{recommendedAuthors?.map((author) => (
								<div
									key={author._id}
									className="bg-gray-800 p-6 rounded-2xl flex flex-col gap-4"
								>
									<div className="flex gap-4 items-center">
										<img
											src={
												author.profilepic ||
												"https://img.freepik.com/free-icon/man_318-233556.jpg"
											}
											className="w-10 h-10 rounded-full"
										/>
										<div>
											<p className="text-white">{author.username}</p>
											<p className="text-gray-400 text-sm">{author.name}</p>
										</div>
									</div>

									<p className="text-gray-400 text-sm line-clamp-2">
										{author.tagline}
									</p>

									<div className="flex justify-between items-center">
										<p className="text-sm text-gray-400">
											Followers <span>{author.followers}</span>
										</p>
										<button
											className="px-4 py-2 text-sm rounded-full bg-black text-white hover:bg-gray-800"
											onClick={() => router.push(`/${author.username}/post`)}
										>
											View Profile
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default HomePage;

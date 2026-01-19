"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchpost, fetchUser, fetchUserPayments } from "@/actions/useraction";
import { useSession } from "next-auth/react";
import { underline } from "fontawesome";

// const user = {
//   name: "Abbas Sihorwala",
//   profileImage: "https://img.freepik.com/free-icon/man_318-233556.jpg",
//   posts: [
//     {
//       id: 1,
//       title: "My First Post",
//       description: "This is my first post on this platform.",
//     },
//     {
//       id: 2,
//       title: "Learning Next.js",
//       description: "Next.js App Router is really powerful.",
//     },
//   ],
//   following: [
//     {
//       id: 1,
//       name: "John Doe",
//       tagline: "Tech Writer & Blogger",
//       image: "https://img.freepik.com/free-icon/man_318-233556.jpg",
//     },
//     {
//       id: 2,
//       name: "Sarah Smith",
//       tagline: "Frontend Developer",
//       image: "https://img.freepik.com/free-icon/man_318-233556.jpg",
//     },
//   ],
//   contributions: [
//     {
//       id: 1,
//       amount: 500,
//       to: "John Doe",
//       message: "Loved your article on React optimization!",
//       image: "/author1.jpg",
//     },
//     {
//       id: 2,
//       amount: 250,
//       to: "Sarah Smith",
//       message: "Thanks for the helpful UI tips 🙌",
//       image: "/author2.jpg",
//     },
//   ],
// };

const contributions = [
    {
      name: "Rahul Sharma",
      amount: "₹500",
      message: "Keep building amazing things!",
      avatar: "/user1.jpg",
    },
    {
      name: "Ayesha Khan",
      amount: "₹1000",
      message: "Proud to support your work 🚀",
      avatar: "/user2.jpg",
    },
  ];

  const followers = [
    {
      name: "Mohit Verma",
      tagline: "Frontend Developer",
      avatar: "/user3.jpg",
    },
    {
      name: "Sara Ali",
      tagline: "Tech Writer",
      avatar: "/user4.jpg",
    },
  ];
export default function ProfilePage() {
	const { data: session } = useSession();
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);
	const [payments, setPayments] = useState([]);
  const [patronsContribution, setPatronsContribution]=useState([])
  const [page,setPage]=useState(1)
	const router = useRouter();
	useEffect(() => {
		const getData = async () => {
			const user = await fetchUser(session?.user?.name);
			setUser(user);
			const posts = await fetchpost(session?.user?.name);
			setPosts(posts);
			const payments = await fetchUserPayments("who", user?._id);
			setPayments(payments);
			const patrons = await fetchUserPayments("to_user", session?.user?.name);
      console.log(patrons)
			setPatronsContribution(patrons);
		};
		getData();
	}, [session?.user?.name]);

  const getTotalAMount =(array)=>{
    let amount =0
    for (let i = 0; i < array.length; i++) {
       amount+= array[i].amount;
      
    }
    return amount 

  }
	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
			{/* User Profile */}
			<div className="flex items-center gap-4 mb-10">
				<img
					src={user?.profilepic}
					alt="User Profile"
					className="h-16 w-16 rounded-full object-cover"
				/>
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-bold ">{user?.name}</h1>
					<h1 className="text-2xl text-gray-400 font-semibold ">
						{user?.username}
					</h1>
				</div>
				<p
					className="underline text-gray-500 text-sm cursor-pointer "
					onClick={() => router.push("/dashboard")}
				>
					Chnage?
				</p>
			</div>

			<div className="flex flex-row justify-evenly text-bold text-xl text-white">
				<h1 className={`cursor-pointer bg-gray-500 rounded-md p-2 ${page===1?"underline":""}`} onClick={()=>setPage(1)}>Activity</h1>
				<h1 className={`cursor-pointer bg-gray-500 rounded-md p-2 ${page===2?"underline":""}`} onClick={()=>setPage(2)}>Insight</h1>
			</div>
			{/* User Posts */}
      {page===1?<div>
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Your Posts</h2>

				<div className="space-y-4">
					{posts ? (
						posts.map((post) => (
							<div
								key={post?._id}
								className="border rounded-lg p-4 hover:shadow transition cursor-pointer"
								onClick={() =>
									router.push(`/${session?.user?.name}/post/${post?._id}`)
								}
							>
								<h3 className="text-lg font-semibold">{post?.title}</h3>
								<p className="text-gray-600 mt-1 line-clamp-2">
									{post?.description}
								</p>
							</div>
						))
					) : (
						<div>
							<p>
								No post :){" "}
								<span
									className="underline cursor-pointer"
									onClick={() => router.push("/createpost")}
								>
									Create Your First Post
								</span>
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Contributions Section */}
			<section>
				<h2 className="text-2xl font-semibold ">Your Contributions</h2>
				<h2 className="text-xl font-semibold mb-4 text text-green-600 text-right">Total Amount Contributed: {getTotalAMount(payments)}</h2>
        
				<div className="space-y-4">
					{payments ? (
						payments.map((contribution) => (
							<div
								key={contribution._id}
								className="flex items-center justify-between border rounded-lg p-4 hover:shadow transition"
							>
								<div className="flex items-center gap-4">
									<img
										src={
											contribution?.image ||
											"https://img.freepik.com/free-icon/man_318-233556.jpg"
										}
										alt={contribution?.to || "paymentTo profilePic"}
										className=" w-8 h-8 rounded-full object-cover"
									/>
									<div>
										<p className="font-medium">
											You Contributed to{" "}
											<span className="font-bold ">
												{contribution?.to_user}
											</span>
										</p>
										<p className="text-sm text-gray-500">
											“{contribution?.message}”
										</p>
									</div>
								</div>

								<div className="text-green-600 font-semibold">
									₹{contribution?.amount}
								</div>
							</div>
						))
					) : (
						<div>
							<p className=" text-md text-gray-400">
								Support Your favourite Creator Now And Become a PATRON !!!
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Following Authors */}
			<section>
				<h2 className="text-2xl font-semibold mb-4">Following</h2>

				<div className="grid sm:grid-cols-2 gap-4">
					{user?.following ? (
						user?.following.map((author) => (
							<div
								key={author}
								className="flex items-center gap-4 border rounded-lg p-4 hover:shadow transition cursor-pointer"
								onClick={() => router.push(`/${author}/post`)}
							>
								<img
									src={
										author?.image ||
										"https://img.freepik.com/free-icon/man_318-233556.jpg"
									}
									alt={author?.name || "name"}
									className="h-10 w-15 rounded-full object-cover"
								/>
								<div>
									<h3 className="font-semibold">{author}</h3>
								</div>
							</div>
						))
					) : (
						<div>
							<p className="text-md text-gray-400">
								You dont follow anyone :) Follow Your favourite creator to show
								them your support
							</p>
						</div>
					)}
				</div>
			</section>
      </div>:
      <div className="space-y-8">

      {/* ===== Contributions Section ===== */}
      <div className="rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">PATRONS ANd their Contributions</h2>
        <p className="text-gray-600 mb-4">
          Total Raised: <span className="font-bold text-xl mb-4 text-green-600">₹{getTotalAMount(patronsContribution)}</span>
        </p>

        <div className="space-y-4">
          {patronsContribution?patronsContribution.map((c) => (
            <div key={c._id} className="flex gap-4 items-start border-b pb-4 last:border-none" onClick={()=>router.push(`/${c?.who?.username}`)}>
              <img
                src={c?.who?.profilpic ||" https://img.freepik.com/free-icon/man_318-233556.jpg" }
                className="w-10 h-10 rounded-full object-cover"
                alt={c?.name}
              />
              <div>
                <p className="font-medium">{c?.name}</p>
                <p className="text-sm text-gray-500">
                  Contributed <span className="font-semibold">{c?.amount}</span>
                </p>
                <p className="text-sm text-gray-200 italic">"{c?.message}"</p>
              </div>
            </div>
          )):<div className="text-center bg-gray-50 border border-dashed rounded-xl p-6">
  <p className="text-lg font-semibold text-gray-700">
    No one has contributed yet 🙂
  </p>

  <p className="mt-2 text-gray-400 text-sm">
    The right people will find you at the right time.
  </p>

  <p className="text-gray-400 text-sm">
    Don’t lose hope and keep up the good work.
  </p>

  <p className="mt-4 font-medium text-gray-600">
    All the best, <span className="font-semibold">CHAMP!</span> 💪
  </p>
</div>
}
        </div>
      </div>

      {/* ===== Followers Section ===== */}
      <div className="rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Followers</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user?.followby? user?.followby.map((f) => (
            <div key={f} className="flex items-center gap-4 border rounded-lg p-3">
              <img
                src={f.avatar  ||" https://img.freepik.com/free-icon/man_318-233556.jpg"}
                className="w-12 h-12 rounded-full object-cover"
                alt={f}
              />
              <div>
                <p className="font-medium">{f}</p>
               
              </div>
            </div>
          )): <p className="text-lg font-semibold text-gray-700">
    No one has follow you yet :)
  </p>}
        </div>
      </div>

    </div>
      }
		</div>
	);
}

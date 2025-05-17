"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { fetchPayment, fetchUser, initiate } from "@/actions/useraction";
import { ToastContainer, toast,Bounce,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { user } from "fontawesome";
const Paymentpage = ({ username }) => {
    const router = useRouter();
		 const { data: session } = useSession();

  const searchParams = useSearchParams()
	useEffect(() => {
		getData();
	}, [session]);
useEffect(()=>{
  if(searchParams.get("paymentdone") == "true"){
  toast('Grateful For Your Contribution!!!', {
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
    router.push(`/${username}`)
}
},[])
	function capitalizeWords(message) {
		if (!message || typeof message !== "string") {
			return "";
		}
		return message
			.split(" ") // Split the message into words
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
			.join(" "); // Join the words back into a single string
	}

	const [contributor, setcontributor] = useState({name:"",email:"",contact:""});
	const [paymentform, setPaymentform] = useState({
		name:"" ,
		message: "",
		amount: "",
	});
	const [currentuser, setCurrentuser] = useState({});
	const [payments, setPayments] = useState({});
	const [issubmitted, setsubmit] = useState(false);

	const handlechange = (e) => {
		setsubmit(false);
		setPaymentform((prev) => ({ ...prev, name: contributor?.name || "" }));
        
		setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
	};

	const getData = async () => {
		let user = await fetchUser(username);
		setCurrentuser(user);
		let x = await fetchPayment(username);
		setPayments(x);
		let dataofcontributor = await fetchUser(session?.user?.name)
		setcontributor(dataofcontributor)
	};

	const pay = async (amount) => {
		setsubmit(true);
		if (contributor?.name?.length < 3 || paymentform.message?.length < 4) {
			console.error("Validation failed: Name is too short");
			return; // Stop further execution
		}
		if (!contributor?.contact) {
			toast.error('Update Your Profile .... Contact No Missing ', {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Slide,
				});
				setTimeout(() => {
					router.push("/dashboard");
				}, 3000); // Redirect to home if no session
				return
			
		}

				if (!session) {
					toast.error('Please Login To Continue', {
						position: "top-center",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition: Slide,
						});
						setTimeout(() => {
							router.push("/login");
						}, 3000); // Redirect to home if no session
						return
					
				}
				if (!currentuser?.razorpayid || !currentuser?.razorpaysecret ) {
					toast.error('User is not accepting payment right now', {
						position: "top-center",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition: Slide,
						});
						// setTimeout(() => {
						// 	router.push("/login");
						// }, 3000); // Redirect to home if no session
						return
					
				}
				
		let a = await initiate(amount, username, paymentform ,contributor?.name);
		let orderId = a.id;
		var options = {
			key: currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
			amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			currency: "INR",
			name: "Get Me A Chai", //your business name
			description: "Test Transaction",
			image: "https://example.com/your_logo",
			order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
			prefill: {
				//We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
				name: contributor?.name, //your customer's name
				email: contributor?.email,
				contact: contributor?.contact || 90000000000, //Provide the customer's phone number for better conversion rates
			},
			notes: {
				address: "Razorpay Corporate Office",
			},
			theme: {
				color: "#3399cc",
			},
		};

		var rzp1 = new Razorpay(options);
		rzp1.open();
	};
	return (
		<>
      <ToastContainer />
			<Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

			<div className="w-full relative border-t-2">
  <img
    className="w-full object-cover h-[50vh] sm:h-[40vh] md:h-[50vh]"
    src={currentuser.coverpic}
    alt="Cover"
  />
  <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-36 h-36 overflow-hidden">
    <img
      className="border-white border-2 rounded-[50px] w-full h-full object-cover"
      src={currentuser.profilepic}
      alt="Profile"
    />
  </div>
</div>

			<div className="info text-[#fffbe1] my-24 flex flex-col items-center justify-center gap-2">
				<div className="name  font-bold text-2xl">@{username}</div>
				<div className="tagline text-slate-400">{currentuser.tagline}.</div>
				<div className="contribution text-slate-400">
					15,632 members . 93 Posts . $16,490/release
				</div>
				<Link href={`/${username}/post`}>
				<button
						type="button"
						className="text-white mt-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
					>
						Post From {username}
					</button>
					</Link>
			</div>
			<div className="flex flex-col md:flex-row w-[80%] p-5 gap-4 mx-auto">
				<div className="payment text-[#fffbe1] p-5 bg-slate-900 rounded-[50px] w-full md:w-1/2">
					<h2 className="font-bold text-center p-5 text-2xl">Supporters</h2>
					<ul>
						{payments && payments.length > 0 ? (
							payments.map((p, i) => (
								<li key={p._id || i} className="text-lg my-2">
									<span className="text-red-500">:-{p.name || "Anonymous"}</span>{" "}
									contributed{" "}
									<span className="text-red-500 font-bold">
										₹{p.amount || "0"}
									</span>{" "}
									with a message:{" "}
									<span className="text-red-500">
										{capitalizeWords(p.message) || "No message provided"}
									</span>
								</li>
							))
						) : (
							<li className="text-lg my-2 text-gray-500">
								No contributions found.
							</li>
						)}
					</ul>
				</div>
				<div className="makepayment mx-auto p-5 w-full md:w-1/2 bg-slate-900 rounded-[50px] shadow-md">
					{/* <div className="w-full max-w-md mx-auto p-5  "> */}
					<h2 className="text-xl text-white font-bold text-center mb-4">
						Make A Contribution
					</h2>

					{/* Name Input */}
					<div className="mb-4">
						<label
							className="block text-gray-500 font-medium mb-2"
							htmlFor="name"
						>
							Name
						</label>
						<input
							value={contributor?.name }
							id="name"
							type="text"
							name="name"
							readOnly
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your name"
						/>
						<span
							className={`${
								issubmitted && contributor?.name?.length < 3 ? "block" : "hidden"
							} text-red-600 font-bold`}
						>
							Enter Your Name!!!
						</span>
					</div>

					{/* Message Input */}
					<div className="mb-4">
						<label
							className="block text-gray-500 font-medium mb-2"
							htmlFor="message"
						>
							Message
						</label>
						<textarea
							value={paymentform.message}
							id="message"
							name="message"
							onChange={handlechange}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your message"
							rows="3"
						></textarea>
						<span
							className={`${
								issubmitted && paymentform.message?.length < 4
									? "block"
									: "hidden"
							} text-red-600 font-bold`}
						>
							Enter Your mesage!!!
						</span>
					</div>

					{/* Amount Input */}
					<div className="mb-4">
						<label
							className="block text-gray-500 font-medium mb-2"
							htmlFor="amount"
						>
							Amount
						</label>
						<input
							value={paymentform.amount}
							id="amount"
							type="number"
							name="amount"
							onChange={handlechange}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter amount"
						/>
						<span
							className={`${
								issubmitted && !paymentform.amount
									? "block"
									: "hidden"
							} text-red-600 font-bold`}
						>
							Enter Your Amount Or Use Quick Pay
						</span>
					</div>

					{/* Pay Button */}
					<button
						onClick={() => {
							pay(paymentform.amount * 100);
						}}
						type="button"
						className="text-white w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
					>
						Pay
					</button>

					{/* Quick Pay Buttons */}
					<div className="mt-6 text-center">
						<p className="text-gray-700 font-medium mb-2">Quick Pay:</p>
						<div className="flex flex-col md:flex-row justify-center gap-3">
							{[ 20, 25, 30].map((amount) => (
								<button
									onClick={() => pay(amount * 100)}
									disabled={
										contributor?.name?.length < 3 || paymentform.message < 4
									}
									key={amount}
									className={`px-4 py-2 rounded-md transition ${
										contributor?.name?.length < 3 || paymentform.message?.length < 4
											? "bg-gray-200 cursor-not-allowed"
											: "bg-gray-200 hover:bg-gray-500"
									}`}
								>
									₹{amount}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Paymentpage;

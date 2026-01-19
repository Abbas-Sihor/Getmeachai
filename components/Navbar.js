"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { fetchUser } from "@/actions/useraction";
import { Menu, X } from "lucide-react";

import { Search } from "lucide-react";

export default function Navbar() {
	const { data: session } = useSession();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [results, setResults] = useState({});
	const [query, setQuery] = useState("");

	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);

	const toggleDropdown = () => {
		setDropdownOpen((prev) => !prev);
	};

	const handleSearch = async () => {
		console.log("working");
		const user = await fetchUser(query);
		setResults(user);
		setIsModalOpen(true);
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSearch(); // Your function here
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target)
			) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const closeDropdownOnClick = () => {
		setDropdownOpen(false);
		setMobileMenuOpen(false);
	};
	return (
		<nav className="w-full border-b border-white/10 backdrop-blur-lg z-50 sticky top-0">
			<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
				<div className="flex items-center gap-2 font-semibold">
					<div className="w-8 h-8 bg-indigo-600 rounded-full" />
					<Link href={"/"}>Patronick</Link>
				</div>

				<div className="hidden md:flex gap-8 text-sm text-gray-300">
					<Link href={"/"}>Home</Link>
					<Link href={"/about"}>About</Link>
					<Link href={"/profile"}>Profile</Link>
				</div>

				<div className="flex items-center gap-3">
					<div className="hidden md:flex items-center bg-white/10 rounded-lg px-3 py-2">
						<input
							className="bg-transparent outline-none ml-2 text-sm"
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="ex: abbassihorwala53"
						/>
						<Search
							onClick={() => handleSearch()}
							size={16}
							className="cursor-pointer"
						/>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden flex flex-col gap-1 ml-2"
					>
						<span
							className={`h-0.5 w-6 bg-white transition-all ${
								mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
							}`}
						/>
						<span
							className={`h-0.5 w-6 bg-white transition-all ${
								mobileMenuOpen ? "opacity-0" : ""
							}`}
						/>
						<span
							className={`h-0.5 w-6 bg-white transition-all ${
								mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
							}`}
						/>
					</button>

					{/* Session Buttons */}
					{session ? (
						<>
							<button
								ref={buttonRef}
								onClick={toggleDropdown}
								className="hidden lg:flex items-center gap-2 text-sm font-medium"
							>
								<img
									className="w-8 h-8 rounded-full"
									src={session.user.image}
									alt="user"
								/>
								{session.user.email}
							</button>
							{dropdownOpen && (
								<div
									ref={dropdownRef}
									className="absolute top-16 right-6 bg-white text-black rounded-md shadow-md w-44"
								>
									<Link
										href="/dashboard"
										onClick={closeDropdownOnClick}
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Dashboard
									</Link>
									<Link
										href={`/${session.user.name}`}
										onClick={closeDropdownOnClick}
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Your Page
									</Link>
									<Link
										href="/createpost"
										onClick={closeDropdownOnClick}
										className="block px-4 py-2 hover:bg-gray-100"
									>
										Create Post
									</Link>
									<button
										onClick={() => {
											signOut();
											closeDropdownOnClick();
										}}
										className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
									>
										Sign Out
									</button>
								</div>
							)}
						</>
					) : (
						<Link href="/login">
							<button className="px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:bg-gradient-to-bl">
								Login
							</button>
						</Link>
					)}
				</div>
			</div>

			{/* Mobile Dropdown */}
			{mobileMenuOpen && (
				<div className="md:hidden px-4 pb-4">
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="ex: abbassihorwala53"
						className="w-full mb-2 px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
					<button
						onClick={handleSearch}
						className="w-full mb-4 px-3 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:bg-gradient-to-bl"
					>
						Search
					</button>
					{session ? (
						<>
							<Link
								href="/home"
								onClick={closeDropdownOnClick}
								className="block px-4 py-2 hover:bg-gray-700"
							>
								Home
							</Link>
							<Link
								href="/dashboard"
								onClick={closeDropdownOnClick}
								className="block px-4 py-2 hover:bg-gray-700"
							>
								Dashboard
							</Link>
							<Link
								href={`/${session.user.name}`}
								onClick={closeDropdownOnClick}
								className="block px-4 py-2 hover:bg-gray-700"
							>
								Your Page
							</Link>
							<Link
								href="/createpost"
								onClick={closeDropdownOnClick}
								className="block px-4 py-2 hover:bg-gray-700"
							>
								Create Post
							</Link>
							<button
								onClick={() => {
									signOut();
									closeDropdownOnClick();
								}}
								className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
							>
								Sign Out
							</button>
						</>
					) : (
						<Link href="/login">
							<button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white hover:bg-gradient-to-bl">
								Login
							</button>
						</Link>
					)}
				</div>
			)}

			{isModalOpen && (
				<div className="fixed inset-0 grid place-items-center bg-black px-4 z-60">
					<div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 ">
						<h2 className="text-xl font-bold mb-4 text-white">
							Search Results
						</h2>
						{results ? (
							<div className="flex flex-col items-center">
								<div className="rounded-full w-20 h-20 overflow-hidden mb-4">
									<img
										className="w-full h-full object-cover rounded-full"
										src={results.profilepic || "/placeholder.png"}
									/>
								</div>
								<h3 className="text-lg font-semibold text-amber-700">
									{results.username || "Author"}
								</h3>
								<p className="text-sm text-white">{results.tagline}</p>
								<p className="text-sm text-white">
									{results.followers} Followers
								</p>
								<Link
									href={`/${results.username}/post`}
									onClick={() => {
										setIsModalOpen(false);
										setQuery("");
									}}
									className="mt-4"
								>
									<button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded hover:bg-gradient-to-bl">
										View Author
									</button>
								</Link>
							</div>
						) : (
							<p className="text-gray-500">No results found. Check spelling.</p>
						)}
						<button
							onClick={() => {
								setIsModalOpen(false);
								setQuery("");
							}}
							className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded hover:bg-gradient-to-bl"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</nav>
	);
}

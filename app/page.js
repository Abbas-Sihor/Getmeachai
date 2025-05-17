import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
export default function Home() {
	return (
		<>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Galindo&family=Rye&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Limelight&display=swap"
					rel="stylesheet"
				></link>
			</Head>
			<div className=" h-[60vh] flex flex-col justify-center items-center p-6 text-green-50 text-center">
				<h1
					className="text-3xl text-[#fffbe1] font-bold mb-4 flex justify-center items-center gap-2"
					style={{ fontFamily: "'Rye'" }}
				>
					Buy Me A Chai
					<span>
						<img src="/tea2.gif" width={70} alt="Tea GIF" />
					</span>
				</h1>
				<p
					className="text-[#fffbe1] mb-6 max-w-md text-lg "
					style={{ fontFamily: "'Limelight'" }}
				>
					A seamless platform where creators transform their ideas into reality,
					fueled by chai-sized contributions from a supportive community.
				</p>
				<div className="space-x-4">
					<Link href="/login">
						<button
							type="button"
							className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
						>
							Start Now
						</button>
					</Link>
					<Link href="/about">
						<button
							type="button"
							className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
						>
							Read More
						</button>
					</Link>
				</div>
			</div>

			<div className="bg-white h-1 opacity-10"></div>

			<h1 className="text-[#fffbe1] text-center p-5 text-2xl font-bold">
				Your Fans Can Buy You A Chai
			</h1>

			<div className="flex flex-row items-center justify-evenly p-5 rounded-lg shadow-lg text-center">
				<div className="flex flex-col items-center">
					<img
						src="man.gif"
						alt="Person"
						className="w-24 h-24 rounded-full object-cover border-2 border-[#fffbe1]"
					/>
					<h2 className="text-[#fffbe1] mt-4 text-xl font-semibold">
						Fund Yourself
					</h2>
					<p className="text-[#fffbe1] text-sm text-center mt-2">
						Your fans are available to help you
					</p>
				</div>
				<div className="flex flex-col items-center">
					<img
						src="dollar.gif"
						alt="Person"
						className="w-24 h-24 rounded-full object-cover border-2 border-[#fffbe1]"
					/>
					<h2 className="text-[#fffbe1] mt-4 text-xl font-semibold">
						Fund Yourself
					</h2>
					<p className="text-[#fffbe1] text-sm text-center mt-2">
						Your fans are available to help you
					</p>
				</div>
				<div className="flex flex-col items-center">
					<img
						src="group.gif"
						alt="Person"
						className="w-24 h-24 rounded-full object-cover border-2 border-[#fffbe1]"
					/>
					<h2 className="text-[#fffbe1] mt-4 text-xl font-semibold">
						Fund Yourself
					</h2>
					<p className="text-[#fffbe1] text-sm text-center mt-2">
						Your fans are available to help you
					</p>
				</div>
			</div>

			<div className="bg-white h-1 opacity-10"></div>

			<h1 className="text-[#fffbe1] text-center p-5 text-2xl font-bold">
				Learn More About Us
			</h1>

			<div className="flex flex-wrap items-center justify-center p-5 rounded-lg shadow-lg">
				<div className="flex flex-col items-center w-full max-w-3xl">
					<iframe
						className="w-full aspect-video rounded-lg"
						src="https://www.youtube.com/embed/CvYVDvtz7WA?si=Eb35zPGUncSBDYkO"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					></iframe>
					<p className="text-[#fffbe1] text-sm text-center mt-2">
						All Your Questions Will Be Answered--- Watch Now
					</p>
				</div>
			</div>
		</>
	);
}
export const metadata = {
	title: "GetMeAChai - Empowering Developers, Raising Funds",
	description:
		"Join GetMeAChai today to raise funds for your projects. Empower your development journey and turn your ideas into reality with ease and trust.",
};

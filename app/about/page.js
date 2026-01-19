import React from 'react'

const page = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center">
      <header className=" text-white w-full py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold">About Patronick</h1>
        <p className="mt-2 text-lg">Empowering Developers, Building Trust</p>
      </header>

      <main className="flex-1 w-full max-w-4xl px-6 py-10">
        <section className="bg-white p-8 shadow-md rounded-md mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-7">
            At <span className="text-green-500 font-semibold">Patronick</span>, we are on a mission to support creators, developers, and innovators. 
            Our platform allows developers to raise funds for their projects, ideas, or side hustles—one “chai” at a time. Whether you're building your 
            next big thing or polishing your existing projects, Patronick is here to help turn your vision into reality.
          </p>
        </section>

        <section className="bg-white p-8 shadow-md rounded-md mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-7">
            <li>
              <span className="text-blue-500 font-semibold">Developer-Friendly:</span> A simple and intuitive interface designed specifically for developers to share their work and receive support.
            </li>
            <li>
              <span className="text-blue-500 font-semibold">Secure & Trustworthy:</span> We prioritize user safety with robust security measures and transparency in fund management.
            </li>
            <li>
              <span className="text-blue-500 font-semibold">Community Driven:</span> Connect with a like-minded community of creators and supporters who share your passion.
            </li>
          </ul>
        </section>

        <section className="bg-white p-8 shadow-md rounded-md mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600 leading-7">
            <li>
              <span className="font-semibold text-green-500">Create:</span> Set up your profile and showcase your work or project goals.
            </li>
            <li>
              <span className="font-semibold text-green-500">Share:</span> Share your unique link with friends, family, and supporters.
            </li>
            <li>
              <span className="font-semibold text-green-500">Earn:</span> Receive contributions directly and grow your project with every chai.
            </li>
          </ol>
        </section>

        <section className="bg-gradient-to-br from-purple-700 to-indigo-600 p-8 shadow-md rounded-md text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Your Trust, Our Commitment</h2>
          <p className="leading-7">
            We understand how important trust is when it comes to fundraising. That's why we are committed to maintaining the highest standards of 
            security and reliability. With <span className="font-semibold">Patronick</span>, you can focus on creating while we handle the rest.
          </p>
        </section>
      </main>

    </div>
  );
}

export default page

export const metadata = {
  title: "About Us - Patronick | Empowering Developers & Building Trust",
  description: "Learn more about Patronick's mission to help developers raise funds for their projects. Discover why we're the trusted platform for creators and how we ensure a secure, community-driven experience.",
};


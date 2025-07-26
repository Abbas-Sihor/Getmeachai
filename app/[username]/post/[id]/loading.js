import {
  faHeart,
  faComment,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillLike } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-screen">
      {/* Main Content */}
      <div className="w-full lg:w-[75%] overflow-auto scrollbar-none">
        <div className="flex flex-col p-4 sm:p-6">
          {/* Main Post */}
          <div className="post bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="title text-2xl sm:text-3xl font-bold text-white mt-4 mb-4 skeleton skeleton-text" />
            <div className="skeleton">
              <div className="w-full h-48 sm:h-64 rounded-lg border-2 border-dotted border-white bg-gray-700" />
            </div>
            <p className="text-white mt-5 text-base sm:text-xl leading-7 sm:leading-9 whitespace-pre-wrap skeleton mb-5 skeleton-text" />
            {[...Array(5)].map((_, i) => (
              <p
                key={i}
                className="text-white text-base leading-relaxed skeleton skeleton-text mb-3"
              />
            ))}
            <div className="flex gap-4 mt-4">
              <i className="text-blue-500 cursor-pointer">
                <AiFillLike className="ml-1 inline" />
              </i>
              <i className="text-blue-500 cursor-pointer">
                <FontAwesomeIcon icon={faComment} className="ml-1" />
              </i>
            </div>
          </div>

          {/* Recent Posts Grid */}
          <h3 className="text-white text-2xl sm:text-3xl mt-10 text-center skeleton skeleton-text" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="post bg-gray-800 p-4 rounded-lg shadow-lg skeleton"
              >
                <div className="w-full h-40 bg-gray-700 rounded-lg" />
                <h3 className="title text-xl font-bold text-white mt-4 line-clamp-3 skeleton skeleton-text" />
                <p className="description text-gray-400 mt-2 line-clamp-1 skeleton skeleton-text" />
                <p className="text-slate-500 mt-1 skeleton skeleton-text" />
                <div className="mt-3 bg-blue-600 w-1/2 py-2 rounded-lg skeleton" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-[25%] bg-slate-900 px-4 pt-4 pb-10 overflow-y-auto scrollbar-none">
        <div className="flex flex-col gap-6">
          {/* Profile Section */}
          <div className="post bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <h1 className="text-xl font-bold text-white skeleton skeleton-text" />
            <div className="flex items-center gap-3 skeleton rounded-full">
              <div className="w-8 h-8 rounded-full bg-gray-700" />
              <span className="skeleton skeleton-text w-20 h-4 bg-gray-700 rounded" />
            </div>
            {[...Array(6)].map((_, i) => (
              <p
                key={i}
                className="text-white text-base leading-relaxed skeleton skeleton-text mb-1"
              />
            ))}
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
          </div>

          {/* Comment Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <h3 className="text-xl font-bold text-white skeleton skeleton-text" />
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-gray-700 skeleton" />
              <textarea
                className="flex-grow bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:outline-none skeleton skeleton-text"
                placeholder=""
              ></textarea>
              <div className="bg-blue-600 w-20 h-10 rounded-lg skeleton" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

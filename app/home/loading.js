import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen text-white animate-pulse">

      {/* ===== Sidebar (Desktop only) ===== */}
      <aside className="hidden lg:flex w-60 p-5 border-r border-white/10 flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/10" />
          <div className="space-y-2">
            <div className="w-24 h-4 bg-white/10 rounded" />
            <div className="w-14 h-3 bg-white/10 rounded" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-10 bg-white/10 rounded-lg" />
          <div className="h-10 bg-white/10 rounded-lg" />
        </div>

        <div className="space-y-3">
          <div className="w-32 h-4 bg-white/10 rounded mx-auto" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white/10 rounded-full" />
              <div className="w-24 h-3 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ===== Left: Followed Posts ===== */}
          <div className="w-full lg:w-[40%] flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-800 p-5 rounded-2xl flex flex-col md:flex-row gap-4"
              >
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-3/4 bg-white/10 rounded" />
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-white/10 rounded-full" />
                    <div className="w-24 h-3 bg-white/10 rounded" />
                  </div>
                  <div className="h-4 w-full bg-white/10 rounded" />
                  <div className="h-4 w-5/6 bg-white/10 rounded" />
                  <div className="flex gap-4 pt-2">
                    <div className="w-10 h-3 bg-white/10 rounded" />
                    <div className="w-10 h-3 bg-white/10 rounded" />
                  </div>
                </div>

                {/* Image */}
                <div className="w-full md:w-56 aspect-[16/9] bg-white/10 rounded-xl" />
              </div>
            ))}
          </div>

          {/* ===== Right ===== */}
          <div className="flex-1 space-y-10">

            {/* Trending Post */}
            <div className="p-6 md:p-10 rounded-2xl bg-white/10 space-y-4">
              <div className="aspect-[16/9] w-full bg-white/10 rounded-xl" />
              <div className="h-6 w-3/4 bg-white/10 rounded" />
              <div className="h-4 w-full bg-white/10 rounded" />
              <div className="h-4 w-5/6 bg-white/10 rounded" />
              <div className="flex justify-between">
                <div className="w-24 h-3 bg-white/10 rounded" />
                <div className="w-16 h-3 bg-white/10 rounded" />
              </div>
            </div>

            {/* Recommended Authors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-gray-800 p-6 rounded-2xl space-y-5 w-full max-w-md"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full" />
                    <div className="space-y-2">
                      <div className="w-24 h-4 bg-white/10 rounded" />
                      <div className="w-20 h-3 bg-white/10 rounded" />
                    </div>
                  </div>

                  <div className="h-4 w-full bg-white/10 rounded" />

                  <div className="flex justify-between items-center">
                    <div className="w-20 h-3 bg-white/10 rounded" />
                    <div className="w-24 h-8 bg-white/10 rounded-full" />
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

export default Loading;

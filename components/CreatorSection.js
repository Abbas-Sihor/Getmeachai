export default function CreatorSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-semibold mb-8">
        Built for the Modern Creator
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h3 className="font-semibold mb-4">For Creators</h3>
          <ul className="space-y-3 text-gray-300">
            <li>✔ Real-time Analytics</li>
            <li>✔ Zero-Friction Payments</li>
            <li>✔ Audience Ownership</li>
          </ul>
        </div>

        {/* Right - Graph */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h3 className="font-semibold mb-2">Dashboard</h3>

          <div className="h-40 mt-4 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-xl" />

          <div className="flex justify-between mt-4 text-sm text-gray-300">
            <div>
              <p>Total Patrons</p>
              <p className="text-white font-semibold">1,500</p>
            </div>
            <div>
              <p>Monthly Earning</p>
              <p className="text-white font-semibold">$6,250</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

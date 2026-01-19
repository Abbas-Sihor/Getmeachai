import { MessageCircle, Coins, Users } from "lucide-react";

const cards = [
  {
    icon: MessageCircle,
    title: "Direct Engagement",
    desc: "Engage directly with your favorite creators through exclusive social updates.",
  },
  {
    icon: Coins,
    title: "Support Creators",
    desc: "Support the work you love with one-tap tiered memberships.",
  },
  {
    icon: Users,
    title: "Community Forum",
    desc: "Build strong creator-supporter communities.",
  },
];

export default function Ecosystem() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-semibold mb-6">Ecosystem</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          >
            <c.icon className="text-indigo-400 mb-4 size-16 m-auto" />
            <h3 className="font-semibold text-center">{c.title}</h3>
            <p className="text-sm text-gray-400 mt-2 text-center">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

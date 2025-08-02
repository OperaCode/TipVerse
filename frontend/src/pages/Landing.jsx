import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Landing = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen font-sans text-white bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Navbar */}
     <nav className="fixed top-0 w-full z-20 px-6 py-4 backdrop-blur-md bg-white/5 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          🧃 TipVerse
        </h1>
        <div className="space-x-4 md:space-x-6 text-sm text-gray-300 flex flex-wrap justify-center md:justify-end items-center gap-y-2">
          <a href="#hero" className="hover:text-white transition">Home</a>
          <a href="#how" className="hover:text-white transition">How It Works</a>
          <a href="#benefits" className="hover:text-white transition">Benefits</a>
          <div>
            <ConnectButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-36 pb-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-400">
            Send & Receive Tips with ❤️
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            TipVerse lets you receive ETH tips instantly. Create your TipJar,
            share your link, and let gratitude flow.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:brightness-110 transition text-white font-semibold py-3 px-6 rounded-full shadow-lg">
            🚀 Connect Wallet to Get Started
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 px-6 text-center bg-white/5">
        <h3 className="text-3xl font-bold mb-12 text-white">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: "📝",
              title: "Create Your Jar",
              text: "Connect your wallet and give your project a name.",
            },
            {
              icon: "🔗",
              title: "Share Your Link",
              text: "Copy your TipJar link and post it anywhere.",
            },
            {
              icon: "💸",
              title: "Receive Tips",
              text: "Watch ETH flow into your wallet in real time.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl shadow-lg transition hover:scale-[1.02]"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold mb-2 text-white">
                {item.title}
              </h4>
              <p className="text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Create Jar CTA */}
      <section
        id="create"
        className="py-20 px-6 text-center bg-gradient-to-r from-pink-500 to-purple-600"
      >
        <h3 className="text-3xl font-bold mb-4 text-white">
          Start Receiving Gratitude
        </h3>
        <p className="mb-8 text-white">
          Whether you're a creator, dev, or open-source builder — TipVerse helps
          you get appreciated directly with ETH.
        </p>
        <button className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
          ✨ Connect Wallet
        </button>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 px-6 bg-white/5 text-center">
        <h3 className="text-3xl font-bold mb-12 text-white">
          Why Choose TipVerse?
        </h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">
          {[
            {
              title: "🔐 Secure & Instant",
              text: "Your ETH tips go directly to your wallet — no third parties.",
            },
            {
              title: "✨ Frictionless",
              text: "No account needed to tip. Share your link, and that’s it.",
            },
            {
              title: "📊 Transparent",
              text: "Track your support with a clean and clear dashboard.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/10 shadow"
            >
              <h4 className="text-lg font-bold mb-2 text-white">
                {item.title}
              </h4>
              <p className="text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-[#121212] text-center text-sm text-gray-500">
        <p>Made with 💙 by Opera</p>
        
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:underline">
            Twitter
          </a>
          <a href="#" className="hover:underline">
            GitHub
          </a>
          <a href="#" className="hover:underline">
            Support
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

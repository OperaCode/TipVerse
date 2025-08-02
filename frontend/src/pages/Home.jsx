import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaPlusCircle,
  FaHome,
  FaEthereum,
  FaArrowLeft,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import TipButton from "../components/TipButton";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [userTipJars, setUserTipJars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const fetchUserTipJars = async () => {
      if (!address) return;
      try {
        const res = await axios.get(`${BASE_URL}/server/tipjars/user/${address}`);
        setUserTipJars(res.data.tipJars || []);
      } catch (err) {
        toast.info("Failed to load your TipJars.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserTipJars();
  }, [address]);

  const handleExit = () => {
    disconnect();
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center px-4 py-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          🧃 TripVerse
        </h1>
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)}>
          {mobileNavOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileNavOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-6 bg-white/5 border-b border-white/10 backdrop-blur-md text-sm text-gray-300">
          <a href="/dashboard" className="flex items-center gap-2 hover:text-white">
            <FaHome /> Dashboard
          </a>
          <a href="/projects" className="flex items-center gap-2 hover:text-white">
            <FaEthereum /> Browse Projects
          </a>
          <button onClick={handleExit} className="flex items-center gap-2 hover:text-white">
            <FaArrowLeft /> Exit
          </button>
        </div>
      )}

      {/* Sidebar - Desktop only */}
      <aside className="hidden md:flex w-64 flex-col px-6 py-8 bg-white/5 border-r border-white/10 backdrop-blur-md">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-10">
          🧃 TripVerse
        </h1>
        <nav className="flex flex-col gap-4 text-sm text-gray-300">
          <a href="/dashboard" className="flex items-center gap-2 hover:text-white">
            <FaHome /> Dashboard
          </a>
          <a href="/projects" className="flex items-center gap-2 hover:text-white">
            <FaEthereum /> Browse Projects
          </a>
          <button onClick={handleExit} className="flex items-center gap-2 hover:text-white">
            <FaArrowLeft /> Exit
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-10 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <h1 className="text-2xl font-bold text-white text-center sm:text-left">
              TripVerse Dashboard
            </h1>
            <ConnectButton />
          </div>

          {/* Welcome Block */}
          {isConnected && (
            <div className="text-center py-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg shadow-md px-4">
              <div className="text-3xl md:text-4xl mb-4 text-purple-300 font-semibold tracking-wide">
                ✨ Kickstart Your Project!
              </div>
              <p className="text-gray-300 max-w-xl mx-auto mb-6 text-base md:text-lg">
                Launch a TipJar to raise funds for your creative or open-source project.
              </p>
              <Link to="/create">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-base font-semibold hover:brightness-110 transition">
                  <FaPlusCircle />
                  Create TipJar
                </button>
              </Link>
            </div>
          )}

          {/* TipJars Section */}
          <section className="bg-white/5 border mt-10 border-white/10 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaEthereum className="text-emerald-400" />
              Your TipJars
            </h2>

            {loading ? (
              <p className="text-gray-400 animate-pulse">
                Loading your TipJars...
              </p>
            ) : userTipJars.length === 0 ? (
              <p className="text-gray-400">You haven't created any TipJars yet.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {userTipJars.map((jar) => {
                  const {
                    _id,
                    title,
                    description,
                    goalAmount,
                    totalTipped = 0,
                    walletAddress,
                  } = jar;
                  const progress = Math.min((totalTipped / goalAmount) * 100, 100);
                  return (
                    <div
                      key={_id}
                      className="p-5 bg-[#1A1A1A]/70 backdrop-blur-md border border-[#333] text-white rounded-2xl shadow-md"
                    >
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="text-sm text-gray-300 mt-1 line-clamp-3">{description}</p>
                      <div className="mt-3 text-sm space-y-1">
                        <p>🎯 Goal: Ξ {goalAmount}</p>
                        <p>💰 Raised: Ξ {totalTipped}</p>
                        <p className="text-xs text-gray-400">Wallet: {walletAddress}</p>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full mt-3">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{progress.toFixed(1)}% funded</p>
                      <div className="mt-4">
                        <TipButton recipient={walletAddress} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;

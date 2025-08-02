import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import axios from "axios";
import TipJarList from "../components/TipjarList";
import { FaPlusCircle, FaHome, FaEthereum, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    goalAmount: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) return alert("Please connect your wallet first.");
    if (parseFloat(form.goalAmount) <= 0)
      return alert("Goal amount must be greater than 0.");

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/server/tipjars/create",
        {
          ...form,
          walletAddress: address,
        }
      );
      alert("🎉 TipJar created successfully!");
      setForm({ title: "", description: "", goalAmount: "" });
    } catch (err) {
      alert("❌ Failed to create TipJar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col px-6 py-8 bg-white/5 border-r border-white/10 backdrop-blur-md">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-10">
          🧃 GratiFi
        </h1>
        <nav className="flex flex-col gap-4 text-sm text-gray-300">
          <a
            href="/dashboard"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <FaHome /> Dashboard
          </a>
          <a
            href="/projects"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <FaEthereum /> Browse Projects
          </a>
          <button
            onClick={() => {
              disconnect();
              navigate("/");
            }}
            className="flex items-center gap-2 hover:text-white transition"
          >
            <FaArrowLeft /> Exit
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-10 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex m justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">GratiFi Dashboard</h1>
            <ConnectButton />
          </div>

          {/* TipJar Form/placeholder */}
          {isConnected && (
            <div className="text-center py-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg shadow-md">
              <div className="text-4xl mb-4 text-purple-300 font-semibold tracking-wide">
                ✨ Kickstart Your Project!
              </div>
              <p className="text-gray-300 max-w-xl mx-auto mb-6 text-lg">
                Launch a TipJar to raise funds for your creative or open-source
                project. Whether you’re scaling, building, or rebooting — your
                supporters want to help.
              </p>

              <Link to="/create">
                <button
                  // onClick={onOpenModal}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-base font-semibold hover:brightness-110 transition"
                >
                  <FaPlusCircle />
                  Create TipJar
                </button>
              </Link>
            </div>
          )}

          {/* TipJars */}
          <section className="bg-white/5 border mt-10 border-white/10 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaEthereum className="text-emerald-400" />
              Your TipJars
            </h2>
            <TipJarList />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;

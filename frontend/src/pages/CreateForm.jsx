import React, { useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { FaPlusCircle } from "react-icons/fa";

const CreateForm = () => {
  const { address, isConnected } = useAccount();

  const [form, setForm] = useState({
    title: "",
    description: "",
    goalAmount: "",
    stage: "",
    useCase: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) return alert("⚠️ Please connect your wallet first.");
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
      setForm({
        title: "",
        description: "",
        goalAmount: "",
        stage: "",
        useCase: "",
        website: "",
      });
    } catch (err) {
      alert("Failed to create TipJar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <nav className="fixed top-0 w-full z-20 px-6 py-4 backdrop-blur-md bg-white/5 border-b border-white/10 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          🧃 TripVerse
        </h1>
        <div className="space-x-6 text-sm text-gray-300 flex items-center">
          <a href="/dashboard" className="hover:text-white transition">
            Back to Dash
          </a>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto mt-20">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-2">
            <FaPlusCircle className="text-purple-400" />
            Create a New TipJar for Your Project
          </h2>

          <p className="text-gray-300 mb-8 text-sm">
            This form helps you raise funds for a project that needs support to
            scale, grow, or reach completion.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-white">
            {/* Project Title */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Open Source Crypto Tracker"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Project Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                required
                placeholder="What is this project about? What will the tips fund?"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Project Stage */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Project Stage
              </label>
              <select
                name="stage"
                value={form.stage}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="">Select stage</option>
                <option value="idea">Idea Phase</option>
                <option value="development">In Development</option>
                <option value="beta">Beta Launch</option>
                <option value="production">Live / Production</option>
              </select>
            </div>

            {/* Funding Use Case */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Funding Will Be Used For
              </label>
              <select
                name="useCase"
                value={form.useCase}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="">Select use case</option>
                <option value="development">Development</option>
                <option value="marketing">Marketing & Outreach</option>
                <option value="scaling">Scaling Infrastructure</option>
                <option value="maintenance">Maintenance & Updates</option>
                <option value="research">R&D / Research</option>
              </select>
            </div>

            {/* Goal Amount */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Goal Amount (ETH)
              </label>
              <input
                type="number"
                name="goalAmount"
                value={form.goalAmount}
                onChange={handleChange}
                min="0.001"
                step="0.001"
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Website (Optional) */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Project Website / Demo Link (Optional)
              </label>
              <input
                type="url"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://yourproject.xyz"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:brightness-110 transition duration-300 font-semibold"
            >
              {loading ? "Creating..." : "✨ Launch TipJar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;

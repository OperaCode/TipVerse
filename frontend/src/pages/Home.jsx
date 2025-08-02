import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import axios from "axios";
import TipJarList from "../components/TipjarList";

const Home = () => {
  const { address, isConnected } = useAccount();

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
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/server/tipjars/create", {
        ...form,
        walletAddress: address,
      });

      alert("TipJar created successfully!");
      console.log(response.data);
      setForm({ title: "", description: "", goalAmount: "" });
    } catch (error) {
      console.error("Error creating tip jar", error);
      alert("Error creating tip jar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">💸 TipJar App</h1>
      <ConnectButton />

      {isConnected && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project Title"
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Project Description"
            required
            rows="4"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="goalAmount"
            value={form.goalAmount}
            onChange={handleChange}
            placeholder="Funding Goal (ETH)"
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create TipJar"}
          </button>
        </form>
      )}
    </div>
    <TipJarList/>
    </>
  );
};

export default Home;

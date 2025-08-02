import { useEffect, useState } from "react";
import axios from "axios";
import TipButton from "./TipButton";

const TipJarList = () => {
  const [tipJars, setTipJars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTipJars = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/server/tipjars`);
        setTipJars(response.data.tipJars);
      } catch (error) {
        console.error("Error fetching tip jars", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTipJars();
  }, []);

  if (loading) return <p className="text-gray-500">Loading tip jars...</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tipJars.map((jar) => (
        <div
          key={jar._id}
          className="p-4 bg-white shadow rounded-xl border border-gray-200"
        >
          <h3 className="text-lg font-bold">{jar.title}</h3>
          <p className="text-sm text-gray-700 mb-2">{jar.description}</p>
          <p className="text-sm text-gray-500">Goal: Ξ {jar.goalAmount}</p>
          <p className="text-sm text-gray-500 break-all">
            Wallet: {jar.walletAddress}
          </p>
          <TipButton recipient={jar.walletAddress}/> 
        </div>
      ))}
    </div>
  );
};

export default TipJarList;

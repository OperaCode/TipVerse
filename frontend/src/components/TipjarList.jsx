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

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-400 animate-pulse">
        Loading tip jars...
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tipJars.map((jar) => {
        const { _id, title, description, goalAmount, walletAddress, totalTipped = 0 } = jar;
        const progress = Math.min((totalTipped / goalAmount) * 100, 100);

        return (
          <div
            key={_id}
            className="p-5 bg-[#1A1A1A]/70 backdrop-blur-md border border-[#333] text-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="text-sm text-gray-300 mt-1 line-clamp-3">{description}</p>
              <div className="mt-4 space-y-1 text-sm">
                <p>
                  <span className="font-medium text-[#77F2C1]">Goal:</span> Ξ {goalAmount}
                </p>
                <p>
                  <span className="font-medium text-[#77F2C1]">Raised:</span> Ξ {totalTipped}
                </p>
                <p className="text-xs text-gray-400 break-all">
                  <span className="font-medium text-gray-500">Wallet:</span> {walletAddress}
                </p>
              </div>

              <div className="w-full h-2 bg-gray-700 rounded-full mt-3">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">{progress.toFixed(1)}% funded</p>
            </div>

            <div className="mt-5">
              <TipButton recipient={walletAddress} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TipJarList;

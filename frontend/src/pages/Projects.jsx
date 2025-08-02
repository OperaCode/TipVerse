import { useEffect, useState } from "react";
import axios from "axios";
import TipButton from "../components/TipButton";
import { FaEthereum } from "react-icons/fa";

const Projects = () => {
  const [tipJars, setTipJars] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [minGoal, setMinGoal] = useState("");
  const [maxGoal, setMaxGoal] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchTipJars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/server/tipjars`
        );
        setTipJars(response.data.tipJars);
        setFiltered(response.data.tipJars);
      } catch (error) {
        console.error("Error fetching tip jars", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTipJars();
  }, []);

  useEffect(() => {
    let data = [...tipJars];
    if (search) {
      data = data.filter((jar) =>
        jar.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (minGoal) {
      data = data.filter((jar) => jar.goalAmount >= Number(minGoal));
    }
    if (maxGoal) {
      data = data.filter((jar) => jar.goalAmount <= Number(maxGoal));
    }
    setFiltered(data);
    setCurrentPage(1);
  }, [search, minGoal, maxGoal, tipJars]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-400 animate-pulse">
        Loading tip jars...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-10 px-6">
      <nav className="fixed top-0 w-full z-20 px-6 py-4 backdrop-blur-md bg-white/5 border-b border-white/10 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          🧃 GratiFI
        </h1>
        <div className="space-x-6 text-sm text-gray-300 flex items-center">
          <a href="/dashboard" className="hover:text-white transition">
            Back to Dash
          </a>
        </div>
      </nav>

      <section className="max-w-7xl mt-20 mx-auto">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4 justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaEthereum className="text-emerald-400" />
            All Projects
          </h2>

          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <input
              type="number"
              placeholder="Min goal Ξ"
              value={minGoal}
              onChange={(e) => setMinGoal(e.target.value)}
              className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm w-28"
            />
            <input
              type="number"
              placeholder="Max goal Ξ"
              value={maxGoal}
              onChange={(e) => setMaxGoal(e.target.value)}
              className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm w-28"
            />
          </div>
        </div>

        {/* Project Grid */}
        {filtered.length === 0 ? (
          <p className="text-gray-400 mt-10">No projects found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginated.map((jar) => {
              const {
                _id,
                title,
                description,
                goalAmount,
                walletAddress,
                totalTipped = 0,
              } = jar;
              const progress = Math.min((totalTipped / goalAmount) * 100, 100);

              return (
                <div
                  key={_id}
                  className="p-5 bg-[#1A1A1A]/70 backdrop-blur-md border border-[#333] text-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="text-sm text-gray-300 mt-1 line-clamp-3">
                      {description}
                    </p>
                    <div className="mt-4 space-y-1 text-sm">
                      <p>
                        <span className="font-medium text-[#77F2C1]">Goal:</span>{" "}
                        Ξ {goalAmount}
                      </p>
                      <p>
                        <span className="font-medium text-[#77F2C1]">Raised:</span>{" "}
                        Ξ {totalTipped}
                      </p>
                      <p className="text-xs text-gray-400 break-all">
                        <span className="font-medium text-gray-500">Wallet:</span>{" "}
                        {walletAddress}
                      </p>
                    </div>

                    <div className="w-full h-2 bg-gray-700 rounded-full mt-3">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {progress.toFixed(1)}% funded
                    </p>
                  </div>

                  <div className="mt-5">
                    <TipButton recipient={walletAddress} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {filtered.length > itemsPerPage && (
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30"
            >
              Previous
            </button>
            <span className="text-sm self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;

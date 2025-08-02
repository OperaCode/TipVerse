import { useState } from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

const TipButton = ({ recipient, defaultAmount = "0.01" }) => {
  const [amount, setAmount] = useState(defaultAmount);

  const {
    data,
    sendTransaction,
    isLoading,
    isSuccess,
    error,
  } = useSendTransaction();

  const handleSend = () => {
    sendTransaction?.({
      to: recipient,
      value: parseEther(amount),
    });
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-3">
        <input
          type="number"
          step="0.001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-24 px-3 py-1.5 text-sm bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className={`px-4 py-1.5 text-sm font-semibold rounded-lg shadow-md transition duration-200 
            ${
              isLoading
                ? "bg-blue-800 text-blue-100 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white"
            }`}
        >
          {isLoading ? "Sending..." : "Send Tip"}
        </button>
      </div>

      {isSuccess && (
        <p className="text-green-400 text-sm mt-2">✅ Tip sent successfully!</p>
      )}
      {error && (
        <p className="text-red-400 text-sm mt-2">❌ {error.message}</p>
      )}
    </div>
  );
};

export default TipButton;

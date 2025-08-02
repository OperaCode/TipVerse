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
    <div className="mt-2">
      <input
        type="number"
        step="0.001"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-2 py-1 mr-2 w-24"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-1 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Tip"}
      </button>

      {isSuccess && <p className="text-green-500 mt-1">✅ Tip sent!</p>}
      {error && <p className="text-red-500 mt-1">❌ {error.message}</p>}
    </div>
  );
};

export default TipButton;

import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stockData, setStockData] = useState({ tweets: [] });
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState("AAPL");
  const [error, setError] = useState("");

  const fetchData = async (symbol) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/tweets/fetch/${symbol}`
      );
      console.log("Fetched:", response.data);
      setStockData(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Could not fetch data. Try a different stock symbol.");
      setStockData({ tweets: [] }); // clear old state
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(symbol);
  }, []);

  const sentimentCounts = stockData?.tweets?.reduce(
    (acc, tweet) => {
      acc[tweet.sentiment] = (acc[tweet.sentiment] || 0) + 1;
      return acc;
    },
    { Positive: 0, Negative: 0, Neutral: 0 }
  );

  const chartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Sentiment Count",
        data: [
          sentimentCounts.Positive,
          sentimentCounts.Negative,
          sentimentCounts.Neutral,
        ],
        backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
      },
    ],
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Stock Sentiment Analyzer
      </h1>

      <div className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Stock Symbol (e.g. TSLA)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="border p-2 rounded-md"
        />
        <button
          onClick={() => fetchData(symbol)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">⏳ Fetching data...</p>}

      {error && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}

      {!loading && stockData?.tweets?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Bar Chart
            </h2>
            <Bar data={chartData} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Pie Chart
            </h2>
            <Pie data={chartData} />
          </div>
        </div>
      )}

      {!loading && !error && stockData?.tweets?.length === 0 && (
        <p className="text-center text-gray-600">
          No tweets found for <strong>{symbol}</strong>.
        </p>
      )}
    </div>
  );
};

export default Dashboard;

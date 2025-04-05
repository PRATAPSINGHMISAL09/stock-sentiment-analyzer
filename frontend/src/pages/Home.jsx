import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.h1
        className="text-5xl font-bold text-green-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Stock Sentiment Analyzer 📈
      </motion.h1>
      <p className="text-gray-400 mt-4">Analyze stock trends with real-time sentiment analysis.</p>
    </div>
  );
};

export default Home;

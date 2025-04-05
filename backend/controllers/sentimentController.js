import fetchTweets from "../utils/fetchTweets.js";
import Sentiment from "sentiment";
import SentimentModel from "../models/Sentiment.js";

const sentiment = new Sentiment();

export const analyzeAndStore = async (req, res) => {
  const { symbol } = req.params;

  try {
    const tweets = await fetchTweets(symbol);
    const analyzedTweets = tweets.map(text => {
      const { score } = sentiment.analyze(text);
      return { text, score };
    });

    // Save in DB
    const newRecord = new SentimentModel({
      symbol,
      tweets: analyzedTweets,
      timestamp: new Date()
    });

    await newRecord.save();

    res.status(200).json(newRecord);
  } catch (error) {
    console.error("Error in sentiment controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

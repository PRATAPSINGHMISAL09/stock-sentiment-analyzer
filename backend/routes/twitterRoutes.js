import express from "express";
import Tweet from "../models/Tweet.js";
import Sentiment from "sentiment";
import fetchTweets from "../utils/twitterFetcher.js";
import SentimentModel from "../models/Sentiment.js";

const router = express.Router();
const sentimentAnalyzer = new Sentiment();

// 🔥 Main route: fetch → analyze → store in Tweet & Sentiment models → return response
router.get("/fetch/:symbol", async (req, res) => {
  const { symbol } = req.params;

  try {
    if (!symbol) {
      return res.status(400).json({ error: "Stock symbol is required" });
    }

    // 1. Fetch tweets
    const rawTweets = await fetchTweets(symbol);

    if (!rawTweets || rawTweets.length === 0) {
        return res.status(200).json({
          message: "No tweets found or rate limited",
          tweets: [],
          sentimentStats: null,
        });
      }
      

    // 2. Analyze tweets and store in both models
    const analyzed = [];
    const tweetDocs = [];

    for (let tweetText of rawTweets) {
      const result = sentimentAnalyzer.analyze(tweetText);
      let sentiment = "Neutral";
      if (result.score > 0) sentiment = "Positive";
      else if (result.score < 0) sentiment = "Negative";

      // Save to TweetModel
      const tweetDoc = new Tweet({
        stockSymbol: symbol,
        tweetText,
        sentiment,
      });

      await tweetDoc.save(); // saving each tweet

      tweetDocs.push(tweetDoc); // for frontend
      analyzed.push({ text: tweetText, score: result.score }); // for sentiment model
    }

    // 3. Save aggregated sentiment to SentimentModel
    const sentimentRecord = new SentimentModel({
      symbol,
      tweets: analyzed,
      timestamp: new Date(),
    });

    await sentimentRecord.save();

    // 4. Send response to frontend
    res.status(200).json({
      message: `Successfully analyzed and saved tweets for ${symbol}`,
      tweets: tweetDocs,
      sentimentStats: sentimentRecord,
    });

  } catch (error) {
    console.error("🔥 Error in fetching pipeline:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema({
  text: String,
  score: Number
});

const SentimentSchema = new mongoose.Schema({
  symbol: String,
  tweets: [TweetSchema],
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Sentiment", SentimentSchema);

import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    
  stockSymbol: { type: String, required: true },
  tweetText: { type: String, required: true },
  sentiment: { type: String, enum: ["Positive", "Negative", "Neutral"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;

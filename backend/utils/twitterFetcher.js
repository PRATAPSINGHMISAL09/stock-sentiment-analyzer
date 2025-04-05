import { TwitterApi } from 'twitter-api-v2';
import dotenv from "dotenv";
dotenv.config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const fetchTweets = async (stockSymbol) => {
  try {
    const response = await client.v2.search(`${stockSymbol} stock lang:en -is:retweet`, {
      max_results: 10,
      'tweet.fields': 'text,created_at',
    });

    const tweets = [];
    for await (const tweet of response) {
      tweets.push(tweet.text);
    }

    console.log(`✅ Scraped ${tweets.length} tweets for ${stockSymbol}`);
    return tweets;
  } catch (error) {
    console.error("❌ Error fetching tweets:", error.data ?? error.message);
    return [];
  }
};

export default fetchTweets;

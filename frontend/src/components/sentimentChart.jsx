import { Bar } from "react-chartjs-2";

const SentimentChart = ({ tweets }) => {
    const sentimentCounts = tweets.reduce((acc, tweet) => {
        acc[tweet.sentiment] = (acc[tweet.sentiment] || 0) + 1;
        return acc;
    }, {});

    const data = {
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [{
            label: "Sentiment Analysis",
            data: [
                sentimentCounts["Positive"] || 0,
                sentimentCounts["Neutral"] || 0,
                sentimentCounts["Negative"] || 0
            ],
            backgroundColor: ["#4CAF50", "#FFC107", "#F44336"]
        }]
    };

    return <Bar data={data} />;
};

export default SentimentChart;

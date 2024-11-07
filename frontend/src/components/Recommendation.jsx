import React from 'react';

const Recommendation = ({ entries }) => {
  // Analyze mood based on entries
  const analyzeMood = () => {
    if (entries.length === 0) return { mood: 'Neutral', sentimentScore: 0 };

    const totalScore = entries.reduce((acc, entry) => acc + (entry.sentiment?.score || 0), 0);
    const avgScore = totalScore / entries.length;

    // Classify mood based on average sentiment score
    let mood;
    if (avgScore > 0.5) {
      mood = 'Happy';
    } else if (avgScore < 0.2) {
      mood = 'Sad';
    } else {
      mood = 'Neutral';
    }

    return { mood, sentimentScore: avgScore };
  };

  const { mood } = analyzeMood();

  // Recommendations based on mood
  const getRecommendations = () => {
    const recommendations = {
      Happy: [
        { title: 'Keep Smiling! Watch This!', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        { title: 'Happy Songs Playlist', url: 'https://www.youtube.com/playlist?list=PL6kRXvX8A1tEY2YWWd6FGJ9tXkMZqZ5Rb' },
      ],
      Sad: [
        { title: 'Motivational Speech for Tough Times', url: 'https://www.youtube.com/watch?v=9ZyI46fNB3g' },
        { title: 'Top 10 Feel-Good Movies', url: 'https://www.imdb.com/list/ls068352587/' },
      ],
      Neutral: [
        { title: 'Inspiration to Brighten Your Day', url: 'https://www.youtube.com/watch?v=sNmeq1P_3RE' },
        { title: '10 Tips for a Productive Day', url: 'https://www.verywellmind.com/how-to-have-a-productive-day-2794724' },
      ],
    };

    return recommendations[mood] || recommendations['Neutral'];
  };

  const recommendations = getRecommendations();

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg mt-6">
      <h3 className="text-xl font-semibold mb-4">Recommendations for You:</h3>
      {recommendations.length > 0 ? (
        recommendations.map((item, index) => (
          <div key={index} className="mb-2">
            <a
              href={item.url}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title}
            </a>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No recommendations available at this time.</p>
      )}
    </div>
  );
};

export default Recommendation;

import React from 'react';

const FeatureCard = ({ emoji, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
    <span className="text-4xl mb-4" role="img" aria-label={title}>
      {emoji}
    </span>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-center">{description}</p>
  </div>
);

const HomePage = () => {
  const features = [
    {
      emoji: "📖",
      title: "Digital Journaling",
      description: "Document your journey with our intuitive AI-enhanced diary system"
    },
    {
      emoji: "✨",
      title: "Emotion Analysis",
      description: "Gain insights into your emotional patterns with advanced AI technology"
    },
    {
      emoji: "🎯",
      title: "Goal Tracking",
      description: "Set, monitor, and achieve your personal growth objectives"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            EmoScribe
          </h1>
          <p className="text-2xl font-light text-gray-300 mb-8">
            Your AI-Powered Emotional Intelligence Journal
          </p>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            Start Your Journey
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="text-center mt-20">
          <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-lg backdrop-blur-md">
            <span className="text-4xl mb-4 block" role="img" aria-label="quote">
              💭
            </span>
            <blockquote className="text-xl italic text-gray-300 mb-4">
              "EmoScribe has transformed the way I understand and process my emotions. It's more than just a diary—it's a companion in my personal growth journey."
            </blockquote>
            <p className="text-purple-400 font-semibold">— Sarah Johnson, Mindfulness Coach</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 bg-black/20">
        <p>© 2024 EmoScribe. Empowering emotional intelligence through technology.</p>
      </footer>
    </div>
  );
};

export default HomePage;
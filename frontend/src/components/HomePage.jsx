import React, { useState } from 'react';

// FeatureCard Component
const FeatureCard = ({ emoji, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
    <span className="text-4xl mb-4" role="img" aria-label={title}>
      {emoji}
    </span>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-center">{description}</p>
  </div>
);

// Guide Component
const Guide = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg max-w-md w-full text-center">
      <h2 className="text-2xl font-semibold mb-4">Welcome to EmoScribe!</h2>
      <p className="text-lg text-gray-700 mb-4">
        EmoScribe is here to help you track your emotional journey, make positive affirmations and reflect on your growth.
      </p>
      <p className="text-lg text-gray-700 mb-8">
        To get started, explore the features that can help you document your feelings, track progress, and gain insights!
      </p>
      <button
        onClick={onClose}
        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
      >
        Start Now
      </button>
    </div>
  </div>
);

// HomePage Component
const HomePage = () => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

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
      title: "Help achieve positivity goals!",
      description: "Help you to keep making positive affirmations and help you get a more positive outlook on life"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 homepage-hero">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            EmoScribe
          </h1>
          <p className="text-2xl font-light text-gray-300 mb-8">
            Your AI-Powered Emotional Intelligence Journal
          </p>
          <button
            onClick={() => setIsGuideOpen(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="text-center mt-20 testimonial-section">
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

      {/* Guide Component */}
      {isGuideOpen && <Guide onClose={() => setIsGuideOpen(false)} />}
    </div>
  );
};

export default HomePage;

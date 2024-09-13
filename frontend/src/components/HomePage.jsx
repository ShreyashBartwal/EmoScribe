import React from 'react';

class HomePage extends React.Component {
  render() {
    return (
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
        {/* Background Design */}
        <div className="absolute inset-0 opacity-50 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522204523234-8725ee50f74b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fG1vb3RoaW5rfGVufDB8fHx8MTY1MDA0NTI3MA&ixlib=rb-1.2.1&q=80&w=1080')" }} />

        {/* Content Area */}
        <div className="relative z-10 text-center p-10 max-w-2xl bg-white bg-opacity-90 shadow-xl rounded-lg backdrop-blur-md">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Welcome to EmoScribe
          </h2>
          <h2 className="text-3xl font-semibold text-purple-700 mb-6">
            Where Positivity Matters!
          </h2>
          <p className="text-lg font-medium text-gray-700 leading-relaxed mb-4">
            EmoScribe is your personal AI-driven Mood Diary. Here, you can freely express how you feel and document the moments that shape your life.
          </p>
          <p className="text-lg font-medium text-gray-700 leading-relaxed">
            Whether you're reflecting on your day, noting down personal goals, or simply looking for a space to be yourself, EmoScribe is here to help you on your journey towards positivity and self-growth.
          </p>

          {/* Decorative Separator */}
          <div className="mt-8 w-20 h-1 mx-auto bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"></div>

          {/* Inspirational Quote */}
          <p className="mt-10 text-lg italic text-gray-600">
            "Every day is a new opportunity to grow emotionally and mentally."
          </p>
        </div>
      </div>
    );
  }
}

export default HomePage;

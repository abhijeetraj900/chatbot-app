import React from "react";
import logo from "../assets/logo.png";

// Reusable Suggestion Card Component
const SuggestionCard = ({ title, description }) => (
  <div className="w-full md:w-1/2 lg:w-1/2 p-3">
    <div className="bg-white-10 rounded-lg shadow-md p-4">
      <p className="font-semibold text-md mb-2 text-gray-lightbulma">{title}</p>
      <p className="text-gray-lightbulma text-sm">{description}</p>
    </div>
  </div>
);

function StaticSugestion() {
  const suggestions = [
    { title: 'Start with "hi", "hello", "how are you?"', description: 'They will respond accordingly' },
    { title: 'Tell me fun facts', description: 'About the Golden State Warriors' },
    { title: 'Give me Ideas', description: 'How to plan my New Year’s resolutions' },
    { title: 'Create a content calendar', description: 'For Twitter account' },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center p-5 mb-24">
        <img src={logo} alt="logo" className="w-12 h-12 rounded-full" />
        <h1 className="text-center font-semibold text-xl mt-2">
          How can I help you today?
        </h1>
      </div>

      <div className="flex flex-wrap justify-between">
        {suggestions.map((suggestion, idx) => (
          <SuggestionCard
            key={idx}
            title={suggestion.title}
            description={suggestion.description}
          />
        ))}
      </div>
    </>
  );
}

export default StaticSugestion;

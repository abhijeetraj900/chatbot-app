import React, { useState } from "react";
import StaticSugestion from "./StaticSugestion";
import StarRating from "./Feedback/StartRating";
import FeedbackModal from "./Feedback/FeedbackModal";
import user from "../assets/user.png";
import logo from "../assets/logo.png";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa";

function ChatSection({ darkMode }) {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [showSuggestions] = useState(true);
  const [showRating, setShowRating] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [ratingValue] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackMessages, setFeedbackMessages] = useState([]);

  const handleAsk = async () => {
    try {
      const res = await fetch("/mock.json");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      const normalizedQuestion = question
        .toLowerCase()
        .trim()
        .replace(/[?.!]/g, "");
      const foundItem = data.find(
        (item) =>
          item.question.toLowerCase().trim().replace(/[?.!]/g, "") ===
          normalizedQuestion
      );

      const newConversationItem = {
        question,
        response: foundItem
          ? foundItem.response
          : "I'm sorry, I don't have an answer to that question.",
        rating: null,
        feedback: null,
      };

      setConversation((prev) => [...prev, newConversationItem]);
      setQuestion(""); // Reset question after sending
    } catch (error) {
      console.error("Error fetching the mock data:", error);
    }
  };

  const handleRatingChange = (newValue) => {
    const updatedConversation = [...conversation];
    updatedConversation[selectedQuestionIndex].rating = newValue;
    setConversation(updatedConversation);
    setShowRating(false); // Hide rating options after rating
  };

  const handleThumbsUpClick = (index) => {
    setSelectedQuestionIndex(index);
    setShowRating(true);
  };

  const handleThumbsDownClick = (index) => {
    setSelectedQuestionIndex(index);
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = (feedback) => {
    const updatedConversation = [...conversation];
    updatedConversation[selectedQuestionIndex].feedback = feedback;
    setConversation(updatedConversation);
    setFeedbackMessages((prev) => [...prev, feedback]);
    setShowFeedbackModal(false);
  };

  const handleSaveConversation = () => {
    try {
      const savedConversations = localStorage.getItem("conversation");
      const existingConversations = savedConversations
        ? JSON.parse(savedConversations)
        : [];
      const updatedConversations = [...existingConversations, ...conversation];
      localStorage.setItem(
        "conversation",
        JSON.stringify(updatedConversations)
      );
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  return (
    <div className={`flex flex-col ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {showSuggestions && <StaticSugestion />}
      <div className="flex-grow p-4">
        {conversation.map((item, index) => (
          <div key={index}>
            <div className="flex py-5">
              <img src={user} className="h-12 w-12 rounded-full" alt="user" />
              <p className={`rounded-lg p-2 mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <span className="font-bold text-lg">You : </span>
                {item.question}
              </p>
            </div>

            <div className="flex py-5">
              <img src={logo} className="h-12 w-12 rounded-full" alt="AI" />
              <div className="relative group">
                <p className={`rounded-lg p-2 ${darkMode ? 'bg-gray-800' : 'bg-blue-200'}`}>
                  <span className="font-bold text-lg">SoulAI : </span>
                  {item.response}
                </p>

                {(index === conversation.length - 1 || conversation.length === 1) && (
                  <div className="hidden group-hover:flex absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 items-center justify-end gap-5 pt-12">
                    <div onClick={() => handleThumbsDownClick(index)}>
                      <FaRegThumbsDown />
                    </div>
                    <div onClick={() => handleThumbsUpClick(index)}>
                      <FaRegThumbsUp />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {showRating && selectedQuestionIndex === index && (
              <div className="px-14">
                <StarRating value={ratingValue} onChange={handleRatingChange} />
              </div>
            )}
          </div>
        ))}

        {feedbackMessages.map((feedback, index) => (
          <div key={index} className="rounded-lg p-2 mb-2 px-14 bg-gray-200">
            <span className="font-bold text-lg">Feedback : </span>
            {feedback}
          </div>
        ))}
      </div>

      <div className="flex items-center p-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Message soul AI..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAsk();
          }}
          className={`flex-grow rounded-lg p-4 mr-4 shadow-md border-gray-text border ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
        />
        <button
          onClick={handleAsk}
          className="px-4 py-4 rounded-lg bg-blue-10 text-white-10"
        >
          Ask
        </button>
        <button
          onClick={handleSaveConversation}
          className="px-4 py-4 ml-4 rounded-lg bg-blue-10 text-white-10"
        >
          Save Conversation
        </button>
      </div>

      {showFeedbackModal && (
        <FeedbackModal
          handleClose={() => setShowFeedbackModal(false)}
          handleFeedbackSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}

export default ChatSection;

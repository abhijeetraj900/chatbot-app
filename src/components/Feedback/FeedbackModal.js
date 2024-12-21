import React, { useState } from "react";
import { MenuCloseIcon } from "../../assets/icons";

function FeedbackModal({ handleClose, handleFeedbackSubmit }) {
  // State to hold the feedback value
  const [feedback, setFeedback] = useState("");

  // Handle the form submission
  const handleSubmit = () => {
    console.log("Feedback submitted:", feedback);
    handleFeedbackSubmit(feedback); // Pass feedback to the parent component
    handleClose(); // Close the modal after submission
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 w-full h-full">
      <div className="bg-white-10 rounded-lg p-4 max-w-md w-full md:max-w-lg md:w-1/2 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-md font-bold">👎 Provide additional feedback</h1>
          {/* Close button */}
          <div onClick={handleClose}>
            <MenuCloseIcon width={20} height={20} />
          </div>
        </div>

        {/* Feedback input field */}
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)} // Update feedback state
          placeholder="What was the issue with the response? How could it be improved?"
          className="p-2 h-36 w-full resize-none rounded-md border border-gray-text shadow-md"
        />

        <div className="flex justify-end">
          {/* Submit feedback button */}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-10 text-white rounded-md hover:bg-blue-20 text-white-10 mt-3">
            Submit feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackModal;

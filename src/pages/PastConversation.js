import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StarRatings from "../components/Feedback/StartRating";
import logo from "../assets/logo.png";
import user from "../assets/user.png";

function PastConversation() {
  // State to manage mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State to hold the list of conversations
  const [conversations, setConversations] = useState([]);

  // State to manage selected rating filter
  const [selectedRating, setSelectedRating] = useState(null);

  // Fetch conversations from localStorage when the component mounts
  useEffect(() => {
    fetchConversations();
  }, []); // Empty dependency array means this runs once when the component is mounted

  // Function to fetch conversations from localStorage
  const fetchConversations = () => {
    try {
      // Retrieve stored conversations from localStorage
      const savedConversations = localStorage.getItem("conversation");

      if (savedConversations) {
        // Parse and set the conversations state if found
        const parsedConversations = JSON.parse(savedConversations);
        console.log("Fetched conversations:", parsedConversations);
        setConversations(parsedConversations);
      } else {
        console.log("No conversations found in localStorage.");
      }
    } catch (error) {
      console.error("Error fetching conversations:", error); // Error handling if parsing fails
    }
  };

  // Handle rating filter change (to filter conversations by selected rating)
  const handleRatingFilter = (event) => {
    const rating =
      event.target.value === "All" ? null : parseInt(event.target.value); // Parse rating or null for "All"
    setSelectedRating(rating); // Set the selected rating to filter
  };

  // Filter conversations based on selected rating
  const filteredConversations = selectedRating
    ? conversations.filter(
        (conversation) => conversation.rating === selectedRating
      )
    : conversations; // If no rating is selected, show all conversations

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Component to manage mobile menu */}
      <Sidebar
        mobileMenuOpen={mobileMenuOpen} // Pass mobileMenuOpen state to Sidebar
        setMobileMenuOpen={setMobileMenuOpen} // Pass setMobileMenuOpen function to Sidebar
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header Component */}
        <Header setMobileMenuOpen={setMobileMenuOpen} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 tablet:p-8 overflow-y-auto">
          <div className="mx-auto">
            {/* Title */}
            <h1 className="text-3xl font-bold text-center text-gray-lightbulma">
              Conversation History
            </h1>

            <div className="flex justify-center my-4">
              {/* Rating Filter Dropdown */}
              <select
                onChange={handleRatingFilter} // Call handleRatingFilter on change
                className="px-4 py-2 mx-2 rounded-full bg-gray-200 text-gray-700"
              >
                <option value="All">All Ratings</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star
                  </option>
                ))}
              </select>
            </div>

            {/* Display filtered conversations or message if none */}
            {filteredConversations.length > 0 ? (
              filteredConversations
                .slice() // Create a shallow copy to reverse it
                .reverse() // Reverse the order to show the latest conversations first
                .map((item, idx) => (
                  <div
                    key={item.id || `conversation-${idx}`} // Unique key for each conversation
                    className="bg-blue-50 p-5 rounded-lg w-full md:w-1/2 lg:w-1/2 my-2 shadow-lg"
                  >
                    {/* User's Question */}
                    <div className="font-bold text-md">
                      <div className="flex items-center gap-3">
                        <img
                          src={user}
                          alt="user"
                          className="w-5 h-5 rounded-full"
                        />
                        You:
                        <span className="text-md font-normal">
                          {item.question} {/* Displaying the user's question */}
                        </span>
                      </div>
                    </div>

                    {/* Soul AI's Response */}
                    <div className="flex gap-3 items-center font-bold text-md mt-4">
                      <img
                        src={logo}
                        alt="logo"
                        className="w-5 h-5 rounded-full"
                      />
                      Soul AI:
                      <span className="text-md font-normal">
                        {item.response} {/* Displaying AI's response */}
                      </span>
                    </div>

                    <div className="px-8 mt-2">
                      {/* Show rating if it exists */}
                      {item.rating && (
                        <h1 className="font-bold text-md">
                          Rating:
                          <span className="text-md font-normal">
                            <StarRatings value={item.rating} />{" "}
                            {/* Display the rating component */}
                          </span>
                        </h1>
                      )}
                      {/* Show feedback if it exists */}
                      {item.feedback && (
                        <h1 className="font-bold text-md mt-2">
                          Feedback:
                          <span className="font-normal text-md">
                            {item.feedback} {/* Displaying feedback */}
                          </span>
                        </h1>
                      )}
                    </div>
                  </div>
                ))
            ) : (
              // No conversations found message
              <p className="text-center text-gray-500">
                No conversations found.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PastConversation;

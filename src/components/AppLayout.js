import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState, useEffect } from "react";
import ChatSection from "./ChatSection";

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State to manage mobile menu visibility
  const [darkMode, setDarkMode] = useState(false); // State to manage dark mode

  // Effect to persist dark mode in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  // Effect to apply dark mode to body and save it in localStorage
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Sidebar component - Passes state and setter for mobile menu */}
      <Sidebar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header component - Passes setter for mobile menu state and dark mode */}
        <Header
          setMobileMenuOpen={setMobileMenuOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode} // Pass down dark mode state to Header
        />

        {/* Main content area */}
        <main className="flex-1 p-4 tablet:p-8 overflow-y-auto">
          <div className="mx-auto">
            {/* ChatSection component - Displays the chat interface, passing dark mode state */}
            <ChatSection darkMode={darkMode} />
          </div>
        </main>
      </div>
    </div>
  );
}

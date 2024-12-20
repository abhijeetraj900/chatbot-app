import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import AppLayout from "./components/AppLayout";
import ChatSection from "./components/ChatSection";
import PastConversation from "./pages/PastConversation";

export default function App() {
  const [darkMode, setDarkMode] = useState(false); // Manage dark mode state

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode); // Toggle dark mode

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}>
          <Route path="/" element={<ChatSection darkMode={darkMode} />} />
        </Route>
        <Route path="/pastconversation" element={<PastConversation />} />
      </Routes>
    </BrowserRouter>
  );
}

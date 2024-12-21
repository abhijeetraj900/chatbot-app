import { MenuOpenIcon } from "../assets/icons";
import logo from "../assets/logo.png";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Header({ setMobileMenuOpen, darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode); // Toggles the dark class on root
  };

  return (
    <header className="w-full grid grid-cols-[1fr_auto] items-center py-3 px-4 tablet:px-8 gap-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="flex items-center gap-2 tablet:gap-4">
        {/* Mobile Menu Icon */}
        <div
          className="block tablet:hidden text-black dark:text-white"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <MenuOpenIcon width={24} height={24} />
        </div>

        {/* Logo Section */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-blue-10 dark:text-blue-30 text-2xl font-black leading-8">
            Bot AI
          </span>
        </div>

        <div className="flex gap-3 items-center w-[150px] md:hidden">
          <div className="w-12 h-12 rounded bg-black-10 overflow-hidden">
            <img src={logo} alt="Bot AI Logo" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-blue-30 dark:text-white font-bold text-2xl">
              Bot AI
            </span>
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <FaMoon size={24} className="text-white" />
          ) : (
            <FaSun size={24} className="text-yellow-400" />
          )}
        </button>
      </div>
    </header>
  );
}

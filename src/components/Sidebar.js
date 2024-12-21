import { MenuCloseIcon, EditIcon } from "../assets/icons";
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

// Reusable Sidebar Header Component
const SidebarHeader = ({ handleRefresh }) => (
  <div className="flex gap-6 items-center w-[192px]">
    <div className="w-8 h-8 rounded bg-black-100 overflow-hidden">
      <img src={logo} alt="logo" />
    </div>
    <div className="flex gap-5 grow items-start cursor-pointer">
      <span
        className="text-black-10 font-nunito font-semibold text-lg leading-normal"
        onClick={handleRefresh}
      >
        <Link to="/">New Chat</Link>
      </span>
      <EditIcon />
    </div>
  </div>
);

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="row-span-full bg-white-10 hidden tablet:flex flex-col items-center py-4 px-[10px] gap-4 text-black-100 h-100">
        <div className="flex flex-col gap-6 items-center w-full grow">
          <SidebarHeader handleRefresh={handleRefresh} />
          <div className="bg-blue-20 px-8 py-2 rounded text-black-10 font-semibold hover:bg-blue-40 cursor-pointer">
            <Link to="/pastconversation">Past Conversation</Link>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="tablet:hidden fixed h-full w-screen bg-black-30/20 backdrop-blur-sm supports-[backdrop-filter]:bg-black-30/20 z-40 inset-0 overflow-hidden transition-all">
          <div className="h-full w-[224px] shadow-sm bg-white-10 flex flex-col items-center py-4 px-[10px] gap-4 text-black-100 overflow-y-auto rounded-r-3xl">
            <div className="flex flex-col gap-6 items-center w-full grow">
              <SidebarHeader handleRefresh={handleRefresh} />
              <Link to="/pastconversation">Past Conversation</Link>
              <div
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-[2px] left-[175px] bg-black-100 text-black-12 rounded-full p-2 z-50"
              >
                <MenuCloseIcon width={20} height={20} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

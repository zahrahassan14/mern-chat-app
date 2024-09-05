import { useState } from 'react';
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  const [isConvoOpen, setConvoOpen] = useState(true);
  const [isNeonTheme, setIsNeonTheme] = useState(false);

  const handleThemeToggle = () => {
    setIsNeonTheme(!isNeonTheme);
  };

  return (
    <div className={`border-r border-slate-500 p-4 flex flex-col ${isNeonTheme ? 'neon-theme' : ''}`}>
      <SearchInput />
      <div className="divider px-3"></div>

      {/* Toggle Switch for Theme */}
      <label className="flex items-center gap-2 mb-2 cursor-pointer">
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={isNeonTheme}
          onChange={handleThemeToggle}
        />
        <span>{isNeonTheme ? 'Dark Theme' : 'Default Theme'}</span>
      </label>

      <button onClick={() => setConvoOpen(!isConvoOpen)} className="my-2 py-1 px-3 bg-gray-300 rounded">
        {isConvoOpen ? 'Hide Conversations' : 'Show Conversations'}
      </button>

      {isConvoOpen && <Conversations />}

      <LogoutButton />
    </div>
  );
};

export default Sidebar;

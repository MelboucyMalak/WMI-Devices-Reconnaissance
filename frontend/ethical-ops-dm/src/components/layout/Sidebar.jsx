import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="w-64 bg-primary border-r border-primary-light h-screen flex flex-col">
      {/* Workspace Section */}
      <div className="px-4 py-6 border-b border-primary-light">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
          
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 px-3">
          Home
        </div>
        
        <Link
          to="/devices"
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
            isActive('/devices')
              ? 'bg-accent-green/20 text-accent-green'
              : 'text-gray-300 hover:bg-primary-light'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
          <span className="font-medium">All Devices</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
import { MessageCircle, Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopNav = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b shadow-soft z-50">
      <div className="flex items-center justify-between px-4 h-16">
        <Link to="/app" className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
          Apni Duniya
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/app/search" className="nav-item">
            <Search size={24} />
          </Link>
          <Link to="/app/activity" className="nav-item">
            <Heart size={24} />
          </Link>
          <Link to="/app/messages" className="nav-item">
            <MessageCircle size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
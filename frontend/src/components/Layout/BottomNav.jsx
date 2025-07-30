import { Home, Search, PlusSquare, Heart, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, path: '/app', label: 'Home' },
    { icon: Search, path: '/app/explore', label: 'Explore' },
    { icon: PlusSquare, path: '/app/create', label: 'Create' },
    { icon: Heart, path: '/app/activity', label: 'Activity' },
    { icon: User, path: '/app/profile', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-strong z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ icon: Icon, path, label }) => (
          <Link
            key={path}
            to={path}
            className={`nav-item flex flex-col items-center justify-center w-12 h-12 ${
              location.pathname === path 
                ? 'text-primary' 
                : 'text-muted-foreground'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
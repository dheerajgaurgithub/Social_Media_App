import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="pt-16 pb-20 md:pb-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
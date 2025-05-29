
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { Home, LogOut, BookOpen, Heart, LayoutDashboard, User } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: 'create' | 'history' | 'favorites';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  activeTab = 'create'
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col story-pattern">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-lg bg-background/80 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-story-purple" />
            <span className="font-bold text-xl bg-gradient-to-r from-story-purple to-story-darkpurple dark:from-story-softpurple dark:to-story-purple inline-block text-transparent bg-clip-text">
              StoryWeaver
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground" 
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-story-purple/10 flex items-center justify-center text-story-purple">
                <User className="h-4 w-4" />
              </div>
            </div>
            
            <ThemeToggle />
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 border-r border-border/40 p-4">
          <nav className="space-y-2 sticky top-20">
            <Button 
              variant={activeTab === 'create' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => navigate('/dashboard')}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Create Story
            </Button>
            
            <Button 
              variant={activeTab === 'history' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => navigate('/dashboard/history')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Story History
            </Button>
            
            <Button 
              variant={activeTab === 'favorites' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => navigate('/dashboard/favorites')}
            >
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </Button>
          </nav>
        </aside>
        
        {/* Content */}
        <main className="flex-1 py-8 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { BookOpen } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen story-pattern flex flex-col">
      <header className="w-full py-4 px-4 flex justify-center border-b border-border/20">
        <a href="/" className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-story-purple" />
          <span className="font-bold">StoryWeaver</span>
        </a>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} StoryWeaver. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;

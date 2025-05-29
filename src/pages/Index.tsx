
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

import FloatingShapes from '@/components/FloatingShapes';
import KeywordInput from '@/components/KeywordInput';
import ThemeToggle from '@/components/ThemeToggle';
import StoriesList from '@/components/StoriesList';
import { Story } from '@/components/StoryMessage';
import { generateStory } from '@/lib/mockApi';

const Index = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Load stories from localStorage on initial load
  useEffect(() => {
    const savedStories = localStorage.getItem('stories');
    if (savedStories) {
      try {
        const parsedStories = JSON.parse(savedStories);
        // Convert string timestamps back to Date objects
        const processedStories = parsedStories.map((story: any) => ({
          ...story,
          timestamp: new Date(story.timestamp)
        }));
        setStories(processedStories);
      } catch (error) {
        console.error('Failed to parse stored stories:', error);
      }
    }
  }, []);

  // Save stories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('stories', JSON.stringify(stories));
  }, [stories]);

  // Handle story generation
  const handleGenerateStory = async (keywords: string[]) => {
    setIsGenerating(true);
    
    try {
      const content = await generateStory(keywords);
      
      const newStory: Story = {
        id: uuidv4(),
        keywords,
        content,
        timestamp: new Date(),
        favorite: false
      };
      
      setStories(prevStories => [newStory, ...prevStories]);
      
      toast({
        title: "Story generated!",
        description: "Your new story has been created.",
      });
    } catch (error) {
      console.error('Failed to generate story:', error);
      toast({
        title: "Generation failed",
        description: "Unable to generate story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle toggling favorite status
  const handleToggleFavorite = (id: string) => {
    setStories(prevStories => 
      prevStories.map(story => 
        story.id === id 
          ? { ...story, favorite: !story.favorite } 
          : story
      )
    );
  };

  // Handle continue story
  const handleContinueStory = (id: string) => {
    const storyToContinue = stories.find(story => story.id === id);
    
    if (!storyToContinue) return;
    
    // For now, just add some placeholder text
    const continuedContent = `${storyToContinue.content}\n\n[Story continued...]\n\nAs the new day dawned, unexpected developments brought fresh challenges and opportunities. The path forward was unclear, but one thing was certain - the adventure was far from over.`;
    
    // Create a new story as a continuation
    const newStory: Story = {
      id: uuidv4(),
      keywords: [...storyToContinue.keywords, 'continued'],
      content: continuedContent,
      timestamp: new Date(),
      favorite: false
    };
    
    setStories(prevStories => [newStory, ...prevStories]);
    
    toast({
      title: "Story continued",
      description: "A continuation of your story has been created.",
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative story-pattern">
      {/* Background shapes */}
      <FloatingShapes />
      
      {/* Theme toggle positioned at the top right */}
      <div className="fixed top-5 right-5 z-10">
        <ThemeToggle />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-0">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-story-purple to-story-darkpurple dark:from-story-softpurple dark:to-story-purple inline-block text-transparent bg-clip-text">
            StoryWeaver
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Transform your keywords into enchanting stories powered by AI
          </p>
        </header>
        
        {/* Keyword input */}
        <KeywordInput 
          onGenerate={handleGenerateStory}
          isGenerating={isGenerating}
        />
        
        {/* Stories */}
        <StoriesList 
          stories={stories} 
          onFavoriteToggle={handleToggleFavorite}
          onContinue={handleContinueStory}
        />
        
        {/* Add some padding at the bottom */}
        <div className="h-24" />
      </div>
    </div>
  );
};

export default Index;

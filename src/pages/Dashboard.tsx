
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import KeywordInput from '@/components/KeywordInput';
import StoriesList from '@/components/StoriesList';
import { Story } from '@/components/StoryMessage';
import { generateStory } from '@/lib/mockApi';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

const Dashboard: React.FC = () => {
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
      
      const updatedStories = [newStory, ...stories];
      setStories(updatedStories);
      
      // Save to localStorage
      localStorage.setItem('stories', JSON.stringify(updatedStories));
      
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
    const updatedStories = stories.map(story => 
      story.id === id 
        ? { ...story, favorite: !story.favorite } 
        : story
    );
    
    setStories(updatedStories);
    localStorage.setItem('stories', JSON.stringify(updatedStories));
    
    const story = stories.find(s => s.id === id);
    if (story) {
      toast({
        title: story.favorite ? "Removed from favorites" : "Added to favorites",
        description: story.favorite 
          ? "Story has been removed from your favorites" 
          : "Story has been added to your favorites",
      });
    }
  };

  // Handle continue story with improved implementation
  const handleContinueStory = (id: string) => {
    const storyToContinue = stories.find(story => story.id === id);
    
    if (!storyToContinue) return;
    
    const continuedContent = `${storyToContinue.content}\n\n[Story continued...]\n\nAs the new day dawned, unexpected developments brought fresh challenges and opportunities. The path forward was unclear, but one thing was certain - the adventure was far from over.`;
    
    // Create a new story as a continuation
    const newStory: Story = {
      id: uuidv4(),
      keywords: [...storyToContinue.keywords, 'continued'],
      content: continuedContent,
      timestamp: new Date(),
      favorite: false
    };
    
    const updatedStories = [newStory, ...stories];
    setStories(updatedStories);
    localStorage.setItem('stories', JSON.stringify(updatedStories));
    
    toast({
      title: "Story continued",
      description: "A continuation of your story has been created.",
    });
  };

  return (
    <DashboardLayout activeTab="create">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Story Creator</h1>
          <p className="text-muted-foreground">
            Transform your ideas into engaging stories with AI assistance
          </p>
        </div>
        
        <Card className="overflow-hidden border-story-purple/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <KeywordInput 
              onGenerate={handleGenerateStory}
              isGenerating={isGenerating}
            />
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Stories</h2>
          <StoriesList 
            stories={stories} 
            onFavoriteToggle={handleToggleFavorite}
            onContinue={handleContinueStory}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

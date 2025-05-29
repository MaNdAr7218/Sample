
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StoriesList from '@/components/StoriesList';
import { Story } from '@/components/StoryMessage';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Heart } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [favoriteStories, setFavoriteStories] = useState<Story[]>([]);
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

  // Filter favorite stories
  useEffect(() => {
    setFavoriteStories(stories.filter(story => story.favorite));
  }, [stories]);

  // Handle toggling favorite status
  const handleToggleFavorite = (id: string) => {
    const updatedStories = stories.map(story => 
      story.id === id 
        ? { ...story, favorite: !story.favorite } 
        : story
    );
    
    setStories(updatedStories);
    
    // Update localStorage
    localStorage.setItem('stories', JSON.stringify(updatedStories));
    
    const story = stories.find(s => s.id === id);
    if (story) {
      toast({
        title: story.favorite ? "Removed from favorites" : "Added to favorites",
        description: story.favorite 
          ? "Story has been removed from your favorites" 
          : "Story has been added to your favorites",
        variant: story.favorite ? "destructive" : "default",
      });
    }
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
    
    const updatedStories = [newStory, ...stories];
    setStories(updatedStories);
    localStorage.setItem('stories', JSON.stringify(updatedStories));
    
    toast({
      title: "Story continued",
      description: "A continuation of your story has been created.",
    });
  };

  // Handle export story
  const handleExportStory = (id: string) => {
    const story = stories.find(s => s.id === id);
    
    if (!story) return;
    
    // Create text for download
    const storyText = `
      Story generated with keywords: ${story.keywords.join(', ')}
      Date: ${story.timestamp.toLocaleString()}
      
      ${story.content}
    `;
    
    // Create blob and download
    const blob = new Blob([storyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `story-${story.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Story exported",
      description: "Your story has been downloaded as a text file."
    });
  };

  return (
    <DashboardLayout activeTab="favorites">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Heart className="h-6 w-6 text-story-purple" />
            Favorite Stories
          </h1>
          <p className="text-muted-foreground">
            Your collection of favorite stories
          </p>
        </div>
        
        <div className="space-y-4">
          {favoriteStories.length === 0 ? (
            <div className="text-center py-16 bg-muted/20 rounded-xl border border-dashed">
              <Heart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No favorite stories yet</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Mark stories as favorites to see them here. Go to the Story Creator to generate stories!
              </p>
            </div>
          ) : (
            <StoriesList 
              stories={favoriteStories} 
              onFavoriteToggle={handleToggleFavorite}
              onContinue={handleContinueStory}
              onExport={handleExportStory}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FavoritesPage;


import React from 'react';
import StoryMessage, { Story } from './StoryMessage';
import { useToast } from '@/hooks/use-toast';

interface StoriesListProps {
  stories: Story[];
  onFavoriteToggle: (id: string) => void;
  onContinue: (id: string) => void;
  onExport?: (id: string) => void;
}

const StoriesList: React.FC<StoriesListProps> = ({ 
  stories, 
  onFavoriteToggle, 
  onContinue,
  onExport 
}) => {
  const { toast } = useToast();
  
  // Handle exporting story
  const handleExport = (id: string) => {
    if (onExport) {
      onExport(id);
      return;
    }
    
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
    <div className="flex flex-col-reverse gap-6 w-full mx-auto mt-8">
      {stories.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Your generated stories will appear here. Start by entering keywords above!
        </p>
      ) : (
        stories.map(story => (
          <StoryMessage
            key={story.id}
            story={story}
            onFavoriteToggle={onFavoriteToggle}
            onExport={handleExport}
            onContinue={onContinue}
          />
        ))
      )}
    </div>
  );
};

export default StoriesList;

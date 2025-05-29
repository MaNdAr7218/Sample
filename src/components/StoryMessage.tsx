
import React, { useState } from 'react';
import { Heart, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Story {
  id: string;
  keywords: string[];
  content: string;
  timestamp: Date;
  favorite?: boolean;
}

interface StoryMessageProps {
  story: Story;
  onFavoriteToggle: (id: string) => void;
  onExport: (id: string) => void;
  onContinue: (id: string) => void;
}

const StoryMessage: React.FC<StoryMessageProps> = ({ 
  story, 
  onFavoriteToggle,
  onExport,
  onContinue 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContinueOptions, setShowContinueOptions] = useState(false);
  
  // Format the timestamp for display
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(story.timestamp);
  
  // Calculate if content needs expansion toggle
  const needsExpansion = story.content.length > 300;
  
  // Display full content or truncated based on expansion state
  const displayContent = needsExpansion && !isExpanded
    ? `${story.content.substring(0, 300)}...`
    : story.content;
    
  // Determine if this is a continued story
  const isContinuedStory = story.keywords.includes('continued');

  return (
    <div className={cn(
      "glass rounded-xl p-5 max-w-2xl w-full mx-auto mb-6 animate-fade-in transform transition-all hover:translate-y-[-5px] hover:shadow-lg",
      story.favorite && "border-2 border-amber-400/50 dark:border-amber-400/30",
      isContinuedStory && "border-l-4 border-l-story-purple"
    )}>
      {/* Visual indicator for continued stories */}
      {isContinuedStory && (
        <div className="mb-3 flex items-center gap-2">
          <div className="bg-story-purple/20 dark:bg-story-purple/30 px-3 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-story-purple" />
            <span className="text-xs font-medium text-story-purple">Continued Story</span>
          </div>
        </div>
      )}
      
      {/* Keywords and timestamp */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-wrap gap-2">
          {story.keywords.filter(k => k !== 'continued').map((keyword, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-story-purple/20 dark:bg-story-purple/30 rounded-full"
            >
              {keyword}
            </span>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{formattedDate}</span>
      </div>
      
      {/* Story content */}
      <div className="prose dark:prose-invert prose-sm max-w-none mb-4">
        <p className="whitespace-pre-line">{displayContent}</p>
        
        {needsExpansion && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-story-purple dark:text-story-purple hover:underline mt-2"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full",
              story.favorite 
                ? "bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300"
                : "bg-transparent"
            )}
            onClick={() => onFavoriteToggle(story.id)}
          >
            <Heart className={cn(
              "h-4 w-4 mr-1",
              story.favorite ? "fill-amber-500" : "fill-none"
            )} />
            {story.favorite ? 'Favorited' : 'Favorite'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => onExport(story.id)}
          >
            <FileText className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
        
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowContinueOptions(prev => !prev)}
            className={cn(
              "rounded-full bg-story-purple/10 hover:bg-story-purple/20 dark:bg-story-purple/20 dark:hover:bg-story-purple/30",
              showContinueOptions && "bg-story-purple/30 dark:bg-story-purple/40"
            )}
          >
            Continue <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          
          {showContinueOptions && (
            <div className="absolute right-0 bottom-full mb-2 w-64 bg-background border border-border shadow-lg rounded-lg p-3 z-10">
              <h4 className="font-medium mb-2 text-sm">Continue this story</h4>
              <Button
                size="sm" 
                className="w-full bg-story-purple hover:bg-story-darkpurple mb-2"
                onClick={() => {
                  onContinue(story.id);
                  setShowContinueOptions(false);
                }}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate continuation
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryMessage;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface KeywordInputProps {
  onGenerate: (keywords: string[]) => void;
  isGenerating: boolean;
}

const KeywordInput: React.FC<KeywordInputProps> = ({ onGenerate, isGenerating }) => {
  const [keywordsText, setKeywordsText] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Split by commas and trim whitespace
    const keywordList = keywordsText
      .split(',')
      .map(keyword => keyword.trim())
      .filter(keyword => keyword.length > 0);
    
    // Validate keywords
    if (keywordList.length === 0) {
      toast({
        title: "Keywords required",
        description: "Please enter at least one keyword.",
        variant: "destructive",
      });
      return;
    }
    
    if (keywordList.length > 5) {
      toast({
        title: "Too many keywords",
        description: "Please enter up to 5 keywords only.",
        variant: "destructive",
      });
      return;
    }
    
    // Send keywords to parent component
    onGenerate(keywordList);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="glass rounded-xl p-5 backdrop-blur-lg">
        <h2 className="text-lg font-semibold mb-3">Enter your story keywords</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Add up to 5 keywords separated by commas
        </p>
        
        <div className="flex gap-2">
          <Input
            placeholder="dragon, forest, magic"
            value={keywordsText}
            onChange={(e) => setKeywordsText(e.target.value)}
            className="flex-1 border-white/20 dark:border-white/10 bg-white/50 dark:bg-white/5"
            disabled={isGenerating}
          />
          
          <Button 
            type="submit" 
            disabled={isGenerating}
            className="bg-story-purple hover:bg-story-darkpurple text-white"
          >
            {isGenerating ? "Generating..." : "Create Story"}
          </Button>
        </div>
        
        {/* Suggested prompts */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Suggestions:</span>
          {["space, astronaut", "wizard, potion", "ocean, treasure", "forest, fairy"].map(suggestion => (
            <button
              key={suggestion}
              type="button"
              className="text-xs px-2 py-1 bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 rounded-full transition-colors"
              onClick={() => setKeywordsText(suggestion)}
              disabled={isGenerating}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};

export default KeywordInput;

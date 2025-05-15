// src/components/QuoteDisplay.tsx

'use client';

import React, { useState, useEffect } from 'react';
import type { Quote } from '@/types';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Star, Share2, RefreshCw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FAVORITES_STORAGE_KEY = 'favoriteQuotes';

// isQuoteInFavorites helper function (keep if added previously)
const isQuoteInFavorites = (quoteToCheck: Quote | null): boolean => {
  if (!quoteToCheck || !quoteToCheck.text) return false;
  try {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites !== null) {
      const parsedFavorites = JSON.parse(storedFavorites);
      if (Array.isArray(parsedFavorites)) {
        return (parsedFavorites as Quote[]).some(
          (favQuote) => favQuote.text === quoteToCheck.text
        );
      }
    }
  } catch (error) {
    console.error("Check failed:", error); return false;
  }
  return false;
};

interface QuoteDisplayProps {
  initialQuote: Quote;
  availableThemes: string[];
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ initialQuote, availableThemes }) => {
  const [currentQuote, setCurrentQuote] = useState<Quote>(initialQuote);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>(availableThemes[0] || 'All');
  const [isCurrentQuoteFavorite, setIsCurrentQuoteFavorite] = useState<boolean>(false);
  const [animateQuote, setAnimateQuote] = useState<boolean>(true);

  useEffect(() => {
    setIsCurrentQuoteFavorite(isQuoteInFavorites(currentQuote));
  }, [currentQuote]);

  // --- fetchNewQuote function (updated with animation) ---
  const fetchNewQuote = async (theme?: string) => {
    setIsLoading(true);
    setError(null);
    setAnimateQuote(false);
    
    const themeToFetch = theme || selectedTheme;
    let endpoint = '/api/quotes/random';
    if (themeToFetch && themeToFetch !== 'All') {
      endpoint += `?theme=${encodeURIComponent(themeToFetch)}`;
    }
    
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        let errorData; try { errorData = await response.json(); } catch { /* ignore */ }
        const message = errorData?.message || response.statusText || 'Failed to fetch quote';
        throw new Error(`HTTP error! Status: ${response.status} - ${message}`);
      }
      const newQuote: Quote = await response.json();
      setCurrentQuote(newQuote);
      
      // Reset animation state after a short delay to trigger animation again
      setTimeout(() => setAnimateQuote(true), 10);
    } catch (caughtError) {
      const errorMessage = caughtError instanceof Error ? caughtError.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // --- handleThemeChange function (unchanged) ---
  const handleThemeChange = (newTheme: string) => {
    setSelectedTheme(newTheme);
  };

  // --- saveFavorite function (unchanged) ---
  const saveFavorite = () => {
    const quoteToSave: Quote = currentQuote;
    if (!quoteToSave || !quoteToSave.text) return;
    let favorites: Quote[] = [];
    try { /* read localStorage */
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if(storedFavorites) {
            const parsed = JSON.parse(storedFavorites);
            if(Array.isArray(parsed)) favorites = parsed;
        }
     } catch(e) { console.error("Read error", e); favorites = []; }
    const alreadyExists = favorites.some(fav => fav.text === quoteToSave.text);
    let successfullySaved = false;
    if (!alreadyExists) {
        const updatedFavorites = [...favorites, quoteToSave];
        try { /* save to localStorage */
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
            successfullySaved = true;
            favorites = updatedFavorites;
        } catch(e) { console.error("Save error", e); }
    } else {
        successfullySaved = true;
    }
    if(successfullySaved) setIsCurrentQuoteFavorite(true);
  };

  // --- shareQuote function ---
  const shareQuote = () => {
    if (!currentQuote || !currentQuote.text) {
      console.error("Cannot share: No valid quote data available.");
      return;
    }

    // Data extracted
    const quoteText: string = currentQuote.text;
    const quoteAuthor: string = currentQuote.author || "Unknown Author";

    const twitterIntentUrl = "https://twitter.com/intent/tweet";
    const tweetText = `\"${quoteText}\" — ${quoteAuthor}`;
    const encodedTweetText = encodeURIComponent(tweetText);
    const shareUrl = `${twitterIntentUrl}?text=${encodedTweetText}`;

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Quote Card with animation */}
      <Card 
        className={`w-full border-2 shadow-lg bg-card text-card-foreground rounded-xl mb-8 overflow-hidden transition-all duration-500 card-hover ${
          animateQuote ? 'animate-fade-in' : 'opacity-0'
        }`}
      >
        <CardContent className="p-6 sm:p-8 pb-4 relative">
          {/* Decorative quote mark */}
          <div className="absolute -top-2 -left-2 text-8xl text-primary/10 font-serif">"</div>
          
          <blockquote className="text-xl sm:text-2xl md:text-3xl text-foreground pl-4 relative z-10">
             {currentQuote.text}
          </blockquote>
        </CardContent>
        
        <CardFooter className="px-6 sm:px-8 pt-0 pb-6 flex justify-between items-center">
          <div className="flex items-center">
            {currentQuote.theme && (
              <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary mr-3">
                {currentQuote.theme}
              </span>
            )}
            <cite className="text-base sm:text-lg text-muted-foreground not-italic">
              — {currentQuote.author}
            </cite>
          </div>
        </CardFooter>
      </Card>

      {/* Controls section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
        <div className="col-span-1 sm:col-span-2">
          <Select value={selectedTheme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a theme..." />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {availableThemes.map((theme) => (
                <SelectItem key={theme} value={theme}>
                  {theme}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Action buttons */}
        <Button
          onClick={() => fetchNewQuote(selectedTheme)}
          disabled={isLoading}
          className="col-span-1 h-11 shadow-md"
          size="lg"
        >
          {isLoading ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Loading...</>
          ) : (
            <><RefreshCw className="mr-2 h-5 w-5" />New Quote</>
          )}
        </Button>
        
        <div className="col-span-1 flex space-x-2">
          <Button
            variant={isCurrentQuoteFavorite ? "secondary" : "outline"}
            onClick={saveFavorite}
            className="flex-1 h-11"
            size="lg"
          >
            <Star
              className={`mr-2 h-5 w-5 transition-all ${isCurrentQuoteFavorite ? 'fill-yellow-400 stroke-yellow-500 scale-110' : 'fill-none'}`}
            />
            {isCurrentQuoteFavorite ? 'Favorited' : 'Favorite'}
          </Button>
          
          <Button
            variant="outline"
            onClick={shareQuote}
            className="flex-1 h-11"
            size="lg"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mt-4 p-4 border border-destructive/30 bg-destructive/10 text-destructive rounded-lg w-full">
          <p className="text-center font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default QuoteDisplay;
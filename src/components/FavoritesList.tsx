
'use client'; // Essential: This component interacts with localStorage

import React, { useState, useEffect } from 'react';
import type { Quote } from '@/types'; 
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react'; // Icon for removing favorites

// Use the exact same key used for saving favorites
const FAVORITES_STORAGE_KEY = 'favoriteQuotes';

/**
 * A client component that loads and displays the list of favorite quotes
 * stored in Local Storage. Also provides a basic "Unfavorite" functionality.
 */
const FavoritesList: React.FC = () => {
  // State to hold the list of quotes read from storage
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);
  // State to manage loading indicator
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State to handle potential errors during loading/parsing
  const [error, setError] = useState<string | null>(null);

  /**
   * Loads the favorites list from Local Storage, parses it,
   * and updates the component's state.
   */
  const loadFavorites = () => {
    setIsLoading(true); // Start loading state
    setError(null);    // Clear previous errors
    console.log("FavoritesList: Attempting to load favorites from Local Storage.");

    try {
      // Access Local Storage (Browser API)
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

      if (storedFavorites) {
        // If data exists, parse the JSON string
        console.log("FavoritesList: Found stored data.");
        const parsedFavorites = JSON.parse(storedFavorites);

        // Validate if the parsed data is an array
        if (Array.isArray(parsedFavorites)) {
          // Assume elements match Quote type (add runtime validation if needed)
          setFavoriteQuotes(parsedFavorites as Quote[]);
          console.log(`FavoritesList: Successfully loaded and parsed ${parsedFavorites.length} favorites.`);
        } else {
          // Handle case where stored data is valid JSON but not an array
          console.warn("FavoritesList: Stored favorites data is not an array. Resetting list.");
          setFavoriteQuotes([]); // Set to empty array
        }
      } else {
        // No data found under the key
        console.log("FavoritesList: No favorites found in Local Storage.");
        setFavoriteQuotes([]); // Ensure state is an empty array
      }
    } catch (err) {
      // Catch errors during localStorage access or JSON.parse()
      console.error("FavoritesList: Failed to load or parse favorites:", err);
      setError("Could not load favorites. Data might be corrupted or storage access denied.");
      setFavoriteQuotes([]); // Reset to empty array on error
    } finally {
      // Always turn off loading state
      setIsLoading(false);
    }
  };

  // Use useEffect to load favorites when the component first mounts
  useEffect(() => {
    loadFavorites();
    // The empty dependency array [] means this effect runs only once after the initial render.
  }, []);

  /**
   * Handles removing a quote from the favorites list.
   * Updates both the component state and Local Storage.
   * @param quoteToRemove The quote object to be removed.
   */
  const handleUnfavorite = (quoteToRemove: Quote) => {
    console.log("FavoritesList: Attempting to remove:", quoteToRemove.text);

    // 1. Filter the current state to create a new array without the removed quote
    //    We compare by quote text; use a unique ID if available in your Quote type.
    const updatedFavorites = favoriteQuotes.filter(
      (quote) => quote.text !== quoteToRemove.text
    );

    // 2. Try to save the updated (smaller) list back to Local Storage
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
      console.log("FavoritesList: Successfully saved updated favorites after removal.");

      // 3. Update the component's state to re-render the list
      setFavoriteQuotes(updatedFavorites);

    } catch (err) {
      console.error("FavoritesList: Failed to save updated favorites after removal:", err);
      setError("Could not update favorites list after removing item.");
      // Optionally: could try reloading all favorites via loadFavorites() to ensure consistency
    }
  };

  // --- Render Logic ---

  // Display loading state
  if (isLoading) {
    return <p className="text-center text-muted-foreground py-8">Loading favorites...</p>;
  }

  // Display error state
  if (error) {
    return <p className="text-center text-red-600 dark:text-red-400 py-8">Error: {error}</p>;
  }

  // Display message if no favorites are saved
  if (favoriteQuotes.length === 0) {
    return <p className="text-center text-muted-foreground py-8">You haven&apos;t saved any favorite quotes yet.</p>;
  }

  // Display the list of favorite quotes
  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 p-4">
      <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">
        Your Favorite Quotes
      </h3>
      {favoriteQuotes.map((quote, index) => (
        // Use Card for each quote, applying theme-aware colors
        <Card
          // Using quote text + index as key is okay for this relatively stable list,
          // but a proper unique ID would be better if quotes could be added/removed rapidly.
          key={quote.text + index}
          className="bg-card text-card-foreground border border-border shadow-sm transition-shadow hover:shadow-md"
        >
          <CardContent className="p-4 pb-2">
            <blockquote className="text-lg italic text-foreground border-l-4 border-secondary pl-3 mb-2">
              &quot;{quote.text}&quot;
            </blockquote>
          </CardContent>
          <CardFooter className="px-4 pt-0 pb-3 flex justify-between items-center">
            <cite className="text-sm text-muted-foreground not-italic">
              — {quote.author}
            </cite>
            {/* Unfavorite Button */}
            <Button
              variant="ghost" // Less prominent button style
              size="icon"     // Compact size for icon-only
              onClick={() => handleUnfavorite(quote)} // Call handler with the specific quote
              aria-label={`Remove quote by ${quote.author} from favorites`}
              // Apply destructive colors for visual cue
              className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
            >
              <Trash2 className="h-4 w-4" /> {/* Trash icon */}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FavoritesList;

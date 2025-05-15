// src/types/index.ts (Example - Adding a type guard)

export type Quote = {
    text: string;
    author: string;
    theme: string;
  };
  
  // Type guard function to check if an object is a valid Quote
  export function isQuote(obj: unknown): obj is Quote {
    // Check if obj is not null/undefined and is an object
    if (!obj || typeof obj !== 'object') {
      return false;
    }
    
    // Type assertion for property access
    const candidate = obj as Record<string, unknown>;
    
    // Check for the presence and string type of required properties
    return (
      typeof candidate.text === 'string' && candidate.text.trim() !== '' &&
      typeof candidate.author === 'string' && candidate.author.trim() !== '' &&
      typeof candidate.theme === 'string' && candidate.theme.trim() !== ''
    );
  }
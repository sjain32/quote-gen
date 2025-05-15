
import QuoteDisplay from '@/components/QuoteDisplay';
import type { Quote } from '@/types';
import allQuotesData from '@/data/quotes.json'; 

// --- Server-side Data Fetching Functions ---
async function getInitialQuote(): Promise<Quote> {
  // ... ( existing logic to get one random quote) ...
  const quotes: Quote[] = allQuotesData;
  if (!quotes || quotes.length === 0) {
    return { text: "No quotes found.", author: "System", theme: "Error" };
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function getUniqueThemes(quotes: Quote[]): string[] {
  // ... ( existing logic to get unique themes + 'All') ...
  const allThemes = quotes.map(quote => quote.theme);
  const uniqueThemesSet = new Set(allThemes);
  const uniqueThemesArray = Array.from(uniqueThemesSet);
  uniqueThemesArray.sort();
  return ['All', ...uniqueThemesArray];
}
// --- End Data Fetching Functions ---

export default async function Home() {
  const initialQuote = await getInitialQuote();
  const availableThemes = getUniqueThemes(allQuotesData);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      {/* Decorative elements */}
      <div className="fixed pointer-events-none inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="w-full max-w-4xl flex flex-col items-center relative z-10 animate-fade-in">
        {/* Page Title with decorative elements */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-shadow-sm">
              Themed Quote Generator
            </span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Discover wisdom and inspiration through thoughtfully curated quotes
          </p>
        </div>

        {/* Main content area with glass effect */}
        <div className="w-full glass-effect rounded-2xl p-6 sm:p-8 shadow-lg">
          <QuoteDisplay
            initialQuote={initialQuote}
            availableThemes={availableThemes}
          />
        </div>
        
        {/* Footer */}
        <footer className="mt-12 text-sm text-muted-foreground text-center">
          <p>© {new Date().getFullYear()} Quote Generator. Find your inspiration.</p>
        </footer>
      </div>
    </main>
  );
}

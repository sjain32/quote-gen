
// This marks all exported functions in this file as Server Actions.
'use server';

import type { Quote } from '@/types'; // Import your Quote type

// 2. Import the data source (same as the API route).
// Adjust the import path if your file is located elsewhere.
import quotesData from '@/data/quotes.json';

/**
 * Server Action to fetch a random quote from the local quotes.json file.
 * This function executes ONLY on the server.
 * It can be called directly from Client Components.
 *
 * @returns {Promise<Quote>} A promise that resolves to a random Quote object.
 * @throws {Error} If no quotes are available or an unexpected error occurs.
 */
export async function getRandomQuoteAction(theme?: string): Promise<Quote> {
    // ... inside getRandomQuoteAction ...
    const requestedTheme = theme; // Theme passed as argument
    const allQuotes: Quote[] = quotesData;
    let quotesPool: Quote[];

    // THIS IS THE KEY LOGIC:
    // Check if a specific theme was provided (and it's not 'All')
    if (requestedTheme && requestedTheme !== 'All') {
        // Filter the quotes array if a specific theme is provided
        quotesPool = allQuotes.filter(quote =>
            quote.theme.toLowerCase() === requestedTheme.toLowerCase()
        );
        console.log(`Server Action: Filtered pool for theme \"${requestedTheme}\", found ${quotesPool.length} quotes.`);
    } else {
        // *** THIS ELSE BLOCK HANDLES THE 'All' CASE ***
        // If theme is 'All' or undefined, use the full list.
        quotesPool = allQuotes;
        console.log(`Server Action: Using full pool of ${quotesPool.length} quotes (Theme: All or none).`);
    }

    // Handle empty pool (could happen after filtering)
    if (quotesPool.length === 0) {
        // ... throw appropriate error ...
    }

    // Select randomly from the determined 'quotesPool'
    const randomIndex = Math.floor(Math.random() * quotesPool.length);
    const randomQuote: Quote = quotesPool[randomIndex];

    return randomQuote;
}


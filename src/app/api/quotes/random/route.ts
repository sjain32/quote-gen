// src/app/api/quotes/random/route.ts

import { NextResponse } from 'next/server';
import type { Quote } from '@/types'; // Import your Quote type

// Assuming your quotes.json file is in 'src/data/quotes.json'
// Adjust the import path if your file is located elsewhere.
import quotesData from '@/data/quotes.json';

/**
 * Handles GET requests to /api/quotes/random.
 * Reads quotes from the local quotes.json file, selects a random one,
 * and returns it as a JSON response.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to the response object.
 */
export async function GET() {
  try {
    // 1. Ensure we have the quotes data loaded.
    //    The 'quotesData' variable holds the array of quote objects.
    const allQuotes: Quote[] = quotesData;

    // 2. Check if there are any quotes available.
    if (!allQuotes || allQuotes.length === 0) {
      // If the file is empty or something went wrong during import,
      // return a 500 Internal Server Error response.
      console.error("❌ No quotes found in quotes.json data.");
      return NextResponse.json(
        { error: 'Internal Server Error', message: 'No quotes available.' },
        { status: 500 }
      );
    }

    // 3. Select a random quote from the array.
    //    - Math.random() generates a float between 0 (inclusive) and 1 (exclusive).
    //    - Multiply by the array length to get a value between 0 and length-1.
    //    - Math.floor() rounds down to the nearest whole number, giving a valid array index.
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    const randomQuote: Quote = allQuotes[randomIndex];

    // 4. Return the selected random quote as a JSON response.
    //    - NextResponse.json() automatically stringifies the object and sets the
    //      correct Content-Type header ('application/json').
    //    - By default, it sends a 200 OK status code.
    console.log(`✅ Sending random quote: "${randomQuote.text.substring(0, 30)}..."`);
    return NextResponse.json(randomQuote);

  } catch (error) {
    // 5. Catch any unexpected errors during the process.
    console.error("❌ Error in GET /api/quotes/random:", error);

    // Return a generic 500 error response.
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to process the request.' },
      { status: 500 } // Explicitly set the status code to 500
    );
  }
}

// Note: If you were using an external API (e.g., Quotable) instead of local JSON:
// The logic inside GET would look more like this:
/*
export async function GET(request: Request) {
  try {
    const externalApiResponse = await fetch('https://api.quotable.io/random'); // Example external API call
    if (!externalApiResponse.ok) {
      throw new Error(`External API failed: ${externalApiResponse.statusText}`);
    }
    const externalQuoteData = await externalApiResponse.json();

    // ---- IMPORTANT ----
    // Adapt the external data to YOUR Quote type structure
    const quote: Quote = {
      text: externalQuoteData.content,       // Map external fields to your fields
      author: externalQuoteData.author,
      theme: externalQuoteData.tags[0] || 'General' // Handle potential missing theme/tag
    };
    // ---- END IMPORTANT ----

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error fetching from external API:", error);
    return NextResponse.json({ error: 'Failed to fetch quote from external source' }, { status: 502 }); // 502 Bad Gateway might be appropriate
  }
}
*/

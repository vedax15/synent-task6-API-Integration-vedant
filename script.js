document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const loader = document.getElementById('loader');
    const errorMsg = document.getElementById('error-msg');
    const quoteContainer = document.getElementById('quote-container');

    // The API endpoint
    const API_URL = 'https://dummyjson.com/quotes/random';

    async function fetchQuote() {
        // 1. Set Loading State
        loader.style.display = 'block';
        quoteContainer.style.display = 'none';
        errorMsg.style.display = 'none';
        newQuoteBtn.disabled = true;

        try {
            // 2. Fetch Data
            const response = await fetch(API_URL);
            
            // Check if the response is OK (status 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // 3. Parse JSON Data
            const data = await response.json();

            // 4. Update UI with Data
            quoteText.textContent = `"${data.quote}"`;
            quoteAuthor.textContent = `- ${data.author}`;
            
            // Show the quote container
            quoteContainer.style.display = 'flex';

        } catch (error) {
            // 5. Handle Errors
            console.error('Fetch error:', error);
            errorMsg.style.display = 'block';
        } finally {
            // 6. Cleanup (hide loader, enable button regardless of success/fail)
            loader.style.display = 'none';
            newQuoteBtn.disabled = false;
        }
    }

    // Event Listener for the button
    newQuoteBtn.addEventListener('click', fetchQuote);

    // Fetch a quote immediately when the page loads
    fetchQuote();
});
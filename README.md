# GIPHY Search Engine

A beginner-friendly responsive GIF search website built with HTML5, CSS3, JavaScript, and the GIPHY API.

## Pages
- `index.html`: homepage, search form, trending GIF feed
- `trending.html`: dedicated trending feed
- `contact.html`: frontend contact form validation

## Run in VS Code
1. Extract the ZIP folder.
2. Open VS Code.
3. Choose **File → Open Folder** and select `giphy-search-engine`.
4. Install the **Live Server** extension if you do not already have it.
5. Right-click `index.html` and select **Open with Live Server**.
6. Test search terms such as Cats, Cars, Football, Programming, Memes, Cricket, and Dogs.

Avoid opening the HTML via `file://`; use a local server to avoid browser restrictions.

## API key security
This project places the API key in `js/config.js` to support this beginner frontend exercise. Anyone can inspect browser JavaScript and view that key. Rotate the key you shared and use a new development key; do not publish a live key to a public repository. For production, use a backend proxy and keep the secret server-side.

## JavaScript concepts shown
`const`/`let`, functions, arrays, objects, `map()`, `filter()`, `forEach()`, `querySelector()`, `getElementById()`, `innerHTML`, `textContent`, `addEventListener()`, conditionals, template literals, Fetch, Promises, `async`/`await`, and `try`/`catch`.

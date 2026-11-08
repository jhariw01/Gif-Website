// Homepage: load trending GIFs and allow keyword search.
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.getElementById("search-input");
  const gifGrid = document.querySelector("#gif-grid");
  const gifStatus = document.getElementById("gif-status");
  const searchMessage = document.getElementById("search-message");
  const resultsHeading = document.getElementById("results-heading");
  document.getElementById("year").textContent = new Date().getFullYear();

  async function fetchGifs(endpoint, parameters = {}) {
    const query = new URLSearchParams({
      api_key: GIPHY_API_KEY,
      limit: String(GIF_LIMIT),
      rating: GIF_RATING,
      ...parameters
    });
    const response = await fetch(`${GIPHY_API_BASE}/${endpoint}?${query}`);
    if (!response.ok) throw new Error(`GIPHY request failed (${response.status})`);
    const result = await response.json();
    return result.data || [];
  }

  function renderGifs(gifs) {
    // map() transforms API objects into the display-ready values; filter() removes entries without images.
    const displayGifs = gifs.map((gif) => ({
      id: gif.id,
      title: (gif.title || "").trim() || "Untitled GIF",
      preview: gif.images?.fixed_width?.url || gif.images?.original?.url || "",
      url: gif.url || ""
    })).filter((gif) => gif.preview);

    gifGrid.innerHTML = "";
    // forEach() builds a card for every usable GIF object.
    displayGifs.forEach((gif) => {
      const card = document.createElement("article");
      card.className = "gif-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `View details for ${gif.title}`);
      card.innerHTML = `<img src="${gif.preview}" alt="${gif.title}" loading="lazy"><h3>${gif.title}</h3>`;
      card.addEventListener("click", () => window.openGifModal(gif));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.openGifModal(gif);
        }
      });
      gifGrid.appendChild(card);
    });
    return displayGifs.length;
  }

  async function loadTrending() {
    gifStatus.textContent = "Loading trending GIFs…";
    gifStatus.className = "message";
    gifGrid.innerHTML = "";
    resultsHeading.textContent = "Trending GIFs";
    searchMessage.textContent = "";
    try {
      const gifs = await fetchGifs("trending");
      const count = renderGifs(gifs);
      gifStatus.textContent = count ? "" : "No trending GIFs were returned. Try again later.";
    } catch (error) {
      gifStatus.textContent = "Could not load trending GIFs. Check your connection and API key, then try again.";
      gifStatus.className = "message error";
      console.error(error);
    }
  }

  async function searchGifs(keyword) {
    gifStatus.textContent = `Searching for “${keyword}”…`;
    gifStatus.className = "message";
    gifGrid.innerHTML = "";
    resultsHeading.textContent = `GIFs for “${keyword}”`;
    searchMessage.textContent = "";
    try {
      const gifs = await fetchGifs("search", { q: keyword });
      const count = renderGifs(gifs);
      gifStatus.textContent = count ? "" : `No GIFs found for “${keyword}”. Try another keyword.`;
    } catch (error) {
      gifStatus.textContent = "Search failed. Please check your connection and API key.";
      gifStatus.className = "message error";
      console.error(error);
    }
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = searchInput.value.trim();
    if (!keyword) {
      searchMessage.textContent = "Please enter a keyword to search.";
      searchMessage.className = "message error";
      searchInput.focus();
      return;
    }
    searchGifs(keyword);
  });

  loadTrending();
});

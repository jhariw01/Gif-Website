// Dedicated Trending page.
document.addEventListener("DOMContentLoaded", () => {
  const gifGrid = document.querySelector("#gif-grid");
  const gifStatus = document.getElementById("gif-status");
  document.getElementById("year").textContent = new Date().getFullYear();

  async function loadTrendingGifs() {
    gifStatus.textContent = "Loading trending GIFs…";
    gifStatus.className = "message";
    try {
      const query = new URLSearchParams({ api_key: GIPHY_API_KEY, limit: String(GIF_LIMIT), rating: GIF_RATING });
      const response = await fetch(`${GIPHY_API_BASE}/trending?${query}`);
      if (!response.ok) throw new Error(`GIPHY request failed (${response.status})`);
      const result = await response.json();
      const gifs = result.data || [];
      const displayGifs = gifs.map((gif) => ({
        title: (gif.title || "").trim() || "Untitled GIF",
        preview: gif.images?.fixed_width?.url || gif.images?.original?.url || "",
        url: gif.url || ""
      })).filter((gif) => gif.preview);

      gifGrid.innerHTML = "";
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
      gifStatus.textContent = displayGifs.length ? "" : "No trending GIFs were returned.";
    } catch (error) {
      gifStatus.textContent = "Could not load trending GIFs. Check your connection and API key.";
      gifStatus.className = "message error";
      console.error(error);
    }
  }
  loadTrendingGifs();
});

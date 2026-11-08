// Shared GIF modal functionality used by the homepage and Trending page.
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("gif-modal");
  if (!modal) return;

  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalStatus = document.getElementById("modal-status");
  const closeButton = document.getElementById("modal-close");
  const copyButton = document.getElementById("copy-url");
  const openLink = document.getElementById("open-giphy");
  let selectedGifUrl = "";
  let previousFocus = null;

  // Expose a small function for card click handlers.
  window.openGifModal = (gif) => {
    previousFocus = document.activeElement;
    selectedGifUrl = gif.url || "";
    modalImage.src = gif.preview || "";
    modalImage.alt = gif.title || "GIF preview";
    modalTitle.textContent = gif.title || "Untitled GIF";
    openLink.href = gif.url || "https://giphy.com/";
    modalStatus.textContent = "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    closeButton.focus();
    document.body.style.overflow = "hidden";
  };

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
    document.body.style.overflow = "";
    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
  }

  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  copyButton.addEventListener("click", async () => {
    if (!selectedGifUrl) return;
    try {
      await navigator.clipboard.writeText(selectedGifUrl);
      modalStatus.textContent = "GIF URL copied to clipboard!";
      modalStatus.className = "message success";
    } catch (error) {
      modalStatus.textContent = "Clipboard access failed. You can open the GIF on GIPHY instead.";
      modalStatus.className = "message error";
    }
  });
});

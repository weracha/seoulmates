document.addEventListener("DOMContentLoaded", () => {
  const firstNameInput = document.getElementById("firstName");
  const biasNameInput = document.getElementById("biasName");
  const previewButton = document.getElementById("previewEnter");
  const clearButton = document.getElementById("previewClear");
  const placeholder = document.getElementById("previewPlaceholder");
  const storyOutput = document.getElementById("previewStory");
  const errorOutput = document.getElementById("previewError");
  const previewBox = document.getElementById("previewBox");
  const expandButton = document.getElementById("previewExpand");
  const endCta = document.getElementById("previewEndCta");
  const femaleCtaName = document.getElementById("femaleNameCta");
  const maleCtaName = document.getElementById("maleNameCta");

  // This stays true after the first successful Preview click, including after Clear.
  let purchaseButtonUnlocked = false;

  function updatePurchaseNames() {
    const firstName = firstNameInput.value.trim();
    const biasName = biasNameInput.value.trim();
    if (firstName) femaleCtaName.textContent = firstName;
    if (biasName) maleCtaName.textContent = biasName;
  }

  function showPreview() {
    const firstName = firstNameInput.value.trim();
    const biasName = biasNameInput.value.trim();
    errorOutput.textContent = "";
    if (!firstName || !biasName) {
      errorOutput.textContent = "Please enter both names to see your preview.";
      return;
    }
    if (!window.SEOULMATES_PREVIEW_STORY) {
      errorOutput.textContent = "The preview could not load. Please refresh the page and try again.";
      return;
    }

    const personalizedStory = window.SEOULMATES_PREVIEW_STORY
      .replaceAll("{{FEMALE_NAME}}", firstName)
      .replaceAll("{{MALE_NAME}}", biasName);

    placeholder.hidden = true;
    storyOutput.hidden = false;
    // Render the supplied **bold** emphasis safely while escaping visitor names
    // and all other story text before inserting it into the page.
    const escapedStory = personalizedStory.replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
    storyOutput.innerHTML = escapedStory.replace(/\*\*(.+?)\*\*/gs, "<strong>$1</strong>");
    // Restart the fade on every successful Preview click so name changes are visible.
    storyOutput.classList.remove("preview-fade-in");
    void storyOutput.offsetWidth;
    storyOutput.classList.add("preview-fade-in");
    previewBox.classList.add("has-preview");
    previewBox.classList.remove("is-expanded");
    expandButton.hidden = false;
    expandButton.textContent = "Read the full preview";
    expandButton.setAttribute("aria-expanded", "false");

    purchaseButtonUnlocked = true;
    endCta.hidden = false;
    clearButton.hidden = false;
    updatePurchaseNames();
  }

  function scrollToPreviewStart(behavior = "smooth") {
    // Anchor the viewport to the beginning of the preview, not to the toggle
    // button or the purchase CTA. This is the reading position users need.
    const previewTop = previewBox.getBoundingClientRect().top + window.scrollY;
    const targetTop = Math.max(0, previewTop - 16);
    window.scrollTo({ top: targetTop, behavior });
  }

  function togglePreview() {
    const wasExpanded = previewBox.classList.contains("is-expanded");

    if (!wasExpanded) {
      // The visitor may be at the bottom of the shortened excerpt. Move the
      // viewport to the preview's beginning as it expands, so new text flows
      // downward from the visible top instead of appearing above the screen.
      scrollToPreviewStart("smooth");
      previewBox.classList.add("is-expanded");
      expandButton.textContent = "Show less";
      expandButton.setAttribute("aria-expanded", "true");
      return;
    }

    // Collapse first, then move the viewport up to the preview's beginning.
    // This deliberately follows the shrinking content rather than preserving
    // the old bottom-of-preview screen position near the purchase CTA.
    previewBox.classList.remove("is-expanded");
    expandButton.textContent = "Read the full preview";
    expandButton.setAttribute("aria-expanded", "false");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToPreviewStart("smooth"));
    });
  }

  function clearPreview() {
    firstNameInput.value = "";
    biasNameInput.value = "";
    storyOutput.textContent = "";
    storyOutput.hidden = true;
    placeholder.hidden = false;
    errorOutput.textContent = "";
    clearButton.hidden = true;
    expandButton.hidden = true;
    previewBox.classList.remove("has-preview", "is-expanded");
    // Keep the unlocked purchase CTA visible after Clear, as requested.
    if (purchaseButtonUnlocked) endCta.hidden = false;
    firstNameInput.focus();
  }

  previewButton.addEventListener("click", showPreview);
  expandButton.addEventListener("click", togglePreview);
  clearButton.addEventListener("click", clearPreview);
  firstNameInput.addEventListener("input", updatePurchaseNames);
  biasNameInput.addEventListener("input", updatePurchaseNames);

  [firstNameInput, biasNameInput].forEach(input => {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        showPreview();
      }
    });
  });
});

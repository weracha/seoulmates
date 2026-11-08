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
    storyOutput.textContent = personalizedStory;
    previewBox.classList.add("has-preview");
    previewBox.classList.remove("is-expanded");
    expandButton.hidden = false;
    expandButton.textContent = "Read the full preview";
    expandButton.setAttribute("aria-expanded", "false");
    // Once a visitor has generated a preview, keep the purchase button visible,
    // even if they collapse or clear the preview later.
    endCta.classList.add("is-visible");
    clearButton.hidden = false;
    femaleCtaName.textContent = firstName;
    maleCtaName.textContent = biasName;
  }

  function togglePreview() {
    // Keep the preview's top edge in the same place on screen when collapsing.
    const previewTop = previewBox.getBoundingClientRect().top;
    const expanded = previewBox.classList.toggle("is-expanded");
    expandButton.textContent = expanded ? "Show less" : "Read the full preview";
    expandButton.hidden = false;
    expandButton.setAttribute("aria-expanded", String(expanded));

    // The buy button remains visible after the first successful Preview click.
    endCta.classList.add("is-visible");

    if (!expanded) {
      requestAnimationFrame(() => {
        const newTop = previewBox.getBoundingClientRect().top;
        const delta = newTop - previewTop;
        const root = document.documentElement;
        const oldBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        window.scrollBy(0, delta);
        requestAnimationFrame(() => { root.style.scrollBehavior = oldBehavior; });
      });
    }
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
    // Intentionally leave the purchase button visible after it has appeared.
    endCta.classList.add("is-visible");
    previewBox.classList.remove("has-preview", "is-expanded");
    firstNameInput.focus();
  }

  previewButton.addEventListener("click", showPreview);
  expandButton.addEventListener("click", togglePreview);
  clearButton.addEventListener("click", clearPreview);
  // Update the personalised button labels live as either name is edited.
  firstNameInput.addEventListener("input", () => {
    const value = firstNameInput.value.trim();
    if (value) femaleCtaName.textContent = value;
  });
  biasNameInput.addEventListener("input", () => {
    const value = biasNameInput.value.trim();
    if (value) maleCtaName.textContent = value;
  });

  [firstNameInput, biasNameInput].forEach(input => {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        showPreview();
      }
    });
  });
});

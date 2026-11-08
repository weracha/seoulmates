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
    endCta.classList.remove("is-visible");
    clearButton.hidden = false;
    femaleCtaName.textContent = firstName;
    maleCtaName.textContent = biasName;
    expandButton.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function togglePreview() {
    const expanded = previewBox.classList.toggle("is-expanded");
    expandButton.textContent = expanded ? "Show less" : "Read the full preview";
    if (expanded) {
      endCta.classList.add("is-visible");
    } else {
      endCta.classList.remove("is-visible");
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
    endCta.classList.remove("is-visible");
    previewBox.classList.remove("has-preview", "is-expanded");
    firstNameInput.focus();
  }

  previewButton.addEventListener("click", showPreview);
  expandButton.addEventListener("click", togglePreview);
  clearButton.addEventListener("click", clearPreview);
  [firstNameInput, biasNameInput].forEach(input => {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        showPreview();
      }
    });
  });
});

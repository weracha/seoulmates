document.addEventListener("DOMContentLoaded", () => {
  const firstNameInput = document.getElementById("firstName");
  const biasNameInput = document.getElementById("biasName");
  const enterButton = document.getElementById("previewEnter");
  const clearButton = document.getElementById("previewClear");
  const placeholder = document.getElementById("previewPlaceholder");
  const storyOutput = document.getElementById("previewStory");
  const errorOutput = document.getElementById("previewError");

  function showPreview() {
    const firstName = firstNameInput.value.trim();
    const biasName = biasNameInput.value.trim();

    errorOutput.textContent = "";
    if (!firstName || !biasName) {
      errorOutput.textContent = "Please enter both names to see your preview.";
      return;
    }

    const personalizedStory = window.SEOULMATES_PREVIEW_STORY
      .replaceAll("{{FEMALE_NAME}}", firstName)
      .replaceAll("{{MALE_NAME}}", biasName);

    placeholder.hidden = true;
    storyOutput.hidden = false;
    storyOutput.textContent = personalizedStory;
  }

  function clearPreview() {
    firstNameInput.value = "";
    biasNameInput.value = "";
    storyOutput.textContent = "";
    storyOutput.hidden = true;
    placeholder.hidden = false;
    errorOutput.textContent = "";
    firstNameInput.focus();
  }

  enterButton.addEventListener("click", showPreview);
  clearButton.addEventListener("click", clearPreview);
  [firstNameInput, biasNameInput].forEach(input => {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") showPreview();
    });
  });

  // Softly reveal sections as they enter the viewport.
  // If the visitor has reduced-motion enabled, keep everything visible without movement.
  const revealEls = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(el => el.classList.remove("js-hide"));
    return;
  }

  revealEls.forEach(el => el.classList.add("js-hide"));

  const observer = new IntersectionObserver((entries, io) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("js-hide");
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -24px 0px"
  });

  revealEls.forEach(el => observer.observe(el));
});

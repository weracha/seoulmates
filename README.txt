# Seoulmates website

## Folder guide
- `index.html`: page structure and the order of sections.
- `css/style.css`: colours, fonts, spacing, effects, and responsive styling.
- `js/script.js`: name inputs, preview display, Clear button, and scroll reveal.
- `stories/preview-story.js`: the preview story text and its name placeholders.
- `images/seoulmates-cover.png`: the one and only image used on the page.

## Preview on your computer
Open this folder in Visual Studio Code and use the Live Server extension, then click **Go Live**. You can also open `index.html` directly in a browser for a basic preview.

## Publish with GitHub Pages
Upload the complete contents of this folder to the root of a GitHub repository. In the repository, open **Settings → Pages**, select deployment from your main branch and the root (`/`) folder, then save.

## Important payment note
The three purchase buttons currently point to the existing Payhip checkout URL from your original website. The visible website price has been changed to $6.99, but update the product price in Payhip itself before publishing so the checkout charges the intended amount. Verify the checkout link and amount with a test purchase before launch.

## Editing later
- Change section order/content in `index.html`.
- Change visual design in `css/style.css`.
- Change the preview story in `stories/preview-story.js`. Keep `{{FEMALE_NAME}}` and `{{MALE_NAME}}` unchanged.
- Change preview behaviour in `js/script.js`.


## Latest layout adjustments
- Removed the extra K-drama headline section.
- Changed the preview heading to "See Your Fantasy Come to Life".
- Removed the extra sentence under that heading.
- Blended Stephanie's featured review into the page by removing its separate gradient/bokeh panel.
- Fixed horizontal padding on the preview and Please Note sections so text has breathing room on mobile.


## Latest visual refinements
- Reduced the "See Your Fantasy Come to Life" heading slightly: 24px on small screens and 27px on wider screens.
- Added a stronger golden glow when purchase/Enter buttons are hovered, focused, or pressed.
- Made the background stars shimmer a little brighter.
- Refined the soft scroll-reveal transition and observer trigger. Visitors who have reduced-motion enabled still see all content immediately, without movement.

## Safely editing the preview story
Open `stories/preview-story.js`. Edit only the story words between the opening and closing backticks. Keep `{{FEMALE_NAME}}` and `{{MALE_NAME}}` exactly as written. Blank lines create paragraph breaks. Avoid typing a backtick (`) or `${...}` inside the story because those have special meaning in JavaScript template strings. You do not need to use Format Document to edit the story; just change the words and save.

/******/ (() => { // webpackBootstrap
/*!********************************!*\
  !*** ./src/hero-video/view.js ***!
  \********************************/
/**
 * Hero Video Block - View Script
 *
 * Handles dynamic CSS variables for hero video blocks
 */
(function () {
  // Process all hero video blocks on the page
  const heroBlocks = document.querySelectorAll('.zepblock-hero-video[data-css-vars]');
  heroBlocks.forEach(function (block) {
    const cssVars = block.getAttribute('data-css-vars');
    if (cssVars) {
      // Apply CSS variables directly to the element
      block.style.cssText += cssVars;
    }
  });
})();
/******/ })()
;
//# sourceMappingURL=view.js.map
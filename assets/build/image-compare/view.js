/******/ (() => { // webpackBootstrap
/*!***********************************!*\
  !*** ./src/image-compare/view.js ***!
  \***********************************/
/**
 * Frontend functionality for image comparison slider
 */
function initImageCompare() {
  const sliders = document.querySelectorAll('.tblock-image-slider');
  sliders.forEach(slider => {
    const wrapper = slider.closest('.tblock-image-comparison');
    if (!wrapper) return;
    const handle = wrapper.querySelector('.tblock-image-handle');
    const divisor = wrapper.querySelector('.tblock-image-divisor');
    if (!handle || !divisor) return;
    const moveDivisor = () => {
      handle.style.left = slider.value + '%';
      divisor.style.width = slider.value + '%';
    };

    // Initialize position
    moveDivisor();

    // Add event listener
    slider.addEventListener('input', moveDivisor);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initImageCompare);
} else {
  initImageCompare();
}
/******/ })()
;
//# sourceMappingURL=view.js.map
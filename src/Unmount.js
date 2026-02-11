/**
 * Unmount
 * Entry point of the SPAWN DOM.
 *
 * If the provided render is already mounted, this method will detach and attach to new el.
 *
 * @param {Element} el - mount el
 * @returns {Element} of render
 */
 const Unmount = (el) => {
  // best-effort cleanup for intervals/timeouts attached by helpers (ex: RainbowText)
  // convention: element.__respawnCleanup is a function
  const cleanupOne = (node) => {
    if (!node) return;
    if (typeof node.__respawnCleanup === 'function') {
      try {
        node.__respawnCleanup();
      } catch (_) {
        // ignore cleanup errors
      }
    }
  };

  cleanupOne(el);
  if (el && typeof el.querySelectorAll === 'function') {
    el.querySelectorAll('*').forEach(cleanupOne);
  }

  el.remove();
  return null;
}

export default Unmount;

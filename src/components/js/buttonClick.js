// public/scripts/buttonClick.js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-url]').forEach((button) => {
    button.addEventListener('click', () => {
      const url = button.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    });
  });
});

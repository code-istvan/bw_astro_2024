export function initAccordion() {
  document.querySelectorAll('.accordion').forEach((accordionButton) => {
    const id = accordionButton.getAttribute('data-accordion-toggle');
    const accordionContent = document.querySelector(`[data-accordion-content="${id}"]`);
    const accordionIcon = document.querySelector(`[data-accordion-icon="${id}"]`);

    accordionButton.addEventListener('click', () => {
      if (accordionContent) {
        const contentHeight = accordionContent.scrollHeight;

        if (accordionContent.style.maxHeight === '0px' || !accordionContent.style.maxHeight) {
          accordionContent.style.maxHeight = contentHeight + 'px';
          accordionIcon.classList.add('rotate__45deg');
        } else {
          accordionContent.style.maxHeight = '0px';
          accordionIcon.classList.remove('rotate__45deg');
        }
      }
    });
  });
}

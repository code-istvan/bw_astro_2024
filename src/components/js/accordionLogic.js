/**
 * Inicializálja az accordion funkcionalitást
 * @param {string} rotateClass - A használni kívánt forgási class ('rotate__45deg' vagy 'rotate__90deg')
 */
export function initAccordion(rotateClass = 'rotate__45deg') {
  document.querySelectorAll('.accordion').forEach((accordionButton) => {
    const id = accordionButton.getAttribute('data-accordion-toggle');
    const accordionContent = document.querySelector(`[data-accordion-content="${id}"]`);
    const accordionIcon = document.querySelector(`[data-accordion-icon="${id}"]`);

    accordionButton.addEventListener('click', () => {
      if (accordionContent) {
        const contentHeight = accordionContent.scrollHeight;

        if (accordionContent.style.maxHeight === '0px' || !accordionContent.style.maxHeight) {
          accordionContent.style.maxHeight = contentHeight + 'px';
          accordionIcon.classList.add(rotateClass);
        } else {
          accordionContent.style.maxHeight = '0px';
          accordionIcon.classList.remove(rotateClass);
        }
      }
    });
  });
}

// Használati példák:
// 45 fokos forgatáshoz (ez az alapértelmezett):
// import { initAccordion } from './accordion';
// initAccordion(); // vagy explicit: initAccordion('rotate__45deg');

// 90 fokos forgatáshoz:
// import { initAccordion } from './accordion';
// initAccordion('rotate__90deg');

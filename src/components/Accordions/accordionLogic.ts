/**
 * Lehetséges forgatási classok az ikonhoz
 */
type RotateClass = 'rotate__45deg' | 'rotate__90deg';

/**
 * Inicializálja az accordion funkcionalitást
 * @param rotateClass - A használni kívánt forgási class ('rotate__45deg' vagy 'rotate__90deg')
 */
export function initAccordion(rotateClass: RotateClass = 'rotate__45deg'): void {
  const accordions = document.querySelectorAll<HTMLElement>('.accordion');

  accordions.forEach((accordionButton) => {
    const id = accordionButton.getAttribute('data-accordion-toggle');
    if (!id) return;

    const accordionContent = document.querySelector<HTMLElement>(`[data-accordion-content="${id}"]`);
    const accordionIcon = document.querySelector<HTMLElement>(`[data-accordion-icon="${id}"]`);

    accordionButton.addEventListener('click', () => {
      if (!accordionContent || !accordionIcon) return;

      const contentHeight = accordionContent.scrollHeight;

      const isClosed = accordionContent.style.maxHeight === '0px' || !accordionContent.style.maxHeight;

      if (isClosed) {
        accordionContent.style.maxHeight = `${contentHeight}px`;
        accordionIcon.classList.add(rotateClass);
      } else {
        accordionContent.style.maxHeight = '0px';
        accordionIcon.classList.remove(rotateClass);
      }
    });
  });
}

// Használati példák:
//
// initAccordion();              // alapértelmezett: 'rotate__45deg'
// initAccordion('rotate__90deg'); // explicit 90 fokos forgatás

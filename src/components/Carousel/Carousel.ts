import EmblaCarousel from 'embla-carousel';
import type { EmblaOptionsType } from 'embla-carousel';
import { addDotBtnsAndClickHandlers } from './EmblaCarouselDotButton.ts';

export function initCarousel(): void {
  const OPTIONS: EmblaOptionsType = { loop: true };

  const emblaNode = document.querySelector('.embla') as HTMLElement;
  const viewportNode = emblaNode.querySelector('.embla__viewport') as HTMLElement;
  const dotsNode = emblaNode.querySelector('.embla__dots') as HTMLElement;

  const emblaApi = EmblaCarousel(viewportNode, OPTIONS);
  const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode);

  emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
}
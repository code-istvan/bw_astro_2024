import EmblaCarousel from 'embla-carousel';
import { addDotBtnsAndClickHandlers } from './carousel-dot-btn';

export function initCarousel() {
  const OPTIONS = { loop: true };

  const emblaNode = document.querySelector('.embla');
  const viewportNode = emblaNode.querySelector('.embla__viewport');
  const dotsNode = emblaNode.querySelector('.embla__dots');

  const emblaApi = EmblaCarousel(viewportNode, OPTIONS);
  const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode);

  emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
}

import EmblaCarousel from 'embla-carousel';

const addDotBtnsAndClickHandlers = (emblaApi, dotsNode) => {
  let dotNodes = [];

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('');

    const scrollTo = (index) => {
      emblaApi.scrollTo(index);
    };

    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'));
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => scrollTo(index), false);
    });
  };

  const toggleDotBtnsActive = () => {
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();
    dotNodes[previous].classList.remove('embla__dot--selected');
    dotNodes[selected].classList.add('embla__dot--selected');
  };

  emblaApi
    .on('init', addDotBtnsWithClickHandlers)
    .on('reInit', addDotBtnsWithClickHandlers)
    .on('init', toggleDotBtnsActive)
    .on('reInit', toggleDotBtnsActive)
    .on('select', toggleDotBtnsActive);

  return () => {
    dotsNode.innerHTML = '';
  };
};

export function initCarousel() {
  const OPTIONS = { loop: true };

  const emblaNode = document.querySelector('.embla');
  const viewportNode = emblaNode.querySelector('.embla__viewport');
  const dotsNode = emblaNode.querySelector('.embla__dots');

  const emblaApi = EmblaCarousel(viewportNode, OPTIONS);
  const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode);

  emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
}
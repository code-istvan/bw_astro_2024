import EmblaCarousel from 'embla-carousel';

const addDotBtnsAndClickHandlers = (emblaApi, dotsNode, isMobile) => {
  let dotNodes = [];

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map((_, index) => {
        const buttonType = isMobile ? 'div' : 'button';
        const ariaLabel = isMobile ? '' : ` aria-label="Go to slide ${index + 1}"`;
        return `<${buttonType} class="embla__dot"${ariaLabel} type="button"></${buttonType}>`;
      })
      .join('');

    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'));

    if (!isMobile) {
      const scrollTo = (index) => {
        emblaApi.scrollTo(index);
      };

      dotNodes.forEach((dotNode, index) => {
        dotNode.addEventListener('click', () => scrollTo(index), false);
      });
    }
  };

  const toggleDotBtnsActive = () => {
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();
    if (dotNodes[previous]) {
      dotNodes[previous].classList.remove('embla__dot--selected');
    }
    if (dotNodes[selected]) {
      dotNodes[selected].classList.add('embla__dot--selected');
    }
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

function initCarousel() {
  const OPTIONS = { loop: true };
  const emblaNodes = document.querySelectorAll('.embla');

  emblaNodes.forEach((emblaNode) => {
    const viewportNode = emblaNode.querySelector('.embla__viewport');
    const dotsNode = emblaNode.querySelector('.embla__dots');

    let isMobile = window.innerWidth <= 768;
    const emblaApi = EmblaCarousel(viewportNode, OPTIONS);
    const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode, isMobile);

    emblaApi.on('destroy', removeDotBtnsAndClickHandlers);

    // Listen for window resize events to update isMobile
    window.addEventListener('resize', () => {
      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        isMobile = newIsMobile;
        removeDotBtnsAndClickHandlers();
        addDotBtnsAndClickHandlers(emblaApi, dotsNode, isMobile);
      }
    });
  });
}

initCarousel();

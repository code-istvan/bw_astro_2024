import EmblaCarousel from 'embla-carousel';
import type { EmblaCarouselType } from 'embla-carousel';

type CleanupFn = () => void;

/**
 * Létrehozza a dot gombokat és (desktopon) a kattintási handlereket.
 * Visszaad egy takarító függvényt, ami eltávolítja a dot-okat / handlereket.
 */
function addDotBtnsAndClickHandlers(emblaApi: EmblaCarouselType, dotsNode: HTMLElement, isMobile: boolean): CleanupFn {
  let dotNodes: HTMLElement[] = [];

  function addDotBtnsWithClickHandlers(): void {
    const snaps = emblaApi.scrollSnapList();

    dotsNode.innerHTML = snaps
      .map((_, index) => {
        const buttonType = isMobile ? 'div' : 'button';
        const aria = isMobile ? '' : ` aria-label="Go to slide ${index + 1}"`;
        // type attribútum akkor is ártalmatlan, ha div: HTML nem veszi figyelembe
        return `<${buttonType} class="embla__dot"${aria} type="button"></${buttonType}>`;
      })
      .join('');

    dotNodes = Array.from(dotsNode.querySelectorAll<HTMLElement>('.embla__dot'));

    // mobilon nincs kattinthatóság, csak állapotjelzés
    if (!isMobile) {
      const scrollTo = (index: number) => emblaApi.scrollTo(index);
      dotNodes.forEach((dotNode, index) => {
        dotNode.addEventListener('click', () => scrollTo(index), false);
      });
    }
  }

  function toggleDotBtnsActive(): void {
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();
    if (dotNodes[previous]) dotNodes[previous].classList.remove('embla__dot--selected');
    if (dotNodes[selected]) dotNodes[selected].classList.add('embla__dot--selected');
  }

  // első feliratkozások
  emblaApi
    .on('init', () => {
      addDotBtnsWithClickHandlers();
      toggleDotBtnsActive();
    })
    .on('reInit', () => {
      addDotBtnsWithClickHandlers();
      toggleDotBtnsActive();
    })
    .on('select', () => {
      toggleDotBtnsActive();
    });

  // cleanup: dotok és lokális referencia törlése (a click handlerek a DOM törlésével megszűnnek)
  return () => {
    dotsNode.innerHTML = '';
    dotNodes = [];
  };
}

/**
 * Keres minden .embla blokkot, és inicializálja az Embla-t + a dotokat.
 */
export function initCarousel(): void {
  // SSR guard
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const OPTIONS = { loop: true } as const;
  const emblaNodes = document.querySelectorAll<HTMLElement>('.embla');

  emblaNodes.forEach((emblaNode) => {
    const viewportNode = emblaNode.querySelector<HTMLElement>('.embla__viewport');
    const dotsNode = emblaNode.querySelector<HTMLElement>('.embla__dots');
    if (!viewportNode || !dotsNode) return;

    let isMobile = window.innerWidth <= 768;

    const emblaApi = EmblaCarousel(viewportNode, OPTIONS);
    let removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode, isMobile);

    const onResize = (): void => {
      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        isMobile = newIsMobile;
        // rajzoljuk újra a dotokat az új módban
        removeDotBtnsAndClickHandlers();
        removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode, isMobile);
      }
    };

    window.addEventListener('resize', onResize);

    // teljes takarítás Embla destroy-kor
    emblaApi.on('destroy', () => {
      window.removeEventListener('resize', onResize);
      removeDotBtnsAndClickHandlers();
    });
  });
}

// Ha külön scriptként töltöd, kliensen automatikusan indulhat:
if (typeof window !== 'undefined') {
  initCarousel();
}

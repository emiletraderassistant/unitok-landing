import { AfterViewInit, Directive, ElementRef, inject, OnDestroy } from '@angular/core';

@Directive({
  selector: '.shift-section',
})
export class ShiftAnimateDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private timer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      node.classList.add('animate-in', 'entered');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            this.timer = setTimeout(() => entry.target.classList.add('entered'), 1000);
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.3 },
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}

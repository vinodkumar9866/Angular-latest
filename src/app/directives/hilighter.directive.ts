import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHilighter]',
})
export class HilighterDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setElevation('10px 10px 20px rgba(0, 0, 0, 0.25)', 'scale(1.05)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setElevation('none', 'scale(1)');
  }

  // Utility function to apply shadow and transform
  private setElevation(boxShadow: string, transform: string) {
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', boxShadow);
    this.renderer.setStyle(this.el.nativeElement, 'transform', transform);
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      '0.3s ease-in-out'
    );
  }
}

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBoldOnHover]',
})
export class BoldOnHoverDirective {
  @HostBinding('style.fontWeight')
  fontWeight: string = 'normal';
  
  @HostListener('mouseenter')
  onMouseEnter() {
    this.fontWeight.sty
  }

  @HostListener('mouseleave')
  onMouseLeave() {

  }

  constructor() { }

}

import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAnimatedGradientOnHover]',
})
export class AnimatedGradientOnHoverDirective {
  timerId: any;
  private config: any;

  defaultConfig = {
    delay: 1000,
    colors: ['#ff6b6b', '#feca57', '#48dbfb'],
    thickness: '2px'
  }

  @Input() gradientConfig: {
    delay?: number;
    colors?: string[];
    thickness?: string;
  } = {};

  @HostBinding('class.active')
  isActive: boolean = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    clearTimeout(this.timerId);

    this.timerId = setTimeout(() => {
      this.isActive = true;
    }, this.config.delay);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    clearTimeout(this.timerId);
    this.isActive = false;
  }

  ngOnInit() {
    this.config = { ...this.defaultConfig, ...this.gradientConfig };
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}

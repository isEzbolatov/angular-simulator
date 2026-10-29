import { Directive, HostBinding, HostListener, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAnimatedGradientOnHover]',
})
export class AnimatedGradientOnHoverDirective implements OnInit, OnDestroy {
  timerId: ReturnType<typeof setTimeout> | undefined = undefined;

  private config: {
    delay: number;
    colors: string[];
    thickness: string;
  } = {
    delay: 1000,
    colors: ['#ff6b6b', '#feca57', '#48dbfb'],
    thickness: '2px',
  };

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
    this.config = { ...this.config, ...this.gradientConfig };
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}

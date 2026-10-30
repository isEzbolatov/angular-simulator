import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-homework-28-on-push-check',
  standalone: true,
  templateUrl: './on-push-check.component.html',
  styleUrl: './on-push-check.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushCheckComponent implements DoCheck {
  count = 0;

  private changeDetectorRef = inject(ChangeDetectorRef);

  incrementWithMarkForCheck(): void {
    this.count++;
    this.changeDetectorRef.markForCheck();
  }

  incrementWithDetectChanges(): void {
    this.count++;
    this.changeDetectorRef.detectChanges();
  }

  detachComponent(): void {
    this.changeDetectorRef.detach();
  }

  incrementWithoutManualCheck(): void {
    this.count++;
  }

  reattachComponent(): void {
    this.changeDetectorRef.reattach();
  }

  ngDoCheck(): void {
    console.log('OnPush Change Detection');
  }
}

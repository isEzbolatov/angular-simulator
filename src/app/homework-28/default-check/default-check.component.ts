import { ChangeDetectionStrategy, Component, DoCheck, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
/* eslint-disable lines-between-class-members */
@Component({
  selector: 'app-homework-28-default-check',
  standalone: true,
  templateUrl: './default-check.component.html',
  styleUrl: './default-check.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DefaultCheckComponent implements DoCheck, OnDestroy {
  private http = inject(HttpClient);
  private intervalId?: ReturnType<typeof setInterval>;

  count = 0;

  incrementByClick(): void {
    this.count++;
  }

  incrementByTimeout(): void {
    setTimeout(() => {
      this.count++;
    }, 1000);
  }

  incrementByPromise(): void {
    Promise.resolve().then(() => {
      this.count++;
    });
  }

  incrementByHttp(): void {
    this.http.get('https://dummyjson.com/test').subscribe(() => {
      this.count++;
    });
  }

  incrementByInterval(): void {
    let increments = 0;
    this.intervalId = setInterval(() => {
      this.count++;
      increments++;

      if (increments === 5) {
        this.stopInterval();
      }
    }, 1000);
  }

  runCombinedScenario(): void {
    this.count++;

    Promise.resolve().then(() => {
      this.count++;
    });

    setTimeout(() => {
      this.count++;
    }, 1000);

    this.http.get('https://dummyjson.com/test').subscribe(() => {
      this.count++;
    });
  }

  private stopInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  ngOnDestroy(): void {
    this.stopInterval();
  }

  ngDoCheck(): void {
    console.log('Change Detection');
  }
}

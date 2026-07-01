import { Component, inject, Input } from '@angular/core';
import { LoaderService } from '../loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);

  protected isLoading$ = this.loaderService.loading$;

  ngOnInit(): void {
    this.loaderService.showLoader();

    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 2000);
  }
}

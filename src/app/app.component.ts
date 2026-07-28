import { Component, inject, Output, DOCUMENT, DestroyRef } from '@angular/core';
import { Collection } from './collection';
import { MessageTextService } from '../message-text.service';
import { MessageList } from './message-list/message-list.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ThemeService } from './theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [MessageList, RouterOutlet, HeaderComponent, FooterComponent, CommonModule, LoaderComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  renderTextService: MessageTextService = inject(MessageTextService);
  themeService: ThemeService = inject(ThemeService);
  destroyRef = inject(DestroyRef);
  document = inject(DOCUMENT);

  constructor() {
    this.themeService.state$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        this.document.documentElement.classList.toggle(
          'my-app-dark',
          state.colorMode === 'dark'
        );
      });
  }
}

Collection;
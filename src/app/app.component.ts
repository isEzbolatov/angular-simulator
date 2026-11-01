import { Component, inject, DOCUMENT, DestroyRef } from '@angular/core';
import { MessageTextService } from './core/services/message-text.service';
import { MessageList } from './core/layout/message-list/message-list.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './core/layout/loader/loader.component';
import { ThemeService } from './core/services/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [
    MessageList,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    LoaderComponent,
  ],
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
    this.themeService.state$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((state) => {
      this.document.documentElement.classList.toggle('my-app-dark', state.colorMode === 'dark');
    });
  }
}

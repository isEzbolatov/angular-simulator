import { Component, inject, Output } from '@angular/core';
import { Collection } from './collection';
import { MessageTextService } from '../message-text.service';
import { MessageList } from './message-list/message-list.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  imports: [MessageList, RouterOutlet, HeaderComponent, FooterComponent, CommonModule, LoaderComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  renderTextService: MessageTextService = inject(MessageTextService);

  @Output() public loadingWebsite: boolean = false;

  loading$: LoaderService = inject(LoaderService);

  constructor() {
    setInterval(() => {
      this.loadingWebsite = true;
    }, 500)
  }
}

Collection;
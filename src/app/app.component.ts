import { Component, inject } from '@angular/core';
import { Collection } from './collection';
import { MessageTextService } from '../message-text.service';
import { MessageList } from './message-list/message-list.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [MessageList, RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  renderTextService: MessageTextService = inject(MessageTextService);

  public loadingWebsite: boolean = false;

  constructor() {
    setInterval(() => {
      this.loadingWebsite = true;
    }, 100)
  }
}

Collection;
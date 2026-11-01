import { Component, inject, OnInit } from '@angular/core';
import { QuotesStore } from '../../store/quotes.store';

@Component({
  selector: 'app-quotes-page',
  standalone: true,
  templateUrl: './quotes-page.component.html',
  styleUrl: './quotes-page.component.scss',
})
export class QuotesPageComponent implements OnInit {
  readonly store = inject(QuotesStore);

  ngOnInit(): void {
    this.store.loadQuotes();
  }
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { MessageTextService } from '../../message-text.service';

@Component({
  selector: 'in-message-list',
  imports: [FormsModule, CommonModule, NgTemplateOutlet],
  standalone: true,
  templateUrl: './message-list.component.html',
  styleUrl: './message-styles.scss',
})
export class MessageList {
  renderTextService: MessageTextService = inject(MessageTextService);
}
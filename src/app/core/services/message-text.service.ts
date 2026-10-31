import { Injectable } from '@angular/core';
import { MessageType } from '../models/message-type.enum';
import { IMessage } from '../models/message.model';
import { MessageText } from '../models/message-text.enum';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageTextService {
  readonly _messageType = MessageType;

  readonly _messageText = MessageText;

  private messageSubject$ = new BehaviorSubject<IMessage[]>([]);

  message$: Observable<IMessage[]> = this.messageSubject$.asObservable();

  private addMessage(text: MessageText, type: MessageType) {
    const currentMessages = this.messageSubject$.value;

    const newMessage: IMessage = {
      id: Date.now(),
      type: type,
      textMessage: text,
    };
    const updatedMessages = [...currentMessages, newMessage];

    this.messageSubject$.next(updatedMessages);

    setTimeout(() => {
      this.closeMessage(newMessage.id);
    }, 5000);
  }

  closeMessage(idMessage: number): void {
    const current = this.messageSubject$.value;
    const updated = current.filter((item) => item.id !== idMessage);
    this.messageSubject$.next(updated);
  }

  showWarn() {
    this.addMessage(this._messageText.WARN, this._messageType.WARN);
  }

  showError() {
    this.addMessage(this._messageText.ERROR, this._messageType.ERROR);
  }

  showSuccess() {
    this.addMessage(this._messageText.SUCCESS, this._messageType.SUCCESS);
  }

  showInfo() {
    this.addMessage(this._messageText.INFO, this._messageType.INFO);
  }
}

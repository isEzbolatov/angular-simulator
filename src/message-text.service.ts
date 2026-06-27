import { Injectable } from '@angular/core';
import { MessageType } from './enums/MessageType';
import { IMessage } from './interfaces/IMessage';
import { MessageText } from './enums/MessageText';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageTextService {
  readonly _messageType = MessageType;
  readonly _messageText = MessageText;

  private messageSubject$ = new BehaviorSubject<IMessage[]>([]);

  public message$: Observable<IMessage[]> = this.messageSubject$.asObservable();

  private addMessage(text: MessageText, type: MessageType) {
    const currentMessages = this.messageSubject$.value;

    const newMessage: IMessage = {
      id: Date.now(),
      type: type,
      textMessage: text
    }
    const updatedMessages = [...currentMessages, newMessage]

    this.messageSubject$.next(updatedMessages);

    setTimeout(() => {
      this.closeMessage(newMessage.id);
    }, 5000)
  }

  closeMessage(idMessage: number): void {
    const current = this.messageSubject$.value;
    const updated = current.filter(item => item.id !== idMessage);
    this.messageSubject$.next(updated);
  }

  showWarn() {
    this.addMessage(this._messageText.Warn, this._messageType.Warn);
  }

  showError() {
    this.addMessage(this._messageText.Error, this._messageType.Error);
  }

  showSuccess() {
    this.addMessage(this._messageText.Success, this._messageType.Success);
  }

  showInfo() {
    this.addMessage(this._messageText.Info, this._messageType.Info);
  }
}
import { Injectable } from '@angular/core';
import { MessageType } from './enums/MessageType';
import { IMessage } from './interfaces/IMessage';
import { MessageText } from './enums/MessageText';

@Injectable({
  providedIn: 'root',
})
export class MessageTextService {
  private _messageTextData: IMessage[] = [];

  readonly _messageType = MessageType;

  readonly _messageText = MessageText;

  public get messageTextData(): IMessage[] {
    return [...this._messageTextData];
  }

  private addMessage(text: MessageText, type: MessageType) {
    const newMessage: IMessage = {
      id: Date.now(),
      type: type,
      textMessage: text
    }
    this._messageTextData.unshift(newMessage);

    setTimeout(() => {
      this.closeMessage(newMessage.id);
    }, 5000)
  }

  closeMessage(idMessage: number): void {
    this._messageTextData = this._messageTextData.filter(item => item.id !== idMessage)
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

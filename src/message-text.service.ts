import { Injectable } from '@angular/core';
import { MessageType } from './enums/MessageType';
import { IMessage } from './interfaces/IMessage';
import { MessageText } from './enums/MessageText';

@Injectable({
  providedIn: 'root',
})
export class MessageTextService {
  private _messageTextData: IMessage[] = [
    // {
    //   id: 1,
    //   type: MessageType.Success,
    //   textMessage: 'Направления получены'
    // },
    // {
    //   id: 2,
    //   type: MessageType.Info,
    //   textMessage: 'Стоимость отправлена на почту'
    // },
    // {
    //   id: 3,
    //   type: MessageType.Warn,
    //   textMessage: 'Программа недоступна'
    // },
    // {
    //   id: 4,
    //   type: MessageType.Error,
    //   textMessage: 'Материалы недостпуны'
    // }
  ]

  readonly _messageType = MessageType;

  readonly _messageText = MessageText;

  public get messageTextData(): IMessage[] {
    return [...this._messageTextData];
  }

  addMessage(text: MessageText, type: MessageType) {
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
}

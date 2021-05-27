import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketService } from './socket.service';
import { IdService } from './uuid.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public loadPage: boolean;

  constructor(
    private _webSocketService: WebSocketService,
    private _cookieService: CookieService,
    private _IdService: IdService
  ) {
    this.loadPage = true;
  }

  joinListenChats(chats: any[], messages: any[]) {
    if (this.loadPage == true) {
      chats.forEach((chat) => {
        this._webSocketService.emit('leave', chat.codeChat);
        this._webSocketService.emit('join', chat.codeChat);
        console.log('Unido de salas');
        console.log(chat.codeChat);
        this._webSocketService.listen(chat.codeChat).subscribe((data) => {
          console.log(data);
          messages.push(data);
          this._cookieService.set('cookie-messages', JSON.stringify(messages));
        });
      });
      this.loadPage = false;
    }
  }

  listenChat(codeChat: any, messages: any[]) {
    this._webSocketService.listen(codeChat).subscribe((data) => {
      console.log(data);
      messages.push(data);
      this._cookieService.set('cookie-messages', JSON.stringify(messages));
    });
  }

  createChat(chats: any[], nameChat: any, messages: any[]) {
    if (chats.length < 5 && this._cookieService.get('cookie-name')) {
      let chat = {
        nameChat: nameChat,
        codeChat: this._IdService.generate(),
      };
      chats.push(chat);
      this._cookieService.set('cookie-chats', JSON.stringify(chats));
      this._webSocketService.emit('join', chat.codeChat);
      this.listenChat(chat.codeChat, messages);
      console.log('Unido sala');
      console.log(chat.codeChat);
    }
  }

  addChat(chats: any[], nameChat: any, codeChat: any, messages: any[]) {
    if (chats.length < 5 && this._cookieService.get('cookie-name')) {
      let chat = {
        nameChat: nameChat,
        codeChat: codeChat,
      };
      chats.push(chat);
      this._cookieService.set('cookie-chats', JSON.stringify(chats));
      this._webSocketService.emit('join', chat.codeChat);
      this.listenChat(chat.codeChat, messages);
      console.log('Unido sala');
      console.log(chat.codeChat);
    }
  }

  deleteChat(chats: any[], codeChat: any) {
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].codeChat === codeChat) {
        this._webSocketService.emit('leave', codeChat);
        chats.splice(i, 1);
        if (chats.length === 0) {
          this._cookieService.delete('cookie-chats');
          this._cookieService.delete('cookie-messages');
        } else {
          this._cookieService.set('cookie-chats', JSON.stringify(chats));
        }
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketService } from './socket.service';
import { IdService } from './uuid.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public loadPage: boolean;
  public messages: any[];

  constructor(
    private _webSocketService: WebSocketService,
    private _cookieService: CookieService,
    private _IdService: IdService
  ) {
    this.loadPage = true;
    this.messages = new Array();
  }

  listenChat(codeChat: any) {
    var messages = new Array();
    this._webSocketService.on(codeChat).subscribe((data) => {
      messages.push(data);
      this._cookieService.set(codeChat, JSON.stringify(messages));
    });
  }
  
  joinListenChats(chats: any[]) {
    if (this.loadPage == true) {
      chats.forEach((chat) => {
        this.loadPage = false;
        this._webSocketService.emit('leave', chat.codeChat);
        this._webSocketService.emit('join', chat.codeChat);
        this.listenChat(chat.codeChat);
      });
    }
  }
  
  createChat(chats: any[], nameChat: any) {
    if (chats.length < 5 && this._cookieService.get('cookie-name')) {
      let chat = {
        nameChat: nameChat,
        codeChat: this._IdService.generate(),
      };
      chats.push(chat);
      this._cookieService.set('cookie-chats', JSON.stringify(chats));
      this._cookieService.set(chat.codeChat, JSON.stringify(new Array()));
      this._webSocketService.emit('join', chat.codeChat);
      this.listenChat(chat.codeChat);
      console.log(chat.codeChat);
    }
  }

  addChat(chats: any[], nameChat: any, codeChat: any) {
    if (chats.length < 5 && this._cookieService.get('cookie-name')) {
      let chat = {
        nameChat: nameChat,
        codeChat: codeChat,
      };
      chats.push(chat);
      this._cookieService.set('cookie-chats', JSON.stringify(chats));
      this._cookieService.set(codeChat, JSON.stringify(new Array()));
      this._webSocketService.emit('join', chat.codeChat);
      this.listenChat(chat.codeChat);
      console.log(chat.codeChat);
    }
  }

  deleteChat(chats: any[], codeChat: any) {
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].codeChat === codeChat) {
        this._webSocketService.emit('leave', codeChat);
        chats.splice(i, 1);
      }
    }
    if (chats.length === 0) {
      this._cookieService.delete('cookie-chats');
      this._cookieService.delete(codeChat);
    } else {
      this._cookieService.delete(codeChat);
      this._cookieService.set('cookie-chats', JSON.stringify(chats));
    }
  }

}

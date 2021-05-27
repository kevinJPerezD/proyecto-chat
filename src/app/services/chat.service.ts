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

  joinListenChats(chats: any[]) {
    if (this.loadPage == true) {
      chats.forEach((chat) => {
        this._webSocketService.emit('leave', chat.codeChat);
        this._webSocketService.emit('join', chat.codeChat);
        console.log('Unido de salas');
        console.log(chat.codeChat);
        this._webSocketService.listen(chat.codeChat).subscribe((data) => {
          let messages = JSON.parse(this._cookieService.get(chat.codeChat));
          console.log('Messages en coookie');
          console.log(messages);          
          console.log('Messages en Data');          
          console.log(data);
          messages.push(data);
          console.log('push a mensajes');
          this._cookieService.set(chat.codeChat, JSON.stringify(messages));
          console.log("Set cookie");
        });
      });
      this.loadPage = false;
    }
  }

  listenChat(codeChat: any) {
    this._webSocketService.listen(codeChat).subscribe((data) => {
    //   var messages = JSON.parse(this._cookieService.get(codeChat));
    //   messages.push(data);
      this._cookieService.set(codeChat, JSON.stringify(data));
      console.log(data);
    });
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
      console.log('Unido sala');
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
      let messages = new Array();
      this._cookieService.set(codeChat, JSON.stringify(messages));
      this._webSocketService.emit('join', chat.codeChat);
      this.listenChat(chat.codeChat);
      console.log('Unido sala y messages');
      console.log(messages);
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
          this._cookieService.delete(codeChat);
        } else {
          this._cookieService.set(codeChat, JSON.stringify(chats));
        }
      }
    }
  }
}

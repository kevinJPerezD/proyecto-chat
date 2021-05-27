import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from 'src/app/services/chat.service';
import { WebSocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  // Mensajes para mostrar
  public messages: any[];
  // Para mandar
  public codeChat: any;
  public name: any;
  public message: any;
  // Chats
  public chats: any[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cookieService: CookieService,
    private _clipboardService: ClipboardService,
    private _webSocketService: WebSocketService,
    private _chatService: ChatService,
  ) {
    this._route.params.subscribe((params) => {
      this.codeChat = params.code;
    });
    // Obtener el nombre
    if(this._cookieService.get('cookie-name')){
      this.name = JSON.parse(this._cookieService.get('cookie-name'));
    }else{
      this._router.navigate(['']);
    }
    // El mensaje que envía (base)
    this.message = {
      code: this.codeChat,
      name: this.name,
      text: '',
    };
    // Para guardar mensajes
    this.messages = new Array();
    this.chats = new Array();
  }
  
  ngOnInit() {
    /* if (this._cookieService.get('cookie-chats')) {
      this.chats = JSON.parse(this._cookieService.get('cookie-chats'));
      this._chatService.joinListenChats(this.chats);
    } */
    // Para tomarlo
    if(this._cookieService.get(this.codeChat)){
      this.messages = JSON.parse(this._cookieService.get(this.codeChat));
      console.log("messages al cargar chat");
      console.log(this.messages);
      console.log("------------------------");
    }
  }

  onSumbit(form: any) {
    this._webSocketService.emit('add-message', this.message);
    form.reset();
  }

  redirectHome() {
    this._router.navigate(['']);
  }

  copyCode(codeChat: any) {
    this._clipboardService.copyFromContent(codeChat);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketService } from 'src/app/services/socket.service';

declare var $: any;
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
  public nameChat: any;
  public chats: any[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cookieService: CookieService,
    private _clipboardService: ClipboardService,
    private _webSocketService: WebSocketService
  ) {
    this._route.params.subscribe((params) => {
      this.codeChat = params.code;
      this.nameChat = params.name;
    });
    // Obtener el nombre
    if (
      this._cookieService.get('cookie-name') &&
      this._cookieService.get(this.codeChat)
    ) {
      this.name = JSON.parse(this._cookieService.get('cookie-name'));
    } else {
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
    // Tomar messages
    if (this._cookieService.get(this.codeChat)) {
      this.messages = JSON.parse(this._cookieService.get(this.codeChat));
    }
    // Escuchar
    this._webSocketService.on(this.codeChat).subscribe((data: any) => {
      console.log(data);
      this.messages.push(data);
      this.render(this.messages);
    });
  }

  render(data: any) {
    var html = data
      .map(function (message: any, index: any) {
        return `
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `;
      })
      .join(' ');

    var div_msg = $('messages');
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight;
  }

  sendMessage(form: any) {
    this._webSocketService.emit('message', this.message);
    form.reset();
  }

  copyCode(codeChat: any) {
    this._clipboardService.copyFromContent(codeChat);
  }
}

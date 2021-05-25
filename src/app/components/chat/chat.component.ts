import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  public code: any;
  public name: any;
  public message: any;
  // Cookie de mensajes
  public cookieMessageString: any;
  public cookieMessageArray: any;


  constructor(
    private _route: ActivatedRoute,
    private cookieService: CookieService,
    private webSocketService: WebSocketService
  ) {
    this._route.params.subscribe((params) => {
      this.code = params.code;
    });
    if(this.cookieService.get('cookie-name')){
      this.name = JSON.parse(this.cookieService.get('cookie-name'));
    }
    // Setear con la salas
    this.webSocketService.emit('join', this.code);
    // El mensaje que envía (base)
    this.message = {
      code: this.code,
      name: this.name,
      text: '',
    };
    // Para guardar mensajes
    this.messages = new Array();
  }

  ngOnInit() {
    // Para tomarlo
    if(this.cookieService.get('cookie-messages')){
      this.cookieMessageArray = JSON.parse(this.cookieService.get('cookie-messages'));
      this.messages = this.cookieMessageArray;
    }
    // Recibir mensajes
    this.webSocketService.listen('messages').subscribe((data) => {
      this.messages.push(data);
      // Para crear cookie de mensaje
      this.cookieService.set('cookie-messages', JSON.stringify(this.messages));
    });
  }

  onSumbit(form: any) {
    this.webSocketService.emit('add-message', this.message);
    form.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public message: any;

  constructor(
    private _route: ActivatedRoute,
    private webSocketService: WebSocketService
  ) {
    this._route.params.subscribe((params) => {
      this.code = params.code;
    });
    // Setear con la salas
    this.webSocketService.emit('join', this.code);
    // El mensaje que envía
    this.message = {
      code: this.code,
      name: 'kevin',
      text: '',
    };
    // Para guardar mensajes
    this.messages = new Array();
  }

  ngOnInit() {
    this.webSocketService.listen('messages').subscribe((data) => {
      console.log(data);
      this.messages.push(data);
      console.log(this.messages);
    });
  }

  onSumbit(form: any) {

    this.webSocketService.emit('add-message', this.message);

    form.reset();
  }
}

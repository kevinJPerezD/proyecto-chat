import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
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
    private _router: Router,
    private _cookieService: CookieService,
    private _clipboardService: ClipboardService,
    private _webSocketService: WebSocketService
  ) {
    this._route.params.subscribe((params) => {
      this.code = params.code;
    });
    if(this._cookieService.get('cookie-name')){
      this.name = JSON.parse(this._cookieService.get('cookie-name'));
    }
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
    if(this._cookieService.get('cookie-messages')){
      this.cookieMessageArray = JSON.parse(this._cookieService.get('cookie-messages'));
      this.messages = this.cookieMessageArray;
    }
    // Recibir mensajes
    /* this._webSocketService.listen(this.code).subscribe((data) => {
      console.log(data);
      
      this.messages.push(data);
      // Para crear cookie de mensaje
      this._cookieService.set('cookie-messages', JSON.stringify(this.messages));
    }); */
  }

  onSumbit(form: any) {
    this._webSocketService.emit('add-message', this.message);
    form.reset();
  }

  redirectHome() {
    return this._router.navigate(['']);
  }

  copyCode(codeChat: any) {
    this._clipboardService.copyFromContent(codeChat);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from 'src/app/services/chat.service';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Nombre
  public name: string;
  // Nuevo chat
  public chat: any;
  public chats: any[];
  // Mensajes
  public messages: any[];

  constructor(
    private _router: Router,
    private _chatService: ChatService,
    private _cookieService: CookieService,
    private _clipboardService: ClipboardService
  ) {
    this.name = 'Anonimo';
    this.chats = new Array();
    this.messages = new Array();
  }
  
  ngOnInit() {
    if (this._cookieService.get('cookie-chats')) {
      this.chats = JSON.parse(this._cookieService.get('cookie-chats'));
      this._chatService.joinListenChats(this.chats);
    }
    // Para nombre
    if (this._cookieService.get('cookie-name')) {
      this.name = JSON.parse(this._cookieService.get('cookie-name'));
    } else {
      $('#nameModal').modal('toggle');
    }
    // Links hover
    $('.links').mousemove(function () {
      $('.links').css('cursor', 'pointer');
    });
  }

  saveName(form: any) {
    this.name = form.value.name;
    this._cookieService.set('cookie-name', JSON.stringify(form.value.name));
  }

  createChat(form: any) {
    this._chatService.createChat(
      this.chats,
      form.value.nameChat
    );
    form.reset();
  }

  addChat(form: any) {
    this._chatService.addChat(
      this.chats,
      form.value.nameChat,
      form.value.codeChat
    );
    form.reset();
  }
  
  deleteChat(codeChat: any) {
    this._chatService.deleteChat(this.chats, codeChat);
  }

  copyCode(codeChat: any) {
    this._clipboardService.copyFromContent(codeChat);
  }

  // JQuery
  showModal(modal: string) {
    if (this.chats.length < 5) {
      if (this._cookieService.get('cookie-name')) {
        $('#' + modal).modal('toggle');
      } else {
        $('#nameModal').modal('toggle');
      }
    } else {
      $('#adviseModal').modal('toggle');
    }
  }
}

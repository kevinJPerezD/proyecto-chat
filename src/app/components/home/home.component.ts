import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { CookieService } from 'ngx-cookie-service';
import { IdService } from 'src/app/services/uuid.service';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public codeUser: any;
  public name: string;
  // Nuevo chat
  public chat: any;
  public chats: any[];

  constructor(
    private _router: Router,
    private _IdService: IdService,
    private _cookieService: CookieService,
    private _clipboardService: ClipboardService
  ) {
    this.name = 'Anonimo';
    this.chats = new Array();
  }

  ngOnInit() {
    // Para cargar chats de la cookie
    if (this._cookieService.get('cookie-chats')) {
      this.chats = JSON.parse(this._cookieService.get('cookie-chats'));
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
    this._cookieService.set('cookie-name', JSON.stringify(this.name));
  }

  createChat(form: any) {
    if (this.chats.length < 5 && this._cookieService.get('cookie-name')) {
      this.chat = {
        nameChat: form.value.nameChat,
        codeChat: this._IdService.generate(),
      };
      this.chats.push(this.chat);
      this._cookieService.set('cookie-chats', JSON.stringify(this.chats));
      form.reset();
    }
  }

  addChat(form: any) {
    if (this.chats.length < 5 && this._cookieService.get('cookie-name')) {
      this.chat = {
        nameChat: form.value.nameChat,
        codeChat: form.value.codeChat,
      };
      this.chats.push(this.chat);
      this._cookieService.set('cookie-chats', JSON.stringify(this.chats));
      form.reset();
    }
  }

  redirectChat(codeChat: any) {
    return this._router.navigate(['/chat/' + codeChat]);
  }

  copyCode(codeChat: any) {
    this._clipboardService.copyFromContent(codeChat);
    $('.toast').toast({ delay: 700, animation: false });
    $('#copiedCode').toast('show');
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

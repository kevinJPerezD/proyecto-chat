import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IdService } from 'src/app/services/uuid.service';

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public codeUser: any;
  public name: string;
  // Nuevo chat
  public chat: any;
  public chats: any[];
  public chatsMostrar: any[];
  
  constructor(
    private _router: Router,
    private _IdService: IdService,
    private _cookieService: CookieService
  ) { 
    this.name = 'Anonimo';
    this.chat = {
      nameChat: '',
      codeChat: ''
    }
    this.chats = new Array();
    this.chatsMostrar = new Array();
  }
  
  ngOnInit() {
    // Para chats
    if (this._cookieService.get('cookie-chats')) {
      this.chatsMostrar = JSON.parse(this._cookieService.get('cookie-chats'));
    }
    // Para nombre
    if (this._cookieService.get('cookie-name')) {
      this.name = JSON.parse(this._cookieService.get('cookie-name'));
    }else{
      $(document).ready(function(){
        $('#nameModal').modal('toggle');
      });
    }
    // Links hover
    $('.links').mousemove(function(){
      $('.links').css('cursor', 'pointer');
    });
  }
  
  saveName(form: any){
    this.name = form.value.name;
    this._cookieService.set('cookie-name', JSON.stringify(this.name));
  }
  
  createChat(form: any){
    this.chat.nameChat = form.value.nameChat;
    this.chat.codeChat = this._IdService.generate();
    console.log(this.chat);    
    this.chats.push(this.chat);
    console.log(this.chats);    
    this._cookieService.set('cookie-chats', JSON.stringify(this.chats));
    form.reset();
  }
  
  redirectChat(codeChat: any){
    return this._router.navigate(['/chat/' + codeChat]);
  }
  
  // Metodos JQuery
  showModal(modal: string){
    if (this._cookieService.get('cookie-name')) {
      $(document).ready(function(){
        $('#' + modal).modal('toggle');
      });
    }else{
      $(document).ready(function(){
        $('#nameModal').modal('toggle');
      });
    }
  }  

}

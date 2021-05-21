import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public messages: any;
  public email: any;
  
  constructor(
    private webSocketService: WebSocketService
  ){
  }
  
  ngOnInit(){
    this.webSocketService.emit('join', {email: 'user1@example.com'});
    
    this.webSocketService.listen('messages').subscribe((data) => {
      console.log(data);
      
      this.messages = data;
    })
    
  }

  message(){
    var message = {
      nickname: 'kevin',
      text: 'hola'
    };
    this.webSocketService.emit('add-message', message);
  }
}

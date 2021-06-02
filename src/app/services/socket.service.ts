import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io }  from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public socket: any;
  public url: string = "ws://chat-kevin.herokuapp.com/";

  constructor() {
    this.socket = io(this.url);
   }

  on(eventName: string){
    return new Observable((suscriber) => {
      this.socket.on(eventName, (data: any) => {
        suscriber.next(data);
      })
    });
  }

  emit(eventName: string, data: any){
    this.socket.emit(eventName, data);
  }

  
}

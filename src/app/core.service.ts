import { Injectable } from '@angular/core';

import { WebSocketSubject } from "rxjs/webSocket";
import { webSocket } from "rxjs/webSocket";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Core } from './core'; 

@Injectable()
export class CoreService {
  private wsSubject : WebSocketSubject<any>;

  constructor() { 
    this.wsSubject = webSocket('ws://localhost:6123');
    //subscribe for global ws stream error handling
    //this.wsSubject.subscribe(
    //  msg => console.log(JSON.stringify(msg)), //debug log of all msgs?
    //  err => console.error('an WS error occured:',err)
    //);
  }

  //returns an emulated websocket connection for a component
  public registerComponent(compId:string):Observable<any>{
    return this.wsSubject.multiplex(
      () => ({regComp: compId}),
      () => ({unRegComp: compId}),
      message => message.comp === compId
    );
  }

  //Sends msg object to WebSocket Server
  public sendWs(msg){
    this.wsSubject.next(msg);
  }
}
import { Injectable } from '@angular/core';
import { Calculation} from './calculation';

import { WebSocketSubject } from "rxjs/webSocket";
import { webSocket } from "rxjs/webSocket";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ComputationService {
  private subject: WebSocketSubject<any>;
  public wsConnected : boolean = false;
  private obs:Observable<Calculation>;
  public result: string;

  constructor() { 
  }



  connectWs(){
   console.log('Connect called');

   this.subject = webSocket<any>({
    url: 'ws://localhost:6123',
    //deserializer: msg => msg,  //Enable this to disable JSON parsing
    openObserver: {
        next: (e) => this.openWs(e)
    },
    closeObserver: {
      next: (ce) => this.closedWs(ce)
    }
    });

    this.subscribeWs();
 }
 public subscribeWs(){
       this.subject.subscribe(
      msg => this.result=msg.num1+'' , // Called whenever there is a message from the server.
      err => {// Called if at any point WebSocket API signals some kind of error.
        console.log('WebSocketErr: '+ err.code );
        }, 
      () => console.log('really closed') // Called when connection is closed (for whatever reason).
    );
 }

 openWs(event: Event){
  // console.log('connetion ok');
   this.wsConnected= true;
 }

 closedWs(closeEvent: CloseEvent){
   ////console.log('connection close: ' + closeEvent.code);
   this.wsConnected=false;
    //This makes it so the connection is re-opened when it closes... :)
   this.subscribeWs(); 
   
 }
}
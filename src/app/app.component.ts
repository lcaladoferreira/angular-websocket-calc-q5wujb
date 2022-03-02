import { Component } from '@angular/core';
import { CoreService } from './core.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  curVal = '0';  
  //This variable holds the state of starting a new number
  newNumber:boolean = true;
  bsNum:boolean = false;
  storedNum = '0';
  lastOp;

  constructor(private coreService:CoreService ){
    coreService.registerComponent('calc').subscribe(
      msg => this.curVal = msg.data,
      err => this.curVal = 'Socket Error'
    );
  }

  numPressed(num){
    if(this.newNumber)
      this.curVal = '' + num;
    else
      this.curVal = this.curVal + '' + num;
    this.newNumber = false;
  }
  clear(){
    this.curVal = "0";
    this.newNumber = true;
    this.storedNum = '0';
    this.bsNum = false;
  }
  neg(){
    this.curVal = (Number(this.curVal) *-1) +'';
  }

  add(){
    this.prepOp();
    this.lastOp = 'add';
  }
  sub(){
    this.prepOp();
    this.lastOp = 'sub';
  }

  div(){
    this.prepOp();
    this.lastOp = 'div';
  }
  mult(){
    this.prepOp();
    this.lastOp = 'mult';
  }

  evaluate(){
    this.curVal = this.internalEvaluate();
    this.newNumber = true;
    this.bsNum = false;
  }

  prepOp(){
    if(this.bsNum){
      this.storedNum = this.internalEvaluate();
      this.curVal = this.storedNum;
    }
    else{
      this.storedNum = this.curVal;
      this.bsNum = true;
    }
    this.newNumber = true;
  }

  internalEvaluate(){
    var tempNum;

    switch(this.lastOp){
      case 'add':
        tempNum = Number(this.storedNum) + Number(this.curVal);
        break;
      case 'sub':
        tempNum = Number(this.storedNum) - Number(this.curVal);
        break;
      case 'div':
        tempNum = Number(this.storedNum) / Number(this.curVal);
        break;
      case 'mult':
        tempNum = Number(this.storedNum) * Number(this.curVal);
        break;
      default:
    }

    return tempNum + '';
  }

}

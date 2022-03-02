export class Calculation {
  num1: number;
  num2: number;
  opCode: string;

  constructor(number1:number, number2:number, op:string){
    this.num1 = number1;
    this.num2 = number2;
    this.opCode = op;
  }
}
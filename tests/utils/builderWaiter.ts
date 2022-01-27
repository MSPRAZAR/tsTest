import { Waiter } from "../../types/mainTypes";

export class WaiterBuilder {
    private readonly _waiter: Waiter;
  
    constructor() {
      this._waiter = {
        name: "",
        turnover: 0,
        orders: [],
      };
    }
  
    name(name: string): WaiterBuilder {
      this._waiter.name = name;
      return this;
    }
    
    withTotalTurnover(turnover: number): WaiterBuilder {
      this._waiter.turnover = turnover;
      return this;
    }
  
    build(): Waiter {
      return this._waiter;
    }
  }
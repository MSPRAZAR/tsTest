import { Order } from "../../types/mainTypes";

export class OrderBuilder {
    private readonly _order: Order;
  
    constructor() {
      this._order = { amount: 0 };
    }
  
    withAmount(amount: number): OrderBuilder {
      this._order.amount = amount;
      return this;
    }
  
    build(): Order {
      return this._order;
    }
  }
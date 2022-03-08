import { Order, orderStatus, orderType } from "../../types/mainTypes";

export class OrderBuilder {
    private readonly _order: Order;
  
    constructor() {
      this._order = { amount: 0, status: orderStatus.ongoing };
    }
  
    withAmount(amount: number): OrderBuilder {
      this._order.amount = amount;
      return this;
    }
    withType(type: orderType): OrderBuilder {
      this._order.type = type;
      return this;
    }
    withStatus(status: orderStatus): OrderBuilder{
      this._order.status = status;
      return this;
    }
  
    build(): Order {
      return this._order;
    }
  }
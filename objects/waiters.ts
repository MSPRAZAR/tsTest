// import { Waiter } from "../types/mainTypes";

// import { Order } from ".";

class Waiter {
  constructor(public name: string, public turnover: number) {}

  public affectOrder(orders: Order[]) {
    for (let order of orders) {
      this.turnover += order.amount;
    }
    return this;
  }
}

import { Order, Waiter, Restaurant } from "../types/mainTypes";

export function affectOrder(orders: Order[], waiter: Waiter) {
  for (let order of orders) {
    waiter.turnover += order.amount;
  }
  return waiter.turnover;
}

export function assignNumberOfOrderWithFixPrice(count: number, price: number, waiters: Waiter[] ) :number{
  const totalPerWaiter = (count * price);
  if(waiters) {
    for (let waiter of waiters) {
       waiter.turnover = totalPerWaiter;
       
    }
  } 
  return totalPerWaiter;

}

export function addToTotalTurnover(restaurant: Restaurant) {
  const { waiters } = restaurant;
  if (waiters) {
    let total: number = restaurant.totalTurnover;
    for (let waiter of waiters) {
      total += waiter.turnover;
    }
    restaurant.totalTurnover += total;
  }
}

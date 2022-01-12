import { Restaurant, Waiter } from "../types/mainTypes";
import { assignNumberOfOrderWithFixPrice } from "./waiters";

export function totalTurnover(restaurant: Restaurant): number {
    const { waiters} = restaurant;
    let total: number = 0;
    for (let waiter of waiters) {
        total += waiter.turnover;
    }
    return total;
}

export function assignOrdersToEveryWaiterInRestaurant(count: number, price: number, restaurant: Restaurant ) {
    const { waiters} = restaurant;
    let total: number = 0;
    let fullTotal: number = 0;
    if(waiters){
        total = assignNumberOfOrderWithFixPrice(count, price, waiters)
        restaurant.totalTurnover = total;
        fullTotal += total;
    }
      return fullTotal;
    }
  
  


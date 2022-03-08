import {
  Cops,
  Menu,
  orderStatus,
  PinnedOrder,
  Restaurant,
  serviceStatus,
  Waiter,
} from "../../types/mainTypes";
import { assignNumberOfOrderWithFixPrice } from "./waiters";

export function totalTurnover(restaurant: Restaurant): number {
  const { waiters } = restaurant;
  let total: number = 0;
  for (let waiter of waiters) {
    total += waiter.turnover;
  }
  return total;
}

export function assignOrdersToEveryWaiterInRestaurant(
  count: number,
  price: number,
  restaurant: Restaurant
) {
  const { waiters } = restaurant;
  let total: number = 0;
  let fullTotal: number = 0;
  if (waiters) {
    total = assignNumberOfOrderWithFixPrice(count, price, waiters);
    restaurant.totalTurnover = total;
    fullTotal += total;
  }
  return fullTotal;
}

export function addDishesToRestaurant(
  dishes: Menu,
  restaurant: Restaurant
): Restaurant {
  restaurant.menu?.push(dishes);
  return restaurant;
}

export function sendOrderToCops(restaurant: Restaurant): Restaurant {
  const { pinnedOrder } = restaurant;
  const days = 15;
  let date = new Date();
  var result = date.setDate(date.getDate() - days);
  if (pinnedOrder) {
    for (let i = 0; i < pinnedOrder.length; i++) {
      if (new Date(result) > new Date(pinnedOrder[0].date)) {
        pinnedOrder[i].order.status = orderStatus.sendToCops;
      }
    }
  }

  return restaurant;
}

export function checkForOrderSendToTheCops(
  restaurant: Restaurant
): PinnedOrder[] {
  const { pinnedOrder } = restaurant;
  let temporaryArray = [];
  if (pinnedOrder) {
    for (const order of pinnedOrder) {
      if (order.order.status === orderStatus.sendToCops) {
        temporaryArray.push(order);
      }
    }
  }
  return temporaryArray;
}

export function orderSendToTheCops(
  orders: PinnedOrder[],
  cops: Cops
): PinnedOrder[] {
  let temporaryArray: PinnedOrder[] = [];
  for (const order of orders) {
    temporaryArray.push(order);
  }
  cops.orders.concat(temporaryArray);
  return temporaryArray;
}

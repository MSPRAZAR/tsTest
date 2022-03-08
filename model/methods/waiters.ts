import {
  Order,
  Waiter,
  Restaurant,
  Kitchen,
  orderType,
  PinnedOrder,
} from "../../types/mainTypes";

export function affectOrder(orders: Order[], waiter: Waiter) {
  for (let order of orders) {
    waiter.turnover += order.amount;
    waiter.orders?.push(order);
  }
  return waiter.turnover;
}

export function sendOrderToKitchen(waiter: Waiter, kitchen: Kitchen) {
  let foodOrder = [];
  const { orders } = waiter;
  if (orders) {
    for (let order of orders) {
      if (order.type === orderType.food) {
        foodOrder.push(order);
      }
    }
  }
  kitchen.taskList = foodOrder;
  return kitchen;
}

export function assignNumberOfOrderWithFixPrice(
  count: number,
  price: number,
  waiters: Waiter[]
): number {
  const totalPerWaiter = count * price;
  if (waiters) {
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

export function orderIsUnpayed(
  waiter: Waiter,
  restaurant: Restaurant,
  date?: Date

): Restaurant {
  const { orders } = waiter;
  let now = new Date();
  let temporaryArray: PinnedOrder[] = [];
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].status === "unpayed") {
      temporaryArray.push({ order: orders[i], date: date ? date : now });
      orders.splice(i, 1);
    }
  }
  if (restaurant.pinnedOrder) {
    restaurant.pinnedOrder?.concat(temporaryArray);
  } else {
    restaurant.pinnedOrder = temporaryArray;
  }
  return restaurant;
}

// SCOPE Epinglage

import {
  checkForOrderSendToTheCops,
  orderSendToTheCops,
  sendOrderToCops,
} from "../model/methods/restaurants";
import { affectOrder, orderIsUnpayed } from "../model/methods/waiters";
import {
  Cops,
  Order,
  orderStatus,
  orderType,
  Restaurant,
  Waiter,
} from "../types/mainTypes";
import { CopsBuilder } from "./utils/builderCops";
import { OrderBuilder } from "./utils/builderOder";
import { RestaurantBuilder } from "./utils/builderRestaurant";
import { WaiterGenerator } from "./utils/generatorWaiter";

describe("SCOPE PINNING", () => {
  it(
    "GIVEN a waiter who has taken an order" +
      "WHEN he reports it unpaid" +
      "THEN the order is marked as pinned",
    () => {
      // 	ÉTANT DONNE un serveur ayant pris une commande
      const nbWaiter = 1;
      const restaurant: Restaurant = new RestaurantBuilder()
        .numberOfWaiter(nbWaiter)
        .build();
      const waiterGenerator: Iterable<Waiter> = new WaiterGenerator().generate(
        nbWaiter
      );
      for (let waiter of waiterGenerator) {
        restaurant.waiters.push(waiter);
      }
      const foodOrder: Order = new OrderBuilder()
        .withType(orderType.food)
        .withAmount(5)
        .withStatus(orderStatus.unpayed)
        .build();
      let date = new Date();

      affectOrder([foodOrder], restaurant.waiters[0]);
      orderIsUnpayed(restaurant.waiters[0], restaurant);

      // 	QUAND il la déclare comme non-payée
      // 	ALORS cette commande est marquée comme épinglée
      expect(restaurant.pinnedOrder).toEqual([
        { date: date, order: foodOrder },
      ]);
    }
  );
  it(
    "GIVEN a waiter who has pinned an order" +
      "WHEN the order is less than 15 days old" +
      " THEN the order is marked as to send to the police",
    () => {
      // 	ÉTANT DONNE un serveur ayant épinglé une commande
      // 	QUAND elle date d'il y a au moins 15 jours
      const nbWaiter = 1;
      const restaurant: Restaurant = new RestaurantBuilder()
        .numberOfWaiter(nbWaiter)
        .build();
      const waiterGenerator: Iterable<Waiter> = new WaiterGenerator().generate(
        nbWaiter
      );
      for (let waiter of waiterGenerator) {
        restaurant.waiters.push(waiter);
      }
      const foodOrder: Order = new OrderBuilder()
        .withType(orderType.food)
        .withAmount(5)
        .withStatus(orderStatus.unpayed)
        .build();
      let date = new Date();
      date.setDate(date.getDate() - 20);
      affectOrder([foodOrder], restaurant.waiters[0]);
      orderIsUnpayed(restaurant.waiters[0], restaurant, date);
      sendOrderToCops(restaurant);
      if (restaurant.pinnedOrder) {
        expect(restaurant.pinnedOrder[0].order.status).toContain(
          orderStatus.sendToCops
        );
      }
      // 	ALORS cette commande est marquée comme à transmettre gendarmerie
    }
  );
  it(
    "GIVEN an order to send to the police" +
      "WHEN we take a look on the list of orders to send to the police" +
      "THEN it is on the list",
    () => {
      // 	ÉTANT DONNE une commande à transmettre gendarmerie
      // 	QUAND on consulte la liste des commandes à transmettre du restaurant
      // 	ALORS elle y figure
      const nbWaiter = 1;
      const restaurant: Restaurant = new RestaurantBuilder()
        .numberOfWaiter(nbWaiter)
        .build();
      const waiterGenerator: Iterable<Waiter> = new WaiterGenerator().generate(
        nbWaiter
      );
      for (let waiter of waiterGenerator) {
        restaurant.waiters.push(waiter);
      }
      const foodOrder: Order = new OrderBuilder()
        .withType(orderType.food)
        .withAmount(5)
        .withStatus(orderStatus.unpayed)
        .build();
      let date = new Date();
      date.setDate(date.getDate() - 20);
      affectOrder([foodOrder], restaurant.waiters[0]);
      orderIsUnpayed(restaurant.waiters[0], restaurant, date);
      sendOrderToCops(restaurant);
      checkForOrderSendToTheCops(restaurant);

      if (restaurant.pinnedOrder) {
        expect(checkForOrderSendToTheCops(restaurant)).toEqual([
          { date: date, order: foodOrder },
        ]);
      }
    }
  );
  it(
    "GIVEN an order to send to the police" +
      "WHEN it is marked as send to the police" +
      "THEN it is not on the list of order to be send to the police",
    () => {
      // 	ÉTANT DONNE une commande à transmettre gendarmerie
      // 	QUAND elle est marquée comme transmise à la gendarmerie
      // 	ALORS elle ne figure plus dans la liste des commandes à transmettre du restaurant
      const cops: Cops = new CopsBuilder().build();
      const nbWaiter = 1;
      const restaurant: Restaurant = new RestaurantBuilder()
        .numberOfWaiter(nbWaiter)
        .build();
      const waiterGenerator: Iterable<Waiter> = new WaiterGenerator().generate(
        nbWaiter
      );
      for (let waiter of waiterGenerator) {
        restaurant.waiters.push(waiter);
      }
      const foodOrder: Order = new OrderBuilder()
        .withType(orderType.food)
        .withAmount(5)
        .withStatus(orderStatus.unpayed)
        .build();
      let date = new Date();
      date.setDate(date.getDate() - 20);
      affectOrder([foodOrder], restaurant.waiters[0]);
      orderIsUnpayed(restaurant.waiters[0], restaurant, date);
      sendOrderToCops(restaurant);
      orderSendToTheCops(checkForOrderSendToTheCops(restaurant), cops);

      expect(
        orderSendToTheCops(checkForOrderSendToTheCops(restaurant), cops)
      ).toEqual(cops.orders);
    }
  );
});

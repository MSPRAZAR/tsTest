import { affectOrder, sendOrderToKitchen } from "../model/methods/waiters";
import { Order, orderType, Restaurant, Waiter } from "../types/mainTypes";
import { OrderBuilder } from "./utils/builderOder";
import { RestaurantBuilder } from "./utils/builderRestaurant";
import { WaiterGenerator } from "./utils/generatorWaiter";

// SCOPE Commande

describe("SCOPE ORDERS", () => {
  it(
    "GIVEN a waiter in a restaurant" +
      "WHEN he takes an order for food" +
      "THEN this order appears on the task list of the kitchen in that restaurant",
    () => {
      // 	ÉTANT DONNE un serveur dans un restaurant
      const nbWaiter = 1;
      const restaurant: Restaurant = new RestaurantBuilder()
        .isOpen(true)
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
        .build();
      // 	QUAND il prend une commande de nourriture
      affectOrder([foodOrder], restaurant.waiters[0]);
      sendOrderToKitchen(restaurant.waiters[0], restaurant.kitchen);
      expect(restaurant.kitchen.taskList).toContain(foodOrder);
    }
  );
  it(
    "GIVEN a waiter in a restaurant" +
      " WHEN he takes an order for drinks" +
      " THEN this order does not appears on the task list of the kitchen in that restaurant",
    () => {
      // 	ÉTANT DONNE un serveur dans un restaurant
      // 	ALORS cette commande n'apparaît pas dans la liste de tâches de la cuisine de ce restaurant
      const nbWaiter = 1;
      const restaurant: Restaurant = new RestaurantBuilder()
        .isOpen(true)
        .numberOfWaiter(nbWaiter)
        .build();
      const waiterGenerator: Iterable<Waiter> = new WaiterGenerator().generate(
        nbWaiter
      );
      for (let waiter of waiterGenerator) {
        restaurant.waiters.push(waiter);
      }
      const drinkOrder: Order = new OrderBuilder()
        .withType(orderType.drink)
        .withAmount(5)
        .build();
      // 	QUAND il prend une commande de boissons
      affectOrder([drinkOrder], restaurant.waiters[0]);
      sendOrderToKitchen(restaurant.waiters[0], restaurant.kitchen);
      // 	ALORS cette commande apparaît dans la liste de tâches de la cuisine de ce restaurant
      expect(restaurant.kitchen.taskList).not.toContain(drinkOrder);
    }
  );
});

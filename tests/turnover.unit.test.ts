import { Franchise, Order, Restaurant, Waiter } from "../types/mainTypes";
import { affectOrder, addToTotalTurnover } from "../model/methods/waiters";
import { totalTurnoverFranchise } from "../model/methods/franchise";
import { RestaurantBuilder } from "./utils/builderRestaurant";
import { WaiterBuilder } from "./utils/builderWaiter";
import { OrderBuilder } from "./utils/builderOder";
import { FranchiseBuilder } from "./utils/builderFranchise";
import { WaiterGenerator } from "./utils/generatorWaiter";
import { RestaurantGenerator } from "./utils/generatorRestaurant";

const each = require("jest-each").default;

describe("TEST METHODS USED FOR SCOPE Chiffre d'Affaires", () => {


  it("Method affectOrder() should return correct turnover",
    () => {
      // Arrange
      const orderAmount = 36;
      const waiter: Waiter = new WaiterBuilder().build();
      const order1: Order = new OrderBuilder().withAmount(orderAmount).build();
      const order2: Order = new OrderBuilder().withAmount(orderAmount).build();
      const orders : Order[] = [order1, order2];

      // Act
      affectOrder(orders, waiter);

      // Assert
      const turnoverWaiter = waiter.turnover;
      expect(turnoverWaiter).toEqual(orderAmount * 2);
    });


    it("Method addToTotalTurnover() should add the turnover "
        + "of each waiter to the restaurant turnover",
    () => {
      // Arrange
      const nbWaiters = 3;
      const averageTurnoverByWaiter = 15;
      
      const restaurant: Restaurant = new RestaurantBuilder()
                                      .isOpen(true)
                                      .numberOfWaiter(nbWaiters)
                                      .build();
      const waiterGenerator : Iterable<Waiter> = new WaiterGenerator()
                                                  .generate(nbWaiters);
      
      // affecter le turnover aux serveurs et les serveur au restaurant
      for (let waiter of waiterGenerator) {
        waiter.turnover = averageTurnoverByWaiter
        restaurant.waiters.push(waiter);
      }

      // Act
      addToTotalTurnover(restaurant);

      // Assert
      const turnoverWaiterExpected = nbWaiters * averageTurnoverByWaiter;
      const turnoverRestaurant = restaurant.totalTurnover;
      expect(turnoverRestaurant).toEqual(turnoverWaiterExpected);
    });


    each([
      [0, 0, 0],
      [360, 0, 20],
      [23, 3, 0],
      [0, 3, 2],
      [2, 2, 20],
      [180, 150, 654],
    ])
    .it("totalTurnoverFranchise() should return the correct turnover of the franchise", 
    (x: number, y: number, z: number) => {
      
      // Arrange 

      const nbRestaurant = x;  
      const nbWaitersByRestaurant = y;
      const averageTurnoverByWaiter = z;

      const franchise : Franchise = new FranchiseBuilder()
                                    .numberOfRestaurants(nbRestaurant)
                                    .build();
      const restaurantGenerator: Iterable<Restaurant> = new RestaurantGenerator()
                                                .generate(nbRestaurant);
                        
      // affecter les serveurs (avec turnover) à chaque restaurant créé
      var restaurantCounter = 0;
      for(let restaurant of restaurantGenerator){
        const restaurantNum : string = "restaurant"+restaurantCounter;
        // Créer les serveurs à affecter à chaque resto
        const waiterGenerator : Iterable<Waiter> = new WaiterGenerator()
                                              .generate(
                                                nbWaitersByRestaurant, 
                                                restaurantNum
                                              );
        
        for (let waiter of waiterGenerator) {
          waiter.turnover = averageTurnoverByWaiter;
          restaurant.waiters.push(waiter);
        }

        franchise.restaurants.push(restaurant);
        restaurantCounter ++;
      }
      
      
      // Act

      const totalTurnover: number = totalTurnoverFranchise(franchise);

      // Assert

      expect(totalTurnover).toEqual(
        nbRestaurant*nbWaitersByRestaurant*averageTurnoverByWaiter
      );

    });
});

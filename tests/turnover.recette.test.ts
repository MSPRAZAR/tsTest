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

/*******    SCOPE Serveur     *******/

describe("SIMULATION", () => {

  it("Simulation de l'activité des restaurants d'une franchise pendant une soirée",
    () => {
   
    const nbRestaurant = 2;  
    const nbWaiters = 3;
    const averageOrderAmount = 85;
    const averageNbOrderByWaiterRestaurant1 = 25;
    const averageNbOrderByWaiterRestaurant2 = 36;
    
    /*
    * Generate the franchise with the Restaurants, its Waiters and the average Order
    */

    const franchise : Franchise = new FranchiseBuilder()
                                  .numberOfRestaurants(nbRestaurant)
                                  .build();

    const restaurants: Iterable<Restaurant> = new RestaurantGenerator()
                                              .generate(nbRestaurant);
    
    const orderTakenByEachWaiter: Order = new OrderBuilder()
                                              .withAmount(averageOrderAmount)
                                              .build();
                      
    
    // affecter les serveurs à chaque restaurant créé

    var restaurantCounter = 0;
    for(let restaurant of restaurants){
      const restaurantNum : string = "restaurant"+restaurantCounter;
      // Créer les serveurs à affecter à chaque resto
      const waiterGenerator : Iterable<Waiter> = new WaiterGenerator()
                                            .generate(
                                              nbWaiters, 
                                              restaurantNum
                                            );
      
      for (let waiter of waiterGenerator) {
        restaurant.waiters.push(waiter);
      }

      franchise.restaurants.push(restaurant);
      restaurantCounter ++;
    }
    
    /*
    * Le 1er restaurant : 
    *  - chaque serveur prend en moyenne 25 commandes sur la soirée
    */

    for (let waiter of franchise.restaurants[0].waiters) {
      for(var i=0; i<averageNbOrderByWaiterRestaurant1; i++){
        affectOrder([orderTakenByEachWaiter], waiter);
      }
    }

    /*
    * Le 2ème restaurant : 
    *  - chaque serveur prend en moyenne 36 commandes sur la soirée
    */

    for (let waiter of franchise.restaurants[1].waiters) {
      for(var i=0; i<averageNbOrderByWaiterRestaurant2; i++){
        affectOrder([orderTakenByEachWaiter], waiter);
      }
    }
    
    /*
    * A la fin de la soirée on fait les comptes
    */
    addToTotalTurnover(franchise.restaurants[0]);
    addToTotalTurnover(franchise.restaurants[1]);

    const expectedTurnoverRestaurant1 = nbWaiters * averageNbOrderByWaiterRestaurant1 *  averageOrderAmount;
    const realTurnoverRestaurant1 = franchise.restaurants[0].totalTurnover;

    const expectedTurnoverRestaurant2 = nbWaiters * averageNbOrderByWaiterRestaurant2 *  averageOrderAmount;
    const realTurnoverRestaurant2 = franchise.restaurants[1].totalTurnover;
    
    const expectedTurnoverFranchise = expectedTurnoverRestaurant1 + expectedTurnoverRestaurant2;
    franchise.totalTurnover = totalTurnoverFranchise(franchise);

    /*
    * Et le comptable s'attendà ce que les comptes correspondent au total consommé
    */
    expect(realTurnoverRestaurant1).toEqual(expectedTurnoverRestaurant1);
    expect(realTurnoverRestaurant2).toEqual(expectedTurnoverRestaurant2);
    expect(franchise.totalTurnover).toEqual(expectedTurnoverFranchise);
  });
});

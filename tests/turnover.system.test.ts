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

describe("WAITER SCOPE", () => {

  it("GIVEN new waiter " +
    "WHEN created " +
    "THEN has 0 turnover",
    () => {
      // ÉTANT DONNÉ un nouveau serveur
      const waiter: Waiter = new WaiterBuilder().build();

      // QUAND on récupére son chiffre d'affaires
      const turnoverWaiter = waiter.turnover;

      // ALORS celui-ci est à 0
      expect(turnoverWaiter).toEqual(0);
    });


  it("GIVEN new server " +
    "\nWHEN takes an order " +
    "\nTHEN his turnover equal to order amount", 
  () => {
    // ÉTANT DONNÉ un nouveau serveur
    const waiter: Waiter = new WaiterBuilder()
                                .name("Henry")
                                .build();

    // QUAND il prend une commande
    const firstOrder: Order = new OrderBuilder()
                                  .withAmount(12)
                                  .build();
    affectOrder([firstOrder], waiter);

    // ALORS son chiffre d'affaires est le montant de celle-ci
    expect(waiter.turnover).toEqual(12);
  });


  it("GIVEN a waiter with already an order "+
    "\nWHEN he takes a new order "+
    "\nTHEN his turnover is the sum of the 2 orders", 
    () => {
      // ÉTANT DONNÉ un serveur ayant déjà pris une commande
      const amountFirstOrder = 12;
      const amountSecondOrder = 10;
      const firstOrder: Order = new OrderBuilder()
                                  .withAmount(amountFirstOrder)
                                  .build();
      const waiter: Waiter = new WaiterBuilder()
                                .name("Henry")
                                .withTotalTurnover(firstOrder.amount)
                                .build();

      // QUAND il prend une nouvelle commande
      const secondOrder: Order = new OrderBuilder()
                                    .withAmount(amountSecondOrder)
                                    .build();
      affectOrder([secondOrder], waiter);

      // ALORS son chiffre d'affaires est la somme des deux commandes
      expect(waiter.turnover).toEqual(22);
  });

});




/*******    SCOPE Restaurant     *******/


describe("RESTAURANT SCOPE", () => {
  each([
    [0, 15],
    [1, 15],
    [2, 15],
    [100, 15]
  ])
  .it("GIVEN a restaurant with X='%s' waiters "+
    "\nWHEN all waiters take an order take an order with amount Y='%s' "+
    "\nTHEN restaurant turnover is X * Y", 
  (x: number, y: number) => {
    // 	ÉTANT DONNÉ un restaurant ayant X serveurs
    const nbWaiters = x;
    const orderAmount = y;
    
    const restaurant: Restaurant = new RestaurantBuilder()
                                    .numberOfWaiter(nbWaiters)
                                    .build();
    const waiterGenerator : Iterable<Waiter> = new WaiterGenerator()
                                                .generate(nbWaiters);
    
    // affecter les serveurs générés au restaurant créé
    for (let waiter of waiterGenerator) {
      restaurant.waiters.push(waiter);
    } 
    
    // 	QUAND tous les serveurs prennent une commande d'un montant Y
    const { waiters } = restaurant;
    const orderTakenByAllWaiters: Order = new OrderBuilder()
                                  .withAmount(orderAmount)
                                  .build();
    

    if (waiters.length > 0) {
      restaurant.waiters.forEach(waiter => {
        affectOrder([orderTakenByAllWaiters], waiter); 
      })
    }

    // 	ALORS le chiffre d'affaires de la franchise est X * Y
    // 	CAS(X = 0; X = 1; X = 2; X = 100)
    // 	CAS(Y = 1.0)
    addToTotalTurnover(restaurant);
    expect(restaurant.totalTurnover).toEqual(x * y);
  });

});


/*******    SCOPE Franchise     *******/

describe("FRANCHISE SCOPE", () => {

  each([
    [0, 0, 85],
    [0, 1, 85],
    [1, 1, 15],
    [1, 2, 15],
    [2, 2, 15],
  ])
  .it("GIVEN a franchise with X=%s restaurants with Y=%s waiters each one "+
    "\nWHEN every waiters takes an order of amount Z=%s " +
    "\nTHEN franchise's turnover should be X*Y*Z", 
    (x: number, y: number, z: number) => {

      // ÉTANT DONNÉ une franchise ayant X restaurants de Y serveurs chacuns
      const nbRestaurant = x;  
      const nbWaiters = y;
      const orderAmount = z;

      const franchise : Franchise = new FranchiseBuilder()
                                    .numberOfRestaurants(nbRestaurant)
                                    .build();
      const restaurantGenerator: Iterable<Restaurant> = new RestaurantGenerator()
                                                .generate(nbRestaurant);
                        
      // affecter les serveurs à chaque restaurant créé
      var restaurantCounter = 0;
      for(let restaurant of restaurantGenerator){
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
      
      // QUAND tous les serveurs prennent une commande d'un montant Z
      // CAS(X = 0; X = 1; X = 2; X = 1000)
      // CAS(Y = 0; Y = 1; Y = 2; Y = 1000)
      // CAS(Z = 1.0)
      for(let restaurant of franchise.restaurants){
        // Créer les serveurs à affecter à chaque resto
        const orderTakenByEachWaiter: Order = new OrderBuilder()
                                  .withAmount(orderAmount)
                                  .build();
        for (let waiter of restaurant.waiters) {
          affectOrder([orderTakenByEachWaiter], waiter);
        }
      }
      
      // ALORS le chiffre d'affaires de la franchise est X * Y * Z
      franchise.totalTurnover = totalTurnoverFranchise(franchise);
      expect(franchise.totalTurnover).toEqual(x*y*z);
    });
});

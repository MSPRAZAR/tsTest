import { Franchise, Order, Restaurant, Waiter } from "../types/mainTypes";
import { affectOrder, addToTotalTurnover } from "../model/methods/waiters";
import { totalTurnoverFranchise } from "../model/methods/franchise";
import { RestaurantBuilder } from "./utils/builderRestaurant";
import { WaiterBuilder } from "./utils/builderWaiter";
import { OrderBuilder } from "./utils/builderOder";
import { FranchiseBuilder } from "./utils/builderFranchise";
import { WaiterGenerator } from "../tests/utils/generatorWaiter";
import { RestaurantGenerator } from "./utils/generatorRestaurant";



/*******    SCOPE Serveur     *******/

describe("WAITER SCOPE", () => {

  it("GIVEN new waiter " +
    " WHEN created " +
    "THEN has 0 turnover",
    () => {
      // ÉTANT DONNÉ un nouveau serveur
      const waiter: Waiter = new WaiterBuilder()
                                  .build();

      // QUAND on récupére son chiffre d'affaires
      const turnoverWaiter = waiter.turnover;

      // ALORS celui-ci est à 0
      expect(turnoverWaiter).toEqual(0);
    });


  it("GIVEN new server "+
    "WHEN takes an order "+
    "THEN his turnover equal to order amount", 
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


  it("GIVEN new server "+
    "WHEN takes an order "+
    "THEN his turnover equal to order amount", 
    () => {
      // ÉTANT DONNÉ un serveur ayant déjà pris une commande
      const firstOrder: Order = new OrderBuilder()
                                  .withAmount(12)
                                  .build();
      const waiter: Waiter = new WaiterBuilder()
                                .name("Henry")
                                .withTotalTurnover(firstOrder.amount)
                                .build();

      // QUAND il prend une nouvelle commande
      const secondOrder: Order = new OrderBuilder()
                                    .withAmount(10)
                                    .build();
      affectOrder([secondOrder], waiter);

      // ALORS son chiffre d'affaires est la somme des deux commandes
      expect(waiter.turnover).toEqual(22);
  });
});




/*******    SCOPE Restaurant     *******/


describe("RESTAURANT SCOPE", () => {
  it("GIVEN a restaurant with X waiters "+
    "WHEN there is multiple order "+
    "THEN its turnover should be the sum of all orders", 
  () => {
    // 	ÉTANT DONNÉ un restaurant ayant X serveurs
    const nbWaiters = 4;
    const orderAmount = 15;
    
    const restaurant: Restaurant = new RestaurantBuilder()
                                    .isOpen(true)
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
    const x = nbWaiters;
    const y = orderAmount;
    expect(restaurant.totalTurnover).toEqual(x * y);
  });
});




/*******    SCOPE Franchise     *******/

describe("FRANCHISE SCOPE", () => {
  it("GIVEN a franchise with X restaurants with Y waiters "+
    "WHEN every waiters takes an order of amount Z " +
    "THEN franchise's turnover should be X*Y*Z", 
    () => {

      // ÉTANT DONNÉ une franchise ayant X restaurants de Y serveurs chacuns
      const nbRestaurant = 4;  
      const nbWaiters = 3;
      const orderAmount = 50

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
      const x = nbRestaurant;  
      const y = nbWaiters;
      const z = orderAmount;
      franchise.totalTurnover = totalTurnoverFranchise(franchise);
      expect(franchise.totalTurnover).toEqual(x*y*z);
    });
});

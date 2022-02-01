import { Franchise, Order, Restaurant, Waiter } from "../types/mainTypes";
import { affectOrder, addToTotalTurnover } from "../model/methods/waiters";
import { totalTurnoverFranchise } from "../model/methods/franchise";
import { RestaurantBuilder } from "./utils/builderRestaurant";
import { WaiterBuilder } from "./utils/builderWaiter";
import { OrderBuilder } from "./utils/builderOder";
import { FranchiseBuilder } from "./utils/builderFranchise";
import { WaiterGenerator } from "./utils/generatorWaiter";
import { RestaurantGenerator } from "./utils/generatorRestaurant";
import { RestaurantRepository} from "../repository/restaurantRepository";

const each = require("jest-each").default;
const repository: RestaurantRepository = new RestaurantRepository();

/*******    SCOPE Serveur     *******/

describe("WAITER SCOPE", () => {

  it("GIVEN new waiter " +
    "WHEN created " +
    "THEN has 0 turnover",
    () => {
      // ÉTANT DONNÉ un nouveau serveur
      const waiter: Waiter = repository.getOneWaiterWithNoTurnover();

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
    const waiter: Waiter = repository.getOneWaiterWithNoTurnover();

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
      const waiter: Waiter = repository.getOneWaiterWithTurnover();
      const amountOrderAlreadyPassed = waiter.turnover;

      // QUAND il prend une nouvelle commande
      const amountNewOrder = 12;
      const secondOrder: Order = new OrderBuilder()
                                    .withAmount(amountNewOrder)
                                    .build();
      affectOrder([secondOrder], waiter);

      // ALORS son chiffre d'affaires est la somme des deux commandes
      const sumOrders = amountOrderAlreadyPassed + amountNewOrder;
      expect(waiter.turnover).toEqual(sumOrders);
  });

});




/*******    SCOPE Restaurant     *******/


describe("RESTAURANT SCOPE", () => {
  each([
    [0, 15],
    [1, 50],
    [2, 85],
    [3, 150]
  ])
  .it("GIVEN a restaurant with X='%s' waiters "+
    "\nWHEN all waiters take an order take an order with amount Y='%s' "+
    "\nTHEN restaurant turnover is X * Y", 
  (x: number, y: number) => {
    // 	ÉTANT DONNÉ un restaurant ayant X serveurs
    const nbWaiters = x;
    const orderAmount = y;
    
    const restaurant: Restaurant = repository.getRestaurantWithGivenNbWaiterNoTurnover(nbWaiters);
    
    // 	QUAND tous les serveurs prennent une commande d'un montant Y
    const orderTakenByAllWaiters: Order = new OrderBuilder()
                                  .withAmount(orderAmount)
                                  .build();
    
    if (restaurant.waiters.length > 0) {
      restaurant.waiters.forEach(waiter => {
        // reset turnover
        waiter.turnover = 0;
        affectOrder([orderTakenByAllWaiters], waiter); 
      })
    }

    // 	ALORS le chiffre d'affaires de la franchise est X * Y
    addToTotalTurnover(restaurant);
    expect(restaurant.totalTurnover).toEqual(x*y);
  });

});


/*******    SCOPE Franchise     *******/

describe("FRANCHISE SCOPE", () => {
  it("GIVEN a franchise with X=3 restaurants with Y=3 waiters each one "+
    "\nWHEN every waiters takes an order of amount Z=15 " +
    "\nTHEN franchise's turnover should be X*Y*Z", 
    () => {

      // ÉTANT DONNÉ une franchise ayant X restaurants de Y serveurs chacuns
      const nbRestaurant = 3;  
      const nbWaiters = 3;
      const orderAmount = 15;

      const franchise : Franchise = repository.getFranchiseWith3RestaurantsOf3WaitersEach();
      
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
      expect(franchise.totalTurnover).toEqual(nbRestaurant*nbWaiters*orderAmount);
    });
});

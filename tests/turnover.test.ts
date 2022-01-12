// import { Waiter, Order, Restaurant } from "../objects";
import { Waiter, Order, Restaurant, Franchise } from "../types/mainTypes";
import {
  affectOrder,
  assignNumberOfOrderWithFixPrice,
  addToTotalTurnover,
} from "../methods/waiters";
import {
  assignOrdersToEveryWaiterInRestaurant,
  totalTurnover,
} from "../methods/restaurants";
import {
  assignOrdersToWaiterAllRestaurantsInFranchise,
  totalTurnoverFranchise,
} from "../methods/franchise";
import { GeneratorWaiter } from "../tests/utils/generatorWaiter";
import { WaiterBuilder } from "./utils/builderWaiter";
import { FranchiseBuilder } from "./utils/builderFranchise";
import { GeneratorFranchise } from "./utils/generatorFranchise";

// SCOPE Serveur

describe("WAITER SCOPE", () => {
  it("GIVEN new waiter WHEN created THEN has 0 turnover", () => {
    // 		ÉTANT DONNÉ un nouveau serveur
    const waiter: Waiter = { name: "Charles", turnover: 0 };
    // 		QUAND on récupére son chiffre d'affaires
    // 		ALORS celui-ci est à 0
    expect(waiter.turnover).toEqual(0);
  });

  it("GIVEN new server WHEN takes an order THEN his turnover equal to order amount", () => {
    // 		ÉTANT DONNÉ un nouveau serveur
    const waiter: Waiter = { name: "Henry", turnover: 0 };
    // 		QUAND il prend une commande
    const firstOrder: Order = { amount: 12 };
    affectOrder([firstOrder], waiter);
    // 		ALORS son chiffre d'affaires est le montant de celle-ci
    expect(waiter.turnover).toEqual(12);
  });
  it("GIVEN new server WHEN takes an order THEN his turnover equal to order amount", () => {
    // 		ÉTANT DONNÉ un serveur ayant déjà pris une commande
    const waiter: Waiter = { name: "Henry", turnover: 0 };
    // 		QUAND il prend une nouvelle commande
    const firstOrder: Order = { amount: 12 };
    const secondOrder: Order = { amount: 10 };
    affectOrder([firstOrder, secondOrder], waiter);
    // 		ALORS son chiffre d'affaires est la somme des deux commandes
    expect(waiter.turnover).toEqual(22);
  });
});

// SCOPE Restaurant
describe("RESTAURANT SCOPE", () => {
  it("GIVEN a restaurant with X waiters WHEN there is multiple order THEN its turnover should be the sum of all orders", () => {
    // 		ÉTANT DONNÉ un restaurant ayant X serveurs
    // créer builder waiter => builder restaurant =>
    //créer action ouverture resto, attribuer des serveurs

    const restaurant = GeneratorWaiter(4);
    // 		QUAND tous les serveurs prennent une commande d'un montant Y
    const { waiters } = restaurant;
    if (waiters) {
      assignNumberOfOrderWithFixPrice(0, 1, [waiters[0]]);
      assignNumberOfOrderWithFixPrice(1, 1, [waiters[1]]);
      assignNumberOfOrderWithFixPrice(2, 1, [waiters[2]]);
      assignNumberOfOrderWithFixPrice(100, 1, [waiters[3]]);
    }
    // 		ALORS le chiffre d'affaires de la franchise est X * Y
    // 		CAS(X = 0; X = 1; X = 2; X = 100)
    // 		CAS(Y = 1.0)
    addToTotalTurnover(restaurant);
    expect(restaurant.totalTurnover).toEqual(103);
  });
});

// SCOPE Franchise

describe("FRANCHISE SCOPE", () => {
  it("GIVEN a franchise with X restaurants with Y waiters WHEN every waiters takes an order of amount Z THEN franchise's turnover should be X*Y*Z", () => {
    // ÉTANT DONNÉ une franchise ayant X restaurants de Y serveurs chacuns
    const franchise = GeneratorFranchise(4);
    const { restaurants } = franchise;
    const restaurant1 = GeneratorWaiter(0, restaurants[0]);
    const restaurant2 = GeneratorWaiter(1, restaurants[1]);
    const restaurant3 = GeneratorWaiter(2, restaurants[2]);
    const restaurant4 = GeneratorWaiter(1000, restaurants[3]);
    // QUAND tous les serveurs prennent une commande d'un montant Z
    // CAS(X = 0; X = 1; X = 2; X = 1000)
    // CAS(Y = 0; Y = 1; Y = 2; Y = 1000)
    // CAS(Z = 1.0)
    assignOrdersToEveryWaiterInRestaurant(0, 1, restaurant1);
    assignOrdersToEveryWaiterInRestaurant(1, 1, restaurant2);
    assignOrdersToEveryWaiterInRestaurant(2, 1, restaurant3);
    assignOrdersToEveryWaiterInRestaurant(1000, 1, restaurant4);
    // ALORS le chiffre d'affaires de la franchise est X * Y * Z

    franchise.totalTurnover = totalTurnoverFranchise(franchise);
    expect(franchise.totalTurnover).toEqual(
      totalTurnover(restaurant1) +
        totalTurnover(restaurant2) +
        totalTurnover(restaurant3) +
        totalTurnover(restaurant4)
    );
  });
});

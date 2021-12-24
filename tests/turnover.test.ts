import { Waiter, Order } from "../objects";

// SCOPE Serveur

describe("WAITER SCOPE", () => {
  it("GIVEN new waiter WHEN created THEN has 0 turnover", () => {
    // 		ÉTANT DONNÉ un nouveau serveur
    const waiter = new Waiter("Charles", 0);
    // 		QUAND on récupére son chiffre d'affaires
    // 		ALORS celui-ci est à 0
    expect(waiter.turnover).toEqual(0);
  });

  it("GIVEN new server WHEN takes an order THEN his turnover equal to order amount", () => {
    // 		ÉTANT DONNÉ un nouveau serveur
    const waiter = new Waiter("Henry", 0);
    // 		QUAND il prend une commande
    const firstOrder = new Order(12);
    waiter.affectOrder([firstOrder]);
    // 		ALORS son chiffre d'affaires est le montant de celle-ci
    expect(waiter.turnover).toEqual(12);
  });
  it("GIVEN new server WHEN takes an order THEN his turnover equal to order amount", () => {
    // 		ÉTANT DONNÉ un serveur ayant déjà pris une commande
    const waiter = new Waiter("Henry", 0);
    // 		QUAND il prend une nouvelle commande
    const firstOrder = new Order(12);
    const secondOrder = new Order(10);
    waiter.affectOrder([firstOrder, secondOrder]);
    // 		ALORS son chiffre d'affaires est la somme des deux commandes
    expect(waiter.turnover).toEqual(22);
  });
});

// SCOPE Restaurant
describe("RESTAURANT SCOPE", () => {
  it("GIVEN A RESTAURANT WITH X WAITERS WHEN THERE IS MULTIPLE ORDER THEN ITS TURNOVER SHOULD BE THE SUM OF ALL ORDERS")
// 		ÉTANT DONNÉ un restaurant ayant X serveurs
  const restaurant1 = new Restaurant(true, 5);
// 		QUAND tous les serveurs prennent une commande d'un montant Y

// 		ALORS le chiffre d'affaires de la franchise est X * Y
// 		CAS(X = 0; X = 1; X = 2; X = 100)
// 		CAS(Y = 1.0)
});

// SCOPE Epinglage

describe("SCOPE PINNING", () => {
  it(
    "GIVEN a waiter who has taken an order" +
      "WHEN he reports it unpaid" +
      "THEN the order is marked as pinned",
    () => {
      // 	ÉTANT DONNE un serveur ayant pris une commande
      // 	QUAND il la déclare comme non-payée
      // 	ALORS cette commande est marquée comme épinglée
    }
  );
  it(
    "GIVEN a waiter who has pinned an order" +
      "WHEN the order is less than 15 days old" +
      " THEN the order is marked as to send to the police",
    () => {
      // 	ÉTANT DONNE un serveur ayant épinglé une commande
      // 	QUAND elle date d'il y a au moins 15 jours
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
    }
  );
});

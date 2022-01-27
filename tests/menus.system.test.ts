// SCOPE Menus
describe("SCOPE MENUS", () => {
  it(
    "GIVEN a restaurant who has the status of subsidiary of a franchise AND a franchise defining a menu with a dish" +
      "WHEN the franchise updated the dishes price" +
      "THEN the price of the dish in the restaurant menu is the one defined by the franchise",
    () => {
      // 	ÉTANT DONNE un restaurant ayant le statut de filiale d'une franchise
      // 	ET une franchise définissant un menu ayant un plat
      // 	QUAND la franchise modifie le prix du plat
      // 	ALORS le prix du plat dans le menu du restaurant est celui défini par la franchise
    }
  );
  it(
    "GIVEN a restaurant belonging to a franchise and defining a menu with a dish AND a franchise defining a menu with the same dish" +
      "WHEN the franchise updates the price of the dish" +
      "THEN the price of the dish in the restaurant menu does not change",
    () => {
      // 	ÉTANT DONNE un restaurant appartenant à une franchise et définissant un menu ayant un plat
      // 	ET une franchise définissant un menu ayant le même plat
      // 	QUAND la franchise modifie le prix du plat
      // 	ALORS le prix du plat dans le menu du restaurant reste inchangé
    }
  );
  it(
    "GIVEN a restaurant belonging to a franchise and defining a menu with a dish" +
      " WHEN the franchise add a new dish" +
      "THEN the restaurant offers the first dish at restaurant's price and the second at franchise's price",
    () => {
      // 	ÉTANT DONNE un restaurant appartenant à une franchise et définissant un menu ayant un plat
      // 	QUAND la franchise ajoute un nouveau plat
      // 	ALORS la carte du restaurant propose le premier plat au prix du restaurant et le second au prix de la franchise
    }
  );
});

import { notUpdateDishesPrice, updateDishesPrice } from "../model/methods/franchise";
import { addDishesToRestaurant } from "../model/methods/restaurants";
import { Franchise, Menu, Restaurant } from "../types/mainTypes";
import { FranchiseBuilder } from "./utils/builderFranchise";
import { RestaurantBuilder } from "./utils/builderRestaurant";

// SCOPE Menus
describe("SCOPE MENUS", () => {
  it(
    "GIVEN a restaurant who has the status of subsidiary of a franchise AND a franchise defining a menu with a dish" +
      "WHEN the franchise updated the dishes price" +
      "THEN the price of the dish in the restaurant menu is the one defined by the franchise",
    () => {
      const restaurant: Restaurant = new RestaurantBuilder()
        .newDish("escalope", 5)
        .build();
      const franchise: Franchise = new FranchiseBuilder()
        .newDish("escalope", 5)
        .build();

      updateDishesPrice(
        { dishes: "escalope", price: 10 },
        franchise,
        restaurant
      );
      // 	ÉTANT DONNE un restaurant ayant le statut de filiale d'une franchise3
      // 	ET une franchise définissant un menu ayant un plat
      // 	QUAND la franchise modifie le prix du plat
      // 	ALORS le prix du plat dans le menu du restaurant est celui défini par la franchise
      if (restaurant.menu && franchise.menu) {
        expect(restaurant.menu[0].price).toEqual(franchise.menu[0].price);
      }
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
            const restaurant: Restaurant = new RestaurantBuilder()
        .newDish("escalope", 5)
        .build();
      const franchise: Franchise = new FranchiseBuilder()
        .newDish("escalope", 5)
        .build();

      notUpdateDishesPrice(
        { dishes: "escalope", price: 10 },
        franchise
      );

      if (restaurant.menu && franchise.menu) {
        expect(restaurant.menu[0].price).not.toEqual(franchise.menu[0].price);
      }
    
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
      const dish1 : Menu = { dishes: "frangipane", price: 13 }
      const dish2 : Menu = { dishes: "escalope", price: 5 }

      const restaurant: Restaurant = new RestaurantBuilder()
      .newDish(dish1.dishes, dish1.price)
      .build();
    const franchise: Franchise = new FranchiseBuilder()
      .newDish(dish2.dishes, dish2.price)
      .build();

    addDishesToRestaurant(
      dish2,
      restaurant
    );

    if (restaurant.menu && franchise.menu) {
      expect(restaurant.menu).toEqual([dish1, dish2]);
    }
    }
  );
});

import { Waiter, Restaurant, Franchise } from "../../types/mainTypes";
import { FranchiseBuilder } from "./builderFranchise";
import { RestaurantBuilder } from "./builderRestaurant";
import { WaiterBuilder } from "./builderWaiter";

export function GeneratorFranchise(
  numberOfRestaurants: number,
  numberOfWaiterPerRestaurant?: number
) {
  let waitersWorking: Waiter[] = [];
  let restaurants: Restaurant[] = [];
  const newFranchise: Franchise = new FranchiseBuilder()
    .numberOfRestaurants(numberOfRestaurants)
    .build();
    for (let i = 0; i < numberOfRestaurants; i++) {

    let restaurant: Restaurant = new RestaurantBuilder()
    .isOpen(true)
    .build();
    restaurants.push(restaurant);
    }
    newFranchise.restaurants = restaurants;
  if (numberOfWaiterPerRestaurant) {
      for (let i = 0; i < numberOfWaiterPerRestaurant; i++) {
        let waiter: Waiter = new WaiterBuilder().name(`Serveur n*${i}`).build();
        waitersWorking.push(waiter);
        restaurants[i].waiters = waitersWorking;
        restaurants.push(restaurants[i]);
      }
    }
  newFranchise.restaurants = restaurants;
  return newFranchise;
}

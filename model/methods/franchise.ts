import { Franchise, Menu, Restaurant } from "../../types/mainTypes";
import { assignNumberOfOrderWithFixPrice } from "./waiters";

export function totalTurnoverFranchise(
  franchise: Franchise,
): number
{
  let total: number = 0;
  const { restaurants} = franchise;
  for (let restaurant of restaurants) {
    const { waiters } = restaurant;
    if (waiters)
      for (let waiter of waiters) {
        total += waiter.turnover;
      }
  }
  return total;
}

export function assignOrdersToWaiterAllRestaurantsInFranchise(
        count: number,
        price: number,
        franchise: Franchise
): number
{
  const { restaurants} = franchise;
  let total = 0;
    if(restaurants) {
      for (let restaurant of restaurants) {
        const { waiters } = restaurant;
        if (waiters) {
     let temporaryTotal =  assignNumberOfOrderWithFixPrice(count, price, waiters);
     if(temporaryTotal){
      total = total + temporaryTotal;
     }
        }
      }
    }
    const fullTotal =  totalTurnoverFranchise(franchise)

    return franchise.totalTurnover = fullTotal;

}

export function updateDishesPrice(dishes: Menu, franchise: Franchise, restaurant: Restaurant): Franchise  {
 const wantedDishesForFranchise =  franchise.menu?.find((plat) => plat.dishes = dishes.dishes);
 const wantedDishesForRestaurant = restaurant.menu?.find((plat) => plat.dishes = dishes.dishes);
 if(wantedDishesForFranchise && wantedDishesForRestaurant) {
  wantedDishesForFranchise.price = dishes.price;
  wantedDishesForRestaurant.price = dishes.price;
 } 
  return franchise;
}

export function notUpdateDishesPrice(dishes: Menu, franchise: Franchise): Franchise  {
  const wantedDishesForFranchise =  franchise.menu?.find((plat) => plat.dishes = dishes.dishes);
  if(wantedDishesForFranchise) {
   wantedDishesForFranchise.price = dishes.price;
  } 
   return franchise;
 }


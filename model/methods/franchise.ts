import { Franchise, Restaurant } from "../../types/mainTypes";
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

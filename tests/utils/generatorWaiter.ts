import { Waiter } from "../../types/mainTypes";
import { WaiterBuilder } from "./builderWaiter";
import { RestaurantBuilder } from "./builderRestaurant";
import { Restaurant } from "../../types/mainTypes";


export function GeneratorWaiter(numberOfWaiter: number, restaurant?: Restaurant) {
  let waitersWorking: Waiter[] = [];

  for (let i = 0; i < numberOfWaiter; i++) {
    let waiter: Waiter = new WaiterBuilder().name(`Serveur n*${i}`).build();
    waitersWorking.push(waiter);
  }
  if(!restaurant) {
    const restaurant: Restaurant = new RestaurantBuilder()
    .isOpen(true)
    .numberOfWaiter(numberOfWaiter)
    .build();  
    restaurant.waiters = waitersWorking;
    return restaurant;
  } else {
      restaurant.waiters = waitersWorking;
      return restaurant;
  }
}

// export default class GeneratorWaiter {
//   constructor() {
//     const iterator = this.generator(0);
//     iterator.next();
//   }
//   *generator(numberOfWaiter: number): IterableIterator<number> {
//     const waitersWorking: Waiter[] = [];
//     const newRestaurant: Restaurant = new RestaurantBuilder().isOpen(true).numberOfWaiter(numberOfWaiter).build();

//     for (let i = 0; i < numberOfWaiter; i++) {
//         let waiters = new WaiterBuilder().name(`Serveur n*${i}`).build();
//         waitersWorking.push(waiters)
//     }
//     newRestaurant.waiters = waitersWorking;
//     return waitersWorking;
//   }
// }
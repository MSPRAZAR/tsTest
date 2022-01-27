import { Waiter, Restaurant } from "../../types/mainTypes";
import { WaiterBuilder } from "./builderWaiter";
import { RestaurantBuilder } from "./builderRestaurant";


export class WaiterGenerator {

  *generate(
    numberOfWaiter: number, 
    restaurantNum?: string
  ): Iterable<Waiter> 
  {
    for (let i = 0; i < numberOfWaiter; i++) {
      yield new WaiterBuilder()
                .name(`Restaurant ${restaurantNum} - Serveur n*${i}`)
                .withTotalTurnover(0)
                .build(); 
    }
  }

}
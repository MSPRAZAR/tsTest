import { Restaurant } from "../../types/mainTypes";
import { RestaurantBuilder } from "./builderRestaurant";


export class RestaurantGenerator {
  
  *generate(nbRestaurant: number): Iterable<Restaurant> {

    for (let i = 0; i < nbRestaurant; i++) {
      yield new RestaurantBuilder().build();
    }
  }

}
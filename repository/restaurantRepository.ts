import {franchise} from '../database/waiterDatabase.json';
import { Restaurant, Waiter } from '../types/mainTypes';

export class RestaurantRepository {

    getRestaurantWaiters(restaurant : Restaurant): Waiter[] | undefined {
    const waitersList =  franchise.restaurantsWithWaiterNoTurnover
    .find((oneResto) => oneResto.restaurantName === restaurant.restaurantName); 
        return waitersList?.waiters
    }


}
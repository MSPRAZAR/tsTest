import {waiterDatabase as db} from '../database/waiterDatabase.json';

export class RestaurantRepository {

    dbObject = JSON.parse(db);   

    getRestaurantWaiters(restaurantName : string) {

    }


}
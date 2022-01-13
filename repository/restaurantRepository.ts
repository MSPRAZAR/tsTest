import {resturantsTypes, franchise } from '../database/restaurantDatabase.json';
import { Franchise, Restaurant, Waiter } from '../types/mainTypes';

export class RestaurantRepository {

    getFranchiseWith3RestaurantsOf3WaitersEach(): Franchise {        
        return franchise;
    }

    getRestaurantWithGivenNbWaiterNoTurnover(nbWaitersInRestaurant: number): Restaurant {
        const restaurantList: Restaurant[] = resturantsTypes.restaurantsWithWaiterNoTurnover.restaurants;
        const biggestRestaurant: Restaurant | undefined = restaurantList.find((restaurant) => 
                                        restaurant.restaurantName === "Restaurant 3");

        if( (biggestRestaurant) != undefined && nbWaitersInRestaurant <= 4 ){
            const restaurantWithGivenNbOfWaiters : Restaurant = {
                isOpen: biggestRestaurant.isOpen,
                numberOfWaiter: nbWaitersInRestaurant,
                waiters: biggestRestaurant.waiters.slice(0, nbWaitersInRestaurant),
                totalTurnover: biggestRestaurant.totalTurnover,
                restaurantName: biggestRestaurant.restaurantName
            }
            return restaurantWithGivenNbOfWaiters;
        } else {
            throw nbWaitersInRestaurant + ' is too many waiters';
        };
    }
    
    getAllWaitersWithNoTurnoverInRestaurantNamed(restaurantName : string): Waiter[]
    {
        const restaurantList = resturantsTypes.restaurantsWithWaiterNoTurnover.restaurants;
        const restaurantToFind = restaurantList.find((restaurant) => 
                                    restaurant.restaurantName === restaurantName); 
        
        
        return (restaurantToFind === undefined) 
            ? [] 
            : restaurantToFind.waiters;
    }

    getOneWaiterWithNoTurnover(): Waiter {
        const restaurantList: Restaurant[] = resturantsTypes
                                                .restaurantsWithWaiterNoTurnover
                                                .restaurants;
        const waiterWithNoTurnover = restaurantList[0].waiters[0]; 
        return waiterWithNoTurnover;
    }

    getOneWaiterWithTurnover(): Waiter {
        const restaurantList = resturantsTypes.restaurantsWithWaiterTurnover.restaurants;
        const waiterWithNoTurnover = restaurantList[0].waiters[0]; 
        return waiterWithNoTurnover;
    }

}
import { Restaurant } from "../../types/mainTypes";

export class RestaurantBuilder {
    private readonly _restaurant: Restaurant;
  
    constructor() {
      this._restaurant = {
        isOpen: false,
        numberOfWaiter: 0,
        waiters: [],
        totalTurnover: 0,
      };
    }
  
    isOpen(isOpen: boolean): RestaurantBuilder {
      this._restaurant.isOpen = isOpen;
      return this;
    }
    
    numberOfWaiter(numberOfWaiter: number): RestaurantBuilder {
      this._restaurant.numberOfWaiter = numberOfWaiter;
      return this;
    }
  
    build(): Restaurant {
      return this._restaurant;
    }
  }
import { Franchise, Restaurant } from "../../types/mainTypes";

export class FranchiseBuilder {
  private readonly _franchise: Franchise;

  constructor() {
    this._franchise = {
      restaurants: [],
      totalTurnover: 0,
      numberOfRestaurants: 0,
    };
  }

  numberOfRestaurants(restaurant: number): FranchiseBuilder {
    this._franchise.numberOfRestaurants = restaurant;
    return this;
  }

  newDish(name: string, price: number): FranchiseBuilder {
    let menu = [];
    menu.push({dishes: name, price: price});
    this._franchise.menu = menu;
    return this;
  }

  build(): Franchise {
    return this._franchise;
  }
}

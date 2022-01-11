import { Franchise, Restaurant } from "../../types/mainTypes";
import { GeneratorWaiter } from "./generatorWaiter";

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

  build(): Franchise {
    return this._franchise;
  }
}

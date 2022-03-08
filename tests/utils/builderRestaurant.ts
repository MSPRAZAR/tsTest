import { Restaurant, serviceStatus, Table } from "../../types/mainTypes";
import { TableBuilder } from "./builderTable";

export class RestaurantBuilder {
    private readonly _restaurant: Restaurant;
  
    constructor() {
      this._restaurant = {
        restaurantName : "",
        serviceStatus: serviceStatus.started,
        numberOfWaiter: 0,
        waiters: [],
        totalTurnover: 0,
        kitchen: {taskList: []},
        tables: [],
        butler: {},
      };
    }
    
    numberOfWaiter(numberOfWaiter: number): RestaurantBuilder {
      this._restaurant.numberOfWaiter = numberOfWaiter;
      return this;
    }

    numberOfTable(tables: Table[]): RestaurantBuilder {
      this._restaurant.tables = tables;
      return this;
    }
    newDish(name: string, price: number): RestaurantBuilder {
      let menu = [];
      menu.push({dishes: name, price: price});
      this._restaurant.menu = menu;
      return this;
    }
  
    build(): Restaurant {
      return this._restaurant;
    }
  }
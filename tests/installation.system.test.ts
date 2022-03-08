import { affectCustomerToTable, customerLeaveTheTable } from "../model/methods/table";
import { Restaurant, Table } from "../types/mainTypes";
import { RestaurantBuilder } from "./utils/builderRestaurant";
import { TableGenerator } from "./utils/generatorTable";

// SCOPE Installation
describe("SCOPE INSTALLATION", () => {
  it(
    "GIVEN a table in a restaurant which has started its shift" +
      "WHEN a customer is affected to a table" +
      "THEN this table is not on the free tables list",
    () => {

      const restaurant: Restaurant = new RestaurantBuilder()
      .build();
      const numberOfTable = 5;
      const tables: Iterable<Table> = new TableGenerator().generate(numberOfTable);
      
      for (let table of tables) {
        restaurant.tables.push(table);
      }
      affectCustomerToTable(restaurant.tables[0], restaurant);
      const tableList = restaurant.tables;
      let freeTable: Table[] = [];      
      for (const table of restaurant.tables) {
        if(table.isFree) {
          freeTable.push(table);
        } 
      };
      // ÉTANT DONNE une table dans un restaurant ayant débuté son service
      // QUAND un client est affecté à une table
      // ALORS cette table n'est plus sur la liste des tables libres du restaurant
      expect(tableList).not.toEqual(freeTable);
    }
  );
  it(
    "GIVEN a table occupied by a customer" +
      "WHEN this table is released" +
      "THEN this table appears on the free tables list",
    () => {
      // ÉTANT DONNE une table occupée par un client
      // QUAND la table est libérée
      // ALORS cette table appraît sur la liste des tables libres du restaurant
      const restaurant: Restaurant = new RestaurantBuilder()
      .build();
      const numberOfTable = 5;
      const tables: Iterable<Table> = new TableGenerator().generate(numberOfTable);
      
      for (let table of tables) {
        restaurant.tables.push(table);
      }
      affectCustomerToTable(restaurant.tables[0], restaurant);
      customerLeaveTheTable(restaurant.tables[0], restaurant);
      const tableList = restaurant.tables;
      let freeTable: Table[] = [];      
      for (const table of restaurant.tables) {
        if(table.isFree) {
          freeTable.push(table);
        } 
      }
      // ÉTANT DONNE une table dans un restaurant ayant débuté son service
      // QUAND un client est affecté à une table
      // ALORS cette table n'est plus sur la liste des tables libres du restaurant
      expect(tableList).toEqual(freeTable);
    }
  );
});



// SCOPE DebutService

import { affectTablesToButler } from "../model/methods/butler";
import { affectTableToWaiter } from "../model/methods/table";
import { Restaurant, serviceStatus, Table, Waiter } from "../types/mainTypes";
import { RestaurantBuilder } from "./utils/builderRestaurant";
import { TableGenerator } from "./utils/generatorTable";
import { WaiterGenerator } from "./utils/generatorWaiter";

describe("CATERING SCOPE", () => {
  it(
    "GIVEN a restaurant with 3 tables" +
      "WHEN shift starts" +
      "THEN they all are affected to the butler",
    () => {
      const restaurant: Restaurant = new RestaurantBuilder()
        .build();
      const numberOfTable = 3;
      const tables: Iterable<Table> = new TableGenerator().generate(
        numberOfTable
      );

      for (let table of tables) {
        restaurant.tables.push(table);
      }
      affectTablesToButler(restaurant.butler, restaurant.tables);
      expect(restaurant.butler.tables).toEqual(restaurant.tables);
      // 	ÉTANT DONNE un restaurant ayant 3 tables
      // 	QUAND le service commence
      // 	ALORS elles sont toutes affectées au Maître d'Hôtel
    }
  );
  it(
    "GIVEN a restaurant with 3 tables and 1 affected to a waiter" +
      "WHEN shift starts" +
      "THEN edited table is affected to the waiter and 2 others to the butler",
    () => {
      // 	ÉTANT DONNÉ un restaurant ayant 3 tables dont une affectée à un serveur
      // 	QUAND le service débute
      // 	ALORS la table éditée est affectée au serveur et les deux autres au maître d'hôtel
      const nbWaiter = 1;
      const restaurant: Restaurant = new RestaurantBuilder()
        .numberOfWaiter(nbWaiter)
        .build();
        const waiterGenerator: Iterable<Waiter> = new WaiterGenerator().generate(
            nbWaiter
          );
          for (let waiter of waiterGenerator) {
            restaurant.waiters.push(waiter);
          }
      const numberOfTable = 3;
      const tables: Iterable<Table> = new TableGenerator().generate(
        numberOfTable
      );

      for (let table of tables) {
        restaurant.tables.push(table);
      }
      affectTableToWaiter([restaurant.tables[0]], restaurant.waiters[0], restaurant.serviceStatus);
      const othersTable = [restaurant.tables[1], restaurant.tables[2]];
      affectTablesToButler(restaurant.butler, othersTable);
      const butlerTableLength =
        restaurant.butler.tables && restaurant.butler.tables.length;
      const waiterTableLength =
        restaurant.waiters[0].tables && restaurant.waiters[0].tables.length;
      expect(restaurant.butler.tables).not.toEqual(
        restaurant.waiters[0].tables
      );
      if (butlerTableLength && waiterTableLength) {
        expect(restaurant.tables.length).toEqual(
          butlerTableLength + waiterTableLength
        );
      }
    }
  );
  it(
    "GIVEN a restaurant with 3 tables and 1 affected to a waiter" +
      "WHEN shift starts" +
      " THEN it is not possible to update the waiter affected to the table",
    () => {
        const nbWaiter = 1;
        const restaurant: Restaurant = new RestaurantBuilder()
          .numberOfWaiter(nbWaiter)
          .build();
          const waiterGenerator: Iterable<Waiter> = new WaiterGenerator().generate(
              nbWaiter
            );
            for (let waiter of waiterGenerator) {
              restaurant.waiters.push(waiter);
            }
        const numberOfTable = 3;
        const tables: Iterable<Table> = new TableGenerator().generate(
          numberOfTable
        );
  
        for (let table of tables) {
          restaurant.tables.push(table);
        }
        affectTableToWaiter([restaurant.tables[0]], restaurant.waiters[0], restaurant.serviceStatus);
        const othersTable = [restaurant.tables[1], restaurant.tables[2]];
        restaurant.serviceStatus = serviceStatus.ongoing;
        affectTableToWaiter(othersTable, restaurant.waiters[0], restaurant.serviceStatus);

       
        expect(restaurant.waiters[0].tables).not.toContain(
          othersTable
        );
      // 	ÉTANT DONNÉ un restaurant ayant 3 tables dont une affectée à un serveur
      // 	QUAND le service débute
      // 	ALORS il n'est pas possible de modifier le serveur affecté à la table
    }
  );
  it(
    "GIVEN a restaurant with 3 tables and 1 affected to a waiter AND shift started" +
      "WHEN shift ends AND a table is affected to a waiter" +
      "THEN updated table is affected to the waiter and 2 others to the butler",
    () => {
      // 	ÉTANT DONNÉ un restaurant ayant 3 tables dont une affectée à un serveur
      // 	ET ayant débuté son service
      // 	QUAND le service se termine
      // 	ET qu'une table est affectée à un serveur
      // 	ALORS la table éditée est affectée au serveur et les deux autres au maître d'hôtel
      const nbWaiter = 1;
      const restaurant: Restaurant = new RestaurantBuilder()
        .numberOfWaiter(nbWaiter)
        .build();
        const waiterGenerator: Iterable<Waiter> = new WaiterGenerator().generate(
            nbWaiter
          );
          for (let waiter of waiterGenerator) {
            restaurant.waiters.push(waiter);
          }
      const numberOfTable = 3;
      const tables: Iterable<Table> = new TableGenerator().generate(
        numberOfTable
      );

      for (let table of tables) {
        restaurant.tables.push(table);
      }
      affectTableToWaiter([restaurant.tables[0]], restaurant.waiters[0], restaurant.serviceStatus);
      const othersTable = [restaurant.tables[1], restaurant.tables[2]];
      restaurant.serviceStatus = serviceStatus.finished;
      affectTablesToButler(restaurant.butler, othersTable);

     
      expect(restaurant.butler.tables).toEqual(
        othersTable
      );
      expect(restaurant.waiters[0].tables).not.toContain(othersTable);
    }
  );
});

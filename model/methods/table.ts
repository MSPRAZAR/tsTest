import {
  Restaurant,
  serviceStatus,
  Table,
  Waiter,
} from "../../types/mainTypes";

export function affectCustomerToTable(
  table: Table,
  restaurant: Restaurant
): Restaurant {
  table.isFree = false;

  restaurant.tables = [...restaurant.tables, table];

  return restaurant;
}

export function customerLeaveTheTable(
  table: Table,
  restaurant: Restaurant
): Restaurant {
  table.isFree = true;

  restaurant.tables = [...restaurant.tables, table];

  return restaurant;
}

export function affectTableToRestaurant(
  tables: Table[],
  restaurant: Restaurant
): Restaurant {
  restaurant.tables = tables;

  return restaurant;
}

export function affectTableToWaiter(
  tables: Table[],
  waiter: Waiter,
  status: serviceStatus
): Waiter {
  if (status === serviceStatus.started) {
    waiter.tables = tables;
  }
  return waiter;
}

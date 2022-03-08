export interface Restaurant {
  serviceStatus: serviceStatus;
  numberOfWaiter: number;
  waiters: Waiter[];
  totalTurnover: number;
  restaurantName: string;
  kitchen: Kitchen;
  tables: Table[];
  butler: Butler;
  menu?: Menu[];
  pinnedOrder?: PinnedOrder[];
}

export interface Cops {
  orders: PinnedOrder[]
}

export interface PinnedOrder {
  order: Order;
  date: Date;
}

export interface Waiter {
  name: string;
  turnover: number;
  orders: Order[];
  tables?: Table[];
}

export interface Butler {
  tables?: Table[];
}

export interface Customer {
  table: Table;
  orders: Order[];
}

export interface Table {
  isFree: boolean;
}

export interface Order {
  amount: number;
  type?: orderType;
  status: orderStatus; 
}

export interface Franchise {
  restaurants: Restaurant[];
  totalTurnover: number;
  numberOfRestaurants: number;
  menu?: Menu[];
}

export interface Menu {
  dishes: string;
  price: number;
}

export interface Kitchen {
  taskList: Order[];
}

export enum orderType {
  food = "food",
  drink = "drink",
}

export enum serviceStatus {
  started = "started",
  ongoing = "ongoing",
  finished = "finished",
}

export enum orderStatus {
  ongoing = "ongoing",
  payed = "payed",
  unpayed = "unpayed",
  sendToCops = "sendToCops"
}

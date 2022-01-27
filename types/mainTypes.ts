export interface Restaurant {
    isOpen: boolean,
    numberOfWaiter: number,
    waiters: Waiter[]
    totalTurnover: number,
    restaurantName: string;
    kitchen: Kitchen;
    tables: Table[];
};

export interface Waiter {
    name: string,
    turnover: number,
    orders: Order[],
    tables?: Table[], 
}

export interface Table {
    isFree: boolean,
}

export interface Order {
    amount: number,
    type?: orderType,
}

export interface Franchise {
    restaurants: Restaurant[],
    totalTurnover: number,
    numberOfRestaurants: number,
}

export interface Kitchen {
    taskList: Order[];
}

export enum orderType {
    food = "food",
    drink = "drink", 
}
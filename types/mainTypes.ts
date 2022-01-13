export interface Restaurant {
    isOpen: boolean,
    numberOfWaiter: number,
    waiters: Waiter[]
    totalTurnover: number,
    restaurantName: string;
};

export interface Waiter {
    name: string,
    turnover: number,
    orders?: Order[],
    tables?: Table[], 
}

export interface Table {
    isFree: boolean,
}

export interface Order {
    amount: number,
}

export interface Franchise {
    restaurants: Restaurant[],
    totalTurnover: number,
    numberOfRestaurants: number,
}
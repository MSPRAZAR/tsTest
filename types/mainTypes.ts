export interface Restaurant {
    isOpen: boolean
};

export interface Waiter {
    name: string,
    turnover: boolean,
}

export interface Table {
    isFree: boolean,
}

export interface Order {
    amount: number,
}
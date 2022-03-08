import { Table } from "../../types/mainTypes";

export class TableBuilder {
    private readonly _table: Table;
  
    constructor() {
      this._table = {
        isFree: true,
      };
    }
    build(): Table {
      return this._table;
    }
  }
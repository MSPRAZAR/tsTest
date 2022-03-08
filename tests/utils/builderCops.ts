import { Cops } from "../../types/mainTypes";

export class CopsBuilder {
  private readonly _cops: Cops;

  constructor() {
    this._cops = {
        orders: [],
    };

  }


  build(): Cops {
    return this._cops;
  }
}

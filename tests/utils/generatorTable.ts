import { Table } from "../../types/mainTypes";
import { TableBuilder } from "./builderTable";

export class TableGenerator {
  *generate(numberOfTable: number): Iterable<Table> {
    for (let i = 0; i < numberOfTable; i++) {
      yield new TableBuilder().build();
    }
  }
}

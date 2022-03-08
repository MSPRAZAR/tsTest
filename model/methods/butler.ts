import { Butler, Restaurant, Table } from "../../types/mainTypes";

export function affectTablesToButler(butler: Butler, tables: Table[]): Butler {
    butler.tables = tables;
    return butler;
}
import knex from "knex";
import { attachPaginate } from "knex-paginate";
import knexfile from "../../../knexfile";
import constantsConfig from "./constants.config";

const config = knexfile[constantsConfig.ENVIRONMENT];
attachPaginate();

export default knex(config);

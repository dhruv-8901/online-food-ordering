import moment from "moment";
import knex from "../../common/config/database.config";
import { ROLE } from "../../common/constant";

class CustomerService {
  static async getCustomers(req) {
    const data = await knex("users")
      .select("id", "firstName", "lastName" , "email", " phone", "profileImage", "createdAt")
      .where("role", ROLE.CUSTOMER);
    return {
      draw: parseInt(req.query.draw),
      recordsTotal: 5,
      recordsFiltered: 5,
      data: data,
    };
    // const columns = [
    //   "id",
    //   "profile",
    //   "firstName",
    //   "phone",
    //   "email",
    //   "createdAt",
    // ];

    // const search = req.query.search.value;
    // let start = parseInt(req.query.start);
    // const length = parseInt(req.query.length);
    // const orderColumn = columns[req.query.order[0].column];
    // const orderDir = req.query.order[0].dir;

    // const qb = knex("users").where("role", ROLE.CUSTOMER);
    // const recordsTotal = await qb;

    // qb.where(function () {
    //   this.orWhere("firstName", "like", `%${search}%`);
    //   this.orWhere("lastName", "like", `%${search}%`);
    //   this.orWhere("phone", "like", `%${search}%`);
    //   this.orWhere("email", "like", `%${search}%`);
    // });
    // const recordsFiltered = await qb;

    // qb.orderBy(orderColumn, orderDir);
    // if (length > -1) {
    //   qb.limit(length).offset(start); 
    // }
    // const rows = await qb;

    // const data = rows.map((row) => {
    //   const fileds = [];
    //   start = start + 1;
    //   fileds.push(start);
    //   if (row.profileImage) {
    //     fileds.push(`<img class="profile" src="../${row.profileImage}" >`);
    //   } else {
    //     fileds.push(row.profile);
    //   }
    //   fileds.push(`${row.firstName} ${row.lastName}`);
    //   fileds.push(row.phone);
    //   fileds.push(row.email);
    //   fileds.push(moment(row.createdAt).format("DD MMM YYYY"));
    //   return fileds;
    // });

    // return {
    //   draw: parseInt(req.query.draw),
    //   recordsTotal: recordsTotal.length,
    //   recordsFiltered: recordsFiltered.length,
    //   data: data,
    // };
  }
}

export default CustomerService;

exports.up = (knex) =>
  knex.schema.createTable("users", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table.string("firstName");
    table.string("lastName");
    table.string("storeName");
    table.string("email");
    table.string("phone");
    table.string("profileImage");
    table.boolean("isDetailsSkip").defaultTo(false);
    table.boolean("isAddressSkip").defaultTo(false);
    table.integer("role").defaultTo(1).comment('1 = Customer, 2 = Seller')
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("users");

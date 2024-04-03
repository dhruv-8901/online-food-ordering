exports.up = (knex) =>
  knex.schema.createTable("store_payment_details", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table
      .bigInteger("storeId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table.string("accountId");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("store_payment_details");

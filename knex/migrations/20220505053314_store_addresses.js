exports.up = (knex) =>
  knex.schema.createTable("store_addresses", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table
      .bigInteger("userId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table.double("latitude", 10, 5);
    table.double("longitude", 10, 5);
    table.string("addressLine1");
    table.string("addressLine2");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("store_addresses");

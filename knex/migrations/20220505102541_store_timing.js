exports.up = (knex) =>
  knex.schema.createTable("stores_timing", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table
      .bigInteger("storeId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table.time("opensAt");
    table.time("closesAt");
    table.enum('day', [0, 1, 2, 3, 4, 5, 6])
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("stores_timing");

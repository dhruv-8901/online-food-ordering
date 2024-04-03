exports.up = (knex) =>
  knex.schema.createTable("favourite_storeitems", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table
      .bigInteger("userId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table
      .bigInteger("storeItemId")
      .references("store_items.id")
      .unsigned()
      .onDelete("CASCADE");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("favourite_storeitems");

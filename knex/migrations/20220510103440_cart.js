exports.up = (knex) =>
  knex.schema.createTable("carts", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table
      .bigInteger("customerId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table
      .bigInteger("storeId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");  
    table
      .bigInteger("storeItemId")
      .references("store_items.id")
      .unsigned()
      .onDelete("CASCADE");  
    table.integer("quantity");  
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("carts");

exports.up = (knex) =>
  knex.schema.createTable("store_items", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table
      .bigInteger("storeId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table.string("name");
    table.string("image");
    table.text("description");
    table.decimal("price", 15, 2);
    table.boolean("isSpecial").defaultTo(false);;
    table.enum('categoryId', [1, 2, 3])
    table.string("cuisineIds");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("store_items");

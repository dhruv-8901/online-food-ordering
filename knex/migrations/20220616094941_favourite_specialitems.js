exports.up = (knex) =>
  knex.schema.createTable("favourite_specialitems", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table
      .bigInteger("userId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table
      .bigInteger("specialItemId")
      .references("special_items.id")
      .unsigned()
      .onDelete("CASCADE");
    table.bigInteger("type").defaultTo(1);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("favourite_specialitems");

exports.up = (knex) =>
  knex.schema.createTable("feedbacks", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table
      .bigInteger("storeId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table
      .bigInteger("userId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table.float('rating')
    table.text("review");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("feedbacks");

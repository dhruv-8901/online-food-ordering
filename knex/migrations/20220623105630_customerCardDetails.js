exports.up = (knex) =>
  knex.schema.createTable("customer_card_details", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table
      .bigInteger("customerId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table.string("cardToken");
    table.string("cardId");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("customer_card_details");


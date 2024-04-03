exports.up = (knex) =>
  knex.schema.createTable("order_payment_details", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table
      .bigInteger("orderId")
      .references("orders.id")
      .unsigned()
      .onDelete("CASCADE");
    table
      .bigInteger("storeId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table
      .bigInteger("customerId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table
      .string("cardId")
    // .references("customer_card_details.cardId")
    // .unsigned()
    // .onDelete("CASCADE");
    table.string("paymentMethodId");
    table.string("paymentIntentId");
    table.string("status");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("order_payment_details");

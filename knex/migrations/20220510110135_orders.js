exports.up = (knex) =>
  knex.schema.createTable("orders", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table.string("orderNumber");
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
      .bigInteger("addressId")
      .references("customer_addresses.id")
      .unsigned()
      .onDelete("CASCADE");
    table
      .integer("status")
      .comment(
        "0-Pending, 1-order accept by store, -1 -Reject order , 2- Preparing, 3- On The Way, 4- Delivered, 5-canceled"
      ).defaultTo(0);
    table.float("total");
    table.float("charges").comment("like Tax and ordering charges");
    table
      .bigInteger("offerId")
      .references("offers.id")
      .unsigned()
      .onDelete("CASCADE");
    table.float("grandTotal");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("orders");

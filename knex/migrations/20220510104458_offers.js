exports.up = (knex) =>
  knex.schema.createTable("offers", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table.string("name");
    table.string("couponCode");
    table.integer("discount").comment("in Percentage");
    table.integer("minOrderValue");
    table.integer("maxDiscountValue");
    table.timestamp("offerFrom").comment("Offer Starting Date");
    table.timestamp("offerUntil").comment("Offer Ending Date");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("offers");

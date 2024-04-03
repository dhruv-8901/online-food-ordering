exports.up = (knex) =>
  knex.schema.createTable("fcm_tokens", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table
      .bigInteger("userId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table.string("token");
    table.string("deviceId");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("fcm_tokens");

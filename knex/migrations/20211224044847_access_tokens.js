exports.up = (knex) =>
  knex.schema.createTable("access_tokens", (table) => {
    table.string("id").primary();
    table
      .bigInteger("userId")
      .references("users.id")
      .unsigned()
      .onDelete("CASCADE");
    table.boolean("revoked").defaultTo(false);
    table.timestamp("expiresAt");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("access_tokens");

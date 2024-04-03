exports.up = (knex) =>
  knex.schema.createTable("refresh_tokens", (table) => {
    table.string("id").primary();
    table
      .string("accessTokenId")
      .references("access_tokens.id")
      .onDelete("CASCADE");
    table.boolean("revoked").defaultTo(false);
    table.timestamp("expiresAt");
  });

exports.down = (knex) => knex.schema.dropTable("refresh_tokens");

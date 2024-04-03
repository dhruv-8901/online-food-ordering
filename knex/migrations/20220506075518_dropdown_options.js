exports.up = (knex) =>
  knex.schema.createTable("dropdown_options", (table) => {
    table.bigIncrements("id").unsigned().primary();
    table.string('name')
    table
      .bigInteger("parentId")
      .references("dropdown_options.id")
      .unsigned()
      .onDelete("CASCADE");
    table
      .bigInteger("dropdownId")
      .references("dropdowns.id")
      .unsigned()
      .onDelete("CASCADE");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("dropdown_options");

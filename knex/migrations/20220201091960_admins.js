exports.up = (knex) =>
  knex.schema
    .createTable("admins", (table) => {
      table.bigIncrements("id").unsigned().primary();
      table.string("name");
      table.string("email");
      table.string("password").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .then(async function () {
      return knex("admins").insert([
        {
          name: "Admin",
          email: "admin@foodordering.com",
          password:
            "$2a$10$ekIuMxNsceBXqXETQYsgteKw.UCCoLOwDmbEBqpMGCLML0YPLvNEi", //admin^FD$2FWLbP
        },
      ]);
    });

exports.down = (knex) => knex.schema.dropTable("admins");

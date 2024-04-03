exports.up = (knex) =>
  knex.schema
    .createTable("app_versions", (table) => {
      table.bigIncrements("id").unsigned().primary();
      table.string("minVersion");
      table.string("currentVersion");
      table.string("type");
      table.string("appLink").nullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .then(async function () {
      return knex("app_versions").insert([
        {
          id: 1,
          minVersion: "1.0",
          currentVersion: "1.0",
          type: "iOS",
          appLink: "",
        },
        {
          id: 2,
          minVersion: "1.0",
          currentVersion: "1.0",
          type: "Android",
          appLink: "",
        },
      ]);
    });

exports.down = (knex) => knex.schema.dropTable("app_versions");

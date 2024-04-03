exports.up = function (knex, Promise) {
  return knex.schema.table("users", function (t) {
    t.integer("preparationTime")
      .comment("Estimated preparation time for an order by the store")
      .nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("users", function (t) {
    t.dropColumn("preparationTime");
  });
};

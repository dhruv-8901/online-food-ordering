exports.up = function (knex, Promise) {
  return knex.schema.table("store_items", function (t) {
    t.timestamp("valid_from");
    t.timestamp("valid_until");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("store_items", function (t) {
    t.dropColumn("valid_from");
    t.dropColumn("valid_until");
  });
};

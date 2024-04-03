exports.up = function (knex, Promise) {
  return knex.schema.table("store_items", function (t) {
    t.timestamp("deletedAt").nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("store_items", function (t) {
    t.dropColumn("deletedAt");
  });
};

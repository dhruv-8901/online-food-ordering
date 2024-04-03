exports.up = function (knex, Promise) {
  return knex.schema.table("favourite_stores", function (t) {
    t.bigInteger("type").defaultTo(0);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("favourite_stores", function (t) {
    t.dropColumn("type");
  });
};

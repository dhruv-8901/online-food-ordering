exports.up = function (knex, Promise) {
  return knex.schema.table("favourite_storeitems", function (t) {
    t.bigInteger("type").defaultTo(1);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("favourite_storeitems", function (t) {
    t.dropColumn("type");
  });
};

exports.up = function (knex, Promise) {
  return knex.schema.table("users", function (t) {
    t.string("bgImage").comment("background image only for store");
    t.string("storeCountryCode");
    t.string("storeContactNumber");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("users", function (t) {
    t.dropColumn("bgImage");
  });
};

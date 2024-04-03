exports.up = function (knex, Promise) {
  return knex.schema.table("customer_card_details", function (t) {
    t.timestamp("deletedAt").nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("customer_card_details", function (t) {
    t.dropColumn("deletedAt");
  });
};

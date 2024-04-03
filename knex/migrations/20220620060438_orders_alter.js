exports.up = function (knex, Promise) {
  return knex.schema.table("orders", function (t) {
    t.text("orderingInstruction").nullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("orders", function (t) {
    t.dropColumn("orderingInstruction");
  });
};

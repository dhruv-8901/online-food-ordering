exports.up = function (knex, Promise) {
  return knex.schema.table("users", function (t) {
    t.integer("isPaymentDetails")
      .defaultTo(3)
      .comment("1 = Approved, 2 = details Required , 3 = Pending");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("users", function (t) {
    t.dropColumn("isPaymentDetails");
  });
};

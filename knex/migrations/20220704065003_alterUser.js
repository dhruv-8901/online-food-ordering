exports.up = function (knex, Promise) {
  return knex.schema.table("users", function (t) {
    t
      .integer("isApproved")
      .defaultTo(3)
      .comment("1 = Approved, 2 = Reject , 3 = Pending");
    t.integer("profileStatus")
      .defaultTo(0)
      .comment("1 = stepOne, 2 = stepTwo , 3 = stepThree");  
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("users", function (t) {
    t.dropColumn("isApproved");
    t.dropColumn("profileStatus");
  });
};

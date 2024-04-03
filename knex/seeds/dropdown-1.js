
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('dropdowns').del()
    .then(function () {
      // Inserts seed entries
      return knex('dropdowns').insert([
        { id: 1, name: 'category' },
        { id: 2, name: 'cuisines' },
      ]);
    });
};

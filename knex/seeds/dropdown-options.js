
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('dropdown_options').del()
    .then(function () {
      // Inserts seed entries
      return knex("dropdown_options").insert([
        { id: 1, dropdownId: 1, name: "Veg" },
        { id: 2, dropdownId: 1, name: "Non-Veg" },
        { id: 3, dropdownId: 1, name: "Vegan" },
        { id: 4, dropdownId: 2, name: "American" },
        { id: 5, dropdownId: 2, name: "Asian" },
        { id: 6, dropdownId: 2, name: "Fast Food" },
        { id: 7, dropdownId: 2, name: "Italian" },
        { id: 8, dropdownId: 2, name: "Thai" },
      ]);
    });
};

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('googleId');
    }),
    knex.schema.createTable('M001_temp', (table) => {
      table.increments();
      table.string('date');
      table.float('temperature');
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('M001_temp'),
  ]);
};

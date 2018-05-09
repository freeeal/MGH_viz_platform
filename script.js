const fs = require('fs');
const path = require('path');

const tempDirectory = 'data/E4/TEMP/';
var names = [];

exports.up = function(knex, Promise) {
  let migrationPromises = [];

  fs.readdir(tempDirectory, function(err, files) {
    if (err) {
      console.error('Could not list the dirrectory.', err);
      process.exit(1);
    }

    for (var file in files) {
      names.push(file);
      migrationPromises.push(
        knex.schema.createTable(file, (table) => {
          table.increments();
          table.string('date');
          table.float('temperature');
        })
      );
    }
  })
  return Promise.all(migrationPromises);
};

exports.down = function(knex, Promise) {
  let promises = [];
  for (var file in names) {
    promises.push(
      knex.schema.dropTable(file);
    )
  }
  return Promise.all(promises);
};

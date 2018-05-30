const fs = require('fs');
const path = require('path');

const accDirectory = 'data/E4/ACC/';

exports.up = function(knex, Promise) {
  let migrationPromises = new Array();
  return new Promise(function(resolve, reject) {
    fs.readdir(accDirectory, function(err, files) {
      if (err) {
        console.error('Could not list the directory.', err);
        reject();
        process.exit(1);
      }

      for (index=0; index<files.length; index++) {
        let file = files[index];
        let i = file.indexOf('.');
        let name = file.substring(0, i);
        migrationPromises.push(
          knex.schema.createTable(name, (table) => {
            table.string('date').primary();
            table.float('acc_vector');
          })
        )
      }
      resolve();
    })
  })
  .then(() => {
    return Promise.all(migrationPromises);
  })
};

exports.down = function(knex, Promise) {
  let migrationPromises = new Array();
  return new Promise(function(resolve, reject) {
    fs.readdir(accDirectory, function(err, files) {
      if (err) {
        console.error('Could not list the directory.', err);
        reject();
        process.exit(1);
      }

      for (index=0; index<files.length; index++) {
        let file = files[index];
        let i = file.indexOf('.');
        let name = file.substring(0, i);
        migrationPromises.push(
          knex.schema.dropTable(name)
        );
      }
      resolve();
    });
  })
  .then(() => {
    return Promise.all(migrationPromises);
  });
};

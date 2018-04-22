const knex = require('./knex');

module.exports = {
  findUserById: (profileId) => {
    return knex('users')
      .select()
      .where({ googleId: profileId })
      .first();
  },

  createUser: (profileId) => {
    return knex('users')
      .insert({ googleId: profileId });
  }
};

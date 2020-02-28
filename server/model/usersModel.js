const schema = require('./schema');

class Users {
  /**
   * @description - This function checks if particular user has already registered using email id
   * @param {object} email - email id of the user to check
   */
  checkIfUserExists(email) {
    const users = schema.users.find({
      email: email,
    });
    return users;
  }

  /**
   * @description - This function create new user document in the database
   * @param {object} userData - user data
   */
  createUser(userData) {
    const user = new schema.users({
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      password: userData.password,
    });
    return user;
  }

  /**
   * @description - This function get the user data from database to login user.
   * @param {object} userData - user details object
   */
  loginUser(userData) {
    const users = schema.users.find({
      email: userData.email,
      password: userData.password,
    });
    return users;
  }
}

module.exports = Users;

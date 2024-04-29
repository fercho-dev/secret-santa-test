/**
 * Service class for user management.
 * Handles user validation, information retrieval, and actions like initializing or canceling Secret Santa.
 */
import DB from '../model/DB/DB.class';
import User from '../model/Users/User.class';

class UsersService {
  #username
  #db
  #user

  /**
   * Constructs a UsersService instance.
   * Validates the user from the database and initializes the user object if valid.
   * @param {string} username - The username of the user to manage.
   */
  constructor(username) {
    this.#username = username;
    this.#db = DB.getInstance();
    if(this.#db.validateUser(username)) {
      let userInfo = this.#db.getUser(username);
      userInfo = this.#db.getFamilyMemberByUsername(userInfo.family_id, username);
      this.#user = new User(userInfo.username, userInfo.id, userInfo.family_id);
    } else {
      this.#user = "no user";
    }
  }

  get username() {
    return this.#username;
  }

  get user() {
    return this.#user;
  }

  /**
   * Validates if the stored user object is a valid user.
   * @returns {boolean} True if the user is valid, otherwise false.
   */
  validUser() {
    if(this.#user !== "no user") {
      return true
    }
    return false
  }

  /**
   * Retrieves user information in JSON format.
   * @returns {Object} JSON representation of the user.
   */
  getUserInfo() {
    return this.#user.toJson();
  }

  /**
   * Processes a specified action related to user functionality.
   * Supported actions include 'initSecretSanta' and 'cancelSecretSanta'.
   * @param {string} action - The action to be processed.
   * @returns {Object} An object containing the result message and status code.
   */
  proccessAction(action) {
    switch (action) {
      case 'initSecretSanta':
        try {
          if(this.#user.initSecretSanta()) {
            return {
              message: 'secret santa initialized',
              status: 200
            };
          } else {
            return {
              message: 'error initializing secret santa',
              status: 500
            };
          }
        } catch (error) {
          return { message: error.message, status: 400 };
        }
        case 'cancelSecretSanta':
          try {
            if(this.#user.cancelSecretSanta()) {
              return {
                message: 'secret santa canceled',
                status: 200
              };
            } else {
              return {
                message: 'error initializing secret santa',
                status: 500
              };
            }
          } catch (error) {
            return { message: error.message, status: 400 };
          }
      default:
        return { message: 'action not valid', status: 400 };
    }
  }
}

export default UsersService;
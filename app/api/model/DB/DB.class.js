/**
 * Singleton class for database interactions.
 * Ensures only one instance of the database is created throughout the app.
 */

import { dbData } from "./data";

class DB {
  static instance = null
  #data

  constructor() {
    if (DB.instance) {
      throw new Error("You can only create one instance of DB!");
    }
    this.#data = dbData;
    DB.instance = this;
  }

  static getInstance() {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  get data() {
    return this.#data
  }

  /**
   * Validates a user by username.
   * @param {string} username - Username to validate.
   * @returns {boolean} True if the username exists, otherwise false.
   */
  validateUser(username) {
    for(let user of this.data.users) {
      if(user.username === username) {
        return true
      }
    }
    return false
  }

  /**
   * Retrieves a user object by username.
   * @param {string} username - The username of the user.
   * @returns {Object|null} The user object if found, otherwise null.
   */
  getUser(username) {
    for(let user of this.data.users) {
      if(user.username === username) {
        return user
      }
    }
    return null
  }

  /**
   * Retrieves a family object by its ID.
   * @param {number} id - The ID of the family.
   * @returns {Object|null} The family object if found, otherwise null.
   */
  getFamily(id) {
    for(let family of this.data.families) {
      if(family.id === id) {
        return family
      }
    }
    return null
  }

  /**
   * Updates a family object with new data.
   * @param {Object} newFamily - The new data for the family.
   * @returns {boolean} True if the family was updated successfully, otherwise false.
   */
  updateFamily(newFamily) {
    for (let i = 0; i < this.data.families.length; i++) {
      if (this.data.families[i].id === newFamily.id) {
        this.data.families[i] = {...this.data.families[i], ...newFamily};
        return true;
      }
    }
    return false;
  }

  /**
   * Retrieves a family member by username within a specific family.
   * @param {number} famId - The ID of the family.
   * @param {string} username - The username of the family member.
   * @returns {Object|null} The family member if found, otherwise null.
   */
  getFamilyMemberByUsername(famId, username) {
    for (let family of this.data.families) {
      if (family.id === famId) {
        for (let member of family.members) {
          if (member.username === username) {
            return member;
          }
        }
        break
      }
    }
    return null;
  }

  /**
   * Retrieves a family member by their ID within a specific family.
   * @param {number} famId - The ID of the family.
   * @param {number} memberId - The ID of the member.
   * @returns {Object|null} The family member if found, otherwise null.
   */
  getFamilyMemberById(famId, memberId) {
    for (let family of this.data.families) {
      if (family.id === famId) {
        for (let member of family.members) {
          if (member.id === memberId) {
            return member;
          }
        }
        break
      }
    }
    return null;
  }

  /**
   * Updates the list of family members for a specific family.
   * @param {number} familyId - The ID of the family.
   * @param {Array} newMembers - Array of new member objects to replace existing members.
   * @returns {boolean} True if the members were updated successfully, otherwise false.
   */
  updateFamilyMembers(familyId, newMembers) {
    for (let family of this.data.families) {
      if (family.id === familyId) {
        family.members = newMembers;
        return true;
      }
    }
    return false;
  }

  /**
   * Updates a specific family member's details.
   * @param {number} familyId - The ID of the family.
   * @param {number} memberId - The ID of the member.
   * @param {Object} newMember - New data for the member.
   * @returns {boolean} True if the member was updated successfully, otherwise false.
   */
  updateFamilyMember(familyId, memberId, newMember) {
    for (let family of this.data.families) {
      if (family.id === familyId) {
        for (let i = 0; i < family.members.length; i++) {
          if (family.members[i].id === memberId) {
            family.members[i] = {...family.members[i], ...newMember};
            return true;
          }
        }
        break
      }
    }
    return false;
  }

  /**
   * Generates the next possible member ID for a family.
   * @param {number} famId - The ID of the family.
   * @returns {number} The next possible ID for a new family member.
   */
  getNextPosibleId(famId) {
    for(let family of this.data.families) {
      if(family.id === famId) {
        return family.members.length + 1
      }
    }
  }
}

export default DB;
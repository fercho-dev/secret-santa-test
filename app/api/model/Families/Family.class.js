/**
 * Class representing a family with members and shared activities.
 * Utilizes a singleton database instance for all data interactions.
 */

import DB from '../DB/DB.class';

class Family {
  #id
  #name
  #members
  #db
  #activeSecretSanta

  constructor(id) {
    this.#id = id;
    this.#db = DB.getInstance();
    let dbdata = this.#db.getFamily(id)
    this.#name = dbdata.name;
    this.#members = dbdata.members;
    this.#activeSecretSanta = dbdata.activeSecretSanta;
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get members() {
    return this.#members;
  }

  get activeSecretSanta() {
    return this.#activeSecretSanta;
  }

  /**
   * Updates family details in the database and locally if successful.
   * @param {Object} newFamily - The new data for the family.
   * @returns {boolean} True if update was successful, false otherwise.
   */
  updateFamily(newFamily) {
    if(this.#db.updateFamily(newFamily)) {
      this.#id = newFamily.id;
      this.#name = newFamily.name;
      this.#members = newFamily.members;
      return true;
    }
    return false
  }

  /**
   * Retrieves a member by username.
   * @param {string} username - The username of the member.
   * @returns {Object|null} The member object if found, otherwise null.
   */
  getMemberByUsername(username) {
    for (let member of this.#members) {
      if (member.username === username) {
        return member;
      }
    }
    return null;
  }

  /**
   * Retrieves a member by ID.
   * @param {number} id - The unique identifier of the member.
   * @returns {Object|null} The member object if found, otherwise null.
   */
  getMemberById(id) {
    for (let member of this.#members) {
      if (member.id === id) {
        return member;
      }
    }
    return null;
  }

  /**
   * Updates the list of members for this family in the database and locally.
   * @param {Array} newMembers - The new list of family members.
   * @returns {boolean} True if the update was successful, false otherwise.
   */
  updateMembers(newMembers) {
    if(this.#db.updateFamilyMembers(this.#id, newMembers)) {
      this.#members = newMembers;
      return true;
    }
    return false;
  }

  /**
   * Updates a specific family member's details.
   * @param {number} memberId - The unique identifier for the member.
   * @param {Object} newMember - The updated member data.
   * @returns {boolean} True if the update was successful, false otherwise.
   */
  updateOneMember(memberId, newMember) {
    if(this.#db.updateFamilyMember(this.#id, memberId, newMember)) {
      this.#members = this.#members.map(member => {
        if(member.id === memberId) {
          return newMember;
        }
        return member;
      });
      return true;
    }
    return false;
  }

  /**
   * Adds a new member to the family, assigning a unique ID automatically.
   * @param {Object} newMember - The new member to be added.
   * @returns {boolean} True if the member was added successfully, false otherwise.
   */
  addMember(newMember) {
    const nextId = this.#db.getNextPosibleId(this.#id);
    newMember = {...newMember, id: nextId, family_id: this.#id}
    this.#members.push(newMember);
    if(this.updateMembers(this.#members)) {
      return true;
    }
    return false;
  }
  
  /**
   * Activates the Secret Santa event for this family.
   */
  activateSecretSanta() {
    this.#activeSecretSanta = true;
  }

  /**
   * Deactivates the Secret Santa event for this family.
   */
  deactivateSecretSanta() {
    this.#activeSecretSanta = false;
  }

  /**
   * Serializes the family data to JSON format.
   * @returns {Object} A JSON representation of the family.
   */
  toJson() {
    return {
      id: this.#id,
      name: this.#name,
      members: this.#members,
      activeSecretSanta: this.#activeSecretSanta
    }
  }
}

export default Family;
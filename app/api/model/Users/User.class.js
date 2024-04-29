/**
 * Class representing a user, extending the functionality of FamilyMember.
 * Includes user-specific properties and methods, such as username and Secret Santa functionalities.
 */
import FamilyMember from "../FamilyMembers/FamilyMember.class";
import { shuffleForSecretSanta, asignSecretSantas } from "../../utils/secretsanta";

class User extends FamilyMember {
  #username

  /**
   * Constructs a User instance, initializing with a username and extending FamilyMember.
   * @param {string} username - The username of the user.
   * @param {number} id - The unique identifier of the family member.
   * @param {number} familyId - The identifier of the family this member belongs to.
   */
  constructor(username, id, familyId) {
    super(id, familyId)
    this.#username = username;
  }

  get username() {
    return this.#username;
  }

  /**
   * Initializes the Secret Santa process for the user's family.
   * Throws an error if Secret Santa is already active.
   * @returns {boolean} True if Secret Santa was successfully initiated, false otherwise.
   */
  initSecretSanta() {
    if(this.family.activeSecretSanta) {
      throw new Error("Secret Santa already initialized");
    }
    let familyMembers = this.family.members;
    try {
      const assignedIds = shuffleForSecretSanta(familyMembers);
      const newMembersState = asignSecretSantas(familyMembers, assignedIds);
      if(this.family.updateMembers(newMembersState)) {
        this.family.activateSecretSanta();
        return true
      }
      return false
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Cancels the Secret Santa event, resetting the Secret Santa state for each member.
   * @returns {boolean} True if Secret Santa was successfully cancelled, false otherwise.
   */
  cancelSecretSanta() {
    // if(!this.family.activeSecretSanta) {
    //   throw new Error("Secret Santa is not active, cannot cancel");
    // }
    let familyMembers = this.family.members;
    try {
      const newMembersState = asignSecretSantas(familyMembers, null);
      if(this.family.updateMembers(newMembersState)) {
        this.family.deactivateSecretSanta();
        return true
      }
      return false
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Serializes the user data to JSON format, including family details.
   * @returns {Object} A JSON representation of the user.
   */
  toJson() {
    return {
      id: this.id,
      username: this.#username,
      familyId: this.familyId,
      family: this.family.toJson()
    }
  }
}

export default User;
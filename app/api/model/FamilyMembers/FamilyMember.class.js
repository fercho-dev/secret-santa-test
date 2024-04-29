/**
 * Class representing a single family member.
 * Manages personal details along with relationships and secret santa history.
 */
import Family from "../Families/Family.class"

class FamilyMember {
  #id
  #name
  #lastname
  #familyid
  #prevSecretSantas
  #immediateFamily
  #currentSecretSanta
  #family

  /**
   * Constructs a FamilyMember instance, fetching their details from the family by member ID.
   * @param {number} id - The unique identifier for the family member.
   * @param {number} familyId - The identifier for the family this member belongs to.
   */

  constructor(id,familyId) {
    this.#id = id;
    this.#familyid = familyId;
    this.#family = new Family(familyId);
    const dbdata = this.#family.getMemberById(id);
    this.#name = dbdata.name;
    this.#lastname = dbdata.lastname;
    this.#prevSecretSantas = dbdata.prevSecretSantas;
    this.#immediateFamily = dbdata.immediateFamily;
    this.#currentSecretSanta = dbdata.currentSecretSanta;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get lastname() {
    return this.#lastname;
  }

  get familyId() {
    return this.#familyid;
  }

  get prevSecretSantas() {
    return this.#prevSecretSantas;
  }

  get immediateFamily() {
    return this.#immediateFamily;
  }

  get currentSecretSanta() {
    return this.#currentSecretSanta;
  }

  get family() {
    return this.#family;
  }
}

export default FamilyMember;
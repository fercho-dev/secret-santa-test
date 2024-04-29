import '@testing-library/jest-dom'

import DB from '../app/api/model/DB/DB.class'
import { dbData } from '../app/api/model/DB/data'

describe('DB class logic', () => {
  let db;
  let usernameTest = 'user123';
  let usernameInvalid = 'invalid';
  let userTest = {
    "username": "user123",
    "family_id": 1
  };
  let familyNameTest = 'Family Test';
  let familyIdTest = 1;
  let newFamilyTest = {
    "id": 1,
    "name": "New Family",
    "activeSecretSanta": false,
    "members": []
  }
  let newMembersTest = []
  let memberIdTest = 1;
  let memberTest = {"id": 1, "name": "User", "lastname": "Tester", "family_id": 1, "prevSecretSantas": [7, 4], "immediateFamily": [], "currentSecretSanta": null, "username": "user123"}

  beforeEach(() => {
    db = DB.getInstance();
  });

  it('the constructor correctly sets the data', () => {
    expect(db.data).toEqual(dbData)
  })
  it('cannot change data', () => {
    const originalData = db.data;
    try {
      db.data = { newData: true };
    } catch (e) {
      // Error catch
    }
    expect(db.data).toEqual(originalData);
  })
  it('validate users correctly', () => {
    const valid = db.validateUser(usernameTest)
    const invalid = db.validateUser(usernameInvalid)
 
    expect(valid).toBeTruthy()
    expect(invalid).toBeFalsy()
  })
  it('returns users correctly', () => {
    const user = db.getUser(usernameTest)
    const notUser = db.getUser(usernameInvalid)
 
    expect(user).toEqual(userTest)
    expect(notUser).toBe(null)
  })
  it('returns family correctly', () => {
    const family = db.getFamily(familyIdTest)

    expect(family.name).toBe(familyNameTest)
  })
  it('return family members correctly', () => {
    const member1 = db.getFamilyMemberByUsername(familyIdTest, usernameTest)
    expect(member1).toEqual(memberTest)

    const member2 = db.getFamilyMemberById(familyIdTest, memberIdTest)
    expect(member2).toEqual(memberTest)
  })
  it('updates family members correctly', () => {
    const family = db.getFamily(familyIdTest)
    expect(family.name).toBe(familyNameTest)

    const updated = db.updateFamilyMembers(familyIdTest, newMembersTest)
    expect(updated).toBeTruthy()

    const newFamily = db.getFamily(familyIdTest)
    expect(newFamily.members).toEqual(newMembersTest)
  })
  it('updates family correctly', () => {
    const family = db.getFamily(familyIdTest)
    expect(family.name).toBe(familyNameTest)

    const updated = db.updateFamily(newFamilyTest)
    expect(updated).toBeTruthy()

    const newFamily = db.getFamily(familyIdTest)
    expect(newFamily).toEqual(newFamilyTest)
  })
})
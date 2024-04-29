import '@testing-library/jest-dom'

import DB from '../app/api/model/DB/DB.class'
import Family from '../app/api/model/Families/Family.class';

describe('Family class logic', () => {
  let db;
  let family
  let familyNameTest = 'Family Test';
  let familyIdTest = 1;
  let userIdTest = 1;
  let usernameTest = 'user123';
  let userTest = {"id": 1, "name": "User", "lastname": "Tester", "family_id": 1, "prevSecretSantas": [7, 4], "immediateFamily": [], "currentSecretSanta": null, "username": "user123"}
  let newMemberTest = {"id": 1, "name": "Another", "lastname": "Person", "family_id": 1, "prevSecretSantas": [4, 8], "immediateFamily": [2, 3], "currentSecretSanta": 4, "username": "user123"}

  beforeEach(() => {
    db = DB.getInstance();
    family = new Family(familyIdTest)
  });

  it('the constructor correctly sets the data', () => {
    expect(family.id).toBe(familyIdTest);
    expect(family.name).toBe(familyNameTest);
    expect(family.members).toEqual(db.getFamily(familyIdTest).members);
  })
  it('gets member info correctly', () => {
    const member1 = family.getMemberByUsername(usernameTest)
    expect(member1).toEqual(userTest);

    const member2 = family.getMemberById(userIdTest)
    expect(member2).toEqual(userTest);
  })
  it('updates one member info correctly', () => {
    const updated = family.updateOneMember(userIdTest, newMemberTest)
    expect(updated).toBe(true);

    const member = family.getMemberById(userIdTest)
    expect(member).toEqual(newMemberTest);

    const member2 = db.getFamilyMemberById(family.id, userIdTest)
    expect(member2).toEqual(newMemberTest);
  })
})
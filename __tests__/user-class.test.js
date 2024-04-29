import '@testing-library/jest-dom'

import User from '../app/api/model/Users/User.class';

describe('User class logic', () => {
  let user;
  //let db;
  let familyIdTest = 1;
  let userIdTest = 1;
  let usernameTest = 'user123';
  let userNameToTest = 'User'
  let userLastnameToTest = 'Tester'

  beforeEach(() => {
    user = new User(usernameTest, userIdTest, familyIdTest)
  });

  it('the constructor correctly sets the data', () => {
    expect(user.name).toBe(userNameToTest);
    expect(user.lastname).toBe(userLastnameToTest);
  })
  it('asign secret santas correctly', () => {
    // for true
    //expect(() => user.initSecretSanta()).toThrow(errorMessage);

    //for false
    const res = user.initSecretSanta()
    expect(res).toBe(true);
  })
})
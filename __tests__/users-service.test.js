import '@testing-library/jest-dom'

import UsersService from '../app/api/services/Users.service';

describe('Users service class logic', () => {
  let service;
  const usernameTest = 'user123';
  const usernameToError = 'nouser';
  const action = 'initSecretSanta';
  const actionToError = 'invalidAction';

  beforeEach(() => {
    service = new UsersService(usernameTest)
  });

  it('the constructor correctly sets the data with valid username', () => {
    const res = service.validUser()
    expect(res).toBe(true);
  })
  it('the constructor sets no user for invalid username', () => {
    const badservice = new UsersService(usernameToError)
    const res = badservice.validUser()
    expect(res).toBe(false);
  })
  it('handles action initSecretSanta', () => {
    const res = service.proccessAction(action);
    expect(res.status).toBe(200);
  })
  it('handles invalid action initSecretSanta', () => {
    const res = service.proccessAction(actionToError);
    expect(res.status).toBe(400);
  })
})
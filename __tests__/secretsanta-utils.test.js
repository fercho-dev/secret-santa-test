import '@testing-library/jest-dom'

import { shuffleForSecretSanta, asignSecretSantas } from "../app/api/utils/secretsanta";

describe('secretsanta utils functions', () => {
  it('correctly shuffles members', () => {
    const members = [
      { id: 1, prevSecretSantas: [], immediateFamily: [], username: 'user1' },
      { id: 2, prevSecretSantas: [], immediateFamily: [], username: 'user2' },
      { id: 3, prevSecretSantas: [], immediateFamily: [], username: 'user3' }
    ];
  
    const assignments = shuffleForSecretSanta(members);
    expect(assignments).toHaveLength(members.length);
    expect(new Set(assignments).size).toBe(members.length);
    expect(assignments).not.toContain(undefined);
  });
  it('returns null when shuffle is not posible for immediate family members restrictions', () => {
    const members = [
      { id: 1, prevSecretSantas: [], immediateFamily: [2], username: 'user1' },
      { id: 2, prevSecretSantas: [], immediateFamily: [1], username: 'user2' },
      { id: 3, prevSecretSantas: [], immediateFamily: [1, 2], username: 'user3' }
    ];
  
    const assignments = shuffleForSecretSanta(members);
    expect(assignments).toBeNull();
  });
  it('returns null when shuffle is not posible for previous Secret Santas restrictions', () => {
    const members = [
      { id: 1, prevSecretSantas: [2, 3], immediateFamily: [], username: 'user1' },
      { id: 2, prevSecretSantas: [1, 3], immediateFamily: [], username: 'user2' },
      { id: 3, prevSecretSantas: [1, 2], immediateFamily: [], username: 'user3' }
    ];

    const assignments = shuffleForSecretSanta(members);
    expect(assignments).toBeNull();
  });
  it('assign Secret Santas to each member', () => {
    const members = [
      { id: 1, name: 'Alice', currentSecretSanta: null },
      { id: 2, name: 'Bob', currentSecretSanta: null },
      { id: 3, name: 'Charlie', currentSecretSanta: null }
    ];
    const assignedIds = [2, 3, 1];
  
    const updatedMembers = asignSecretSantas(members, assignedIds);
    expect(updatedMembers).toEqual([
      { id: 1, name: 'Alice', currentSecretSanta: 2 },
      { id: 2, name: 'Bob', currentSecretSanta: 3 },
      { id: 3, name: 'Charlie', currentSecretSanta: 1 }
    ]);
  });
  it('throw an error when a member is assigned as their own Secret Santa', () => {
    const members = [
      { id: 1, name: 'Alice', currentSecretSanta: null },
      { id: 2, name: 'Bob', currentSecretSanta: null }
    ];
    const assignedIds = [1, 2];
  
    expect(() => asignSecretSantas(members, assignedIds)).toThrow("No valid assignment found.");
  });
  it('should handle null assignments by setting each member\'s currentSecret Santa to null', () => {
    const members = [
      { id: 1, name: 'Alice', currentSecretSanta: 3 },
      { id: 2, name: 'Bob', currentSecretSanta: 1 },
      { id: 3, name: 'Charlie', currentSecretSanta: 2 }
    ];
    const assignedIds = null;
  
    const updatedMembers = asignSecretSantas(members, assignedIds);
    expect(updatedMembers).toEqual([
      { id: 1, name: 'Alice', currentSecretSanta: null },
      { id: 2, name: 'Bob', currentSecretSanta: null },
      { id: 3, name: 'Charlie', currentSecretSanta: null }
    ]);
  });
});
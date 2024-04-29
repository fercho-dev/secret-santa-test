/**
 * Shuffles an array.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} The shuffled array.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Recursively finds a valid Secret Santa assignment for each member.
 * Ensures no member is assigned to themselves, their immediate family, or previous Secret Santas.
 * @param {Array} members - The list of members participating in Secret Santa.
 * @param {Array} assignments - Accumulator for current valid assignments.
 * @param {number} index - Current index in the members array.
 * @returns {Array|null} An array of assigned member IDs, or null if no valid assignment is found.
 */
function findSecretSanta(members, assignments = [], index = 0) {
  if (index === members.length) {
    return assignments.slice();
  }

  const currentMember = members[index];
  for (let i = 0; i < members.length; i++) {
      const candidate = members[i];
      if (candidate.id !== currentMember.id &&
          !currentMember.immediateFamily.includes(candidate.id) &&
          !currentMember.prevSecretSantas.includes(candidate.id)) {
          if (!assignments.includes(candidate.id)) {
              assignments.push(candidate.id);
              const result = findSecretSanta(members, assignments, index + 1);
              if (result) {
                  return result;
              }
              assignments.pop();
          }
      }
  }
  return null;
}

/**
 * Prepares and attempts to find a valid Secret Santa assignment for all members.
 * @param {Array} members - The list of members participating.
 * @returns {Array|null} An array of assigned member IDs, or null if no assignment is possible.
 */
function shuffleForSecretSanta(members) {
  const shuffledMembers = shuffle(members);
  return findSecretSanta(shuffledMembers);
}

// function shuffleForSecretSanta(members, index=0, assignments=[]) {
//   const maxAttempts = 1000;
//   let attempts = 0;
  
//   while (attempts < maxAttempts) {
//     let candidates = members.map(member => member.id);
//     let assignments = new Array(members.length);
//     let valid = true;
    
//     for (let i = 0; i < members.length; i++) {
//       const giver = members[i];
//       const possibleReceivers = candidates.filter(id => 
//         id !== giver.id && 
//         !giver.prevSecretSantas.includes(id) &&
//         !giver.immediateFamily.includes(id)
//       );

//       if (possibleReceivers.length === 0) {
//         valid = false;
//         break;
//       }

//       let receiverIndex = Math.floor(Math.random() * possibleReceivers.length);
//       assignments[i] = possibleReceivers[receiverIndex];
//       candidates = candidates.filter(id => id !== possibleReceivers[receiverIndex]);
//     }

//     if (valid) {
//       return assignments;
//     }

//     attempts++;
//   }
//   return null
// }

/**
 * Assigns Secret Santa to each member based on a list of assigned IDs.
 * Resets Secret Santa if no IDs are provided or updates members with their assigned Secret Santa.
 * @param {Array} members - List of members.
 * @param {Array|null} assignedIds - List of assigned member IDs for Secret Santa.
 * @returns {Array} An array of members with updated Secret Santa assignments.
 */
function asignSecretSantas(members, assignedIds) {
  if (!assignedIds) {
    return members.map(member => ({
      ...member,
      currentSecretSanta: null
    }));
  }
  
  if (members.length !== assignedIds.length) {
    throw new Error("The number of members and assigned IDs must match.");
  }

  const updatedMembers = members.map((member, index) => {
    const secretSantaId = assignedIds[index];
    if (member.id === secretSantaId) {
      throw new Error("No valid assignment found.");
    }
    return {
      ...member,
      currentSecretSanta: secretSantaId
    };
  });

  return updatedMembers;
}

export { shuffleForSecretSanta, asignSecretSantas };
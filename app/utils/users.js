/**
 * Retrieves detailed information for a specific user from their family data.
 * Searches through family members and returns the matching member's data.
 * @param {object} userFamilyInfo - Object containing the user's family information.
 * @returns {object|null} Member's information if found, otherwise null.
 */
export function getUserOnlyInfo(userFamilyInfo) {
  for(let member of userFamilyInfo.family.members) {
    if(member.id === userFamilyInfo.id) {
      return member
    }
  }
  return null
}

/**
 * Retrieves the name of the user's assigned Secret Santa.
 * Searches through the user's family members to find the assigned Secret Santa and returns their name.
 * @param {object} user - The user object with current Secret Santa ID.
 * @param {object} userFamilyInfo - Object containing the user's family information.
 * @returns {string|null} The name of the Secret Santa if found, otherwise null.
 */
export function getSecretSantaFor(user, userFamilyInfo) {
  for(let member of userFamilyInfo.family.members) {
    if(member.id === user.currentSecretSanta) {
      return `${member.name} ${member.lastname}`
    }
  }
  return null
}

/**
 * Retrieves the name of the Secret Santa assigned to a specific member by ID.
 * Searches through the family members and returns the name of the member with the specified ID.
 * @param {number} id - The ID of the Secret Santa to find.
 * @param {object} userFamilyInfo - Object containing the family information.
 * @returns {string|null} The name of the Secret Santa if found, otherwise null.
 */
export function getSecretSantaForById(id, userFamilyInfo) {
  for(let member of userFamilyInfo.family.members) {
    if(member.id === id) {
      return `${member.name} ${member.lastname}`
    }
  }
  return null
}
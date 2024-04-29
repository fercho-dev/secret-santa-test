"use client"
import { getSecretSantaForById } from '../utils/users'

/**
 * FamilyMembersList component renders a list of family members and their assigned Secret Santas.
 * It utilizes utility functions to fetch the name of each member's Secret Santa.
 *
 * @param {object} userFamilyInfo - Contains information about the user's family and members.
 * @returns {JSX.Element} The rendered list of family members with their Secret Santas.
 */
export default function FamilyMembersList({ userFamilyInfo }) {
  return (
    <details className="my-8">
      <summary className="bg-green-200 p-2 text-sm cursor-pointer">My Family's secret santas...</summary>
      <ul className="py-2 px-6 flex flex-col gap-2">
        {/* Map over sorted family members to render each member and their Secret Santa. */}
        {userFamilyInfo.family.members.sort((a, b) => a.id - b.id).map((member) => (
          <li key={member.id} className="border-b border-gray-200">
            <span className='font-medium'>{member.name} {member.lastname}</span>
            <span className='text-xs text-gray-600'> gives to: </span>
            <span className='text-sm'>
              {getSecretSantaForById(member.currentSecretSanta, userFamilyInfo)}
            </span>
          </li>
        ))}
      </ul>
    </details>
  )
}
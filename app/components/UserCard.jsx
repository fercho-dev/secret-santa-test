"use client"
import { useState } from 'react';
import { getUserOnlyInfo, getSecretSantaFor } from '../utils/users'
import FamilyMembersList from './FamilyMembersList'

/**
 * UserCard component that displays user details, Secret Santa assignments, and controls for managing these assignments.
 * It also displays a list of family members and their respective Secret Santas.
 *
 * @param {object} userFamilyInfo - The family information, including all members.
 * @param {function} setUserFamilyInfo - Function to update the family information in the state.
 * @returns {JSX.Element} The rendered component with user details and controls.
 */
export default function UserCard({ userFamilyInfo, setUserFamilyInfo }) {
  const userInit = getUserOnlyInfo(userFamilyInfo)
  const [user, setUser] = useState(userInit);
  let secretSantaForInit = null
  if(userInit.currentSecretSanta) {
    secretSantaForInit = getSecretSantaFor(userInit, userFamilyInfo)
  }
  const [secretSantaFor, setSecretSantaFor] = useState(secretSantaForInit);

  /**
   * Handles the initiation of Secret Santa assignments by making a POST request to the server.
   */
  const asignSecretSantas = async () => {
    try {
      const response = await fetch(`/api/users?username=${user.username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'initSecretSanta' }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(`Error: ${data.message}`);
      } else {
        let newFamilyInfo = data;
        let newUserInfo = getUserOnlyInfo(newFamilyInfo)
        setUser(newUserInfo);
        setSecretSantaFor(getSecretSantaFor(newUserInfo, newFamilyInfo));
        setUserFamilyInfo(newFamilyInfo);
      }
    } catch (error) {
      alert(`Error: ${error}`)
    }
  };

  /**
   * Handles the cancellation of the current Secret Santa assignment by making a POST request.
   */
  const cancelSecretSanta = async () => {
    try {
      const response = await fetch(`/api/users?username=${user.username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'cancelSecretSanta' }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(`Error: ${data.message}`);
      } else {
        let newFamilyInfo = data;
        let newUserInfo = getUserOnlyInfo(newFamilyInfo)
        setUser(newUserInfo);
        setSecretSantaFor(getSecretSantaFor(newUserInfo, newFamilyInfo));
        setUserFamilyInfo(newFamilyInfo);
      }
    } catch (error) {
      alert(`Error: ${error}`)
    }
  }

  return (
    <section className='my-8'>
      <h2 className='text-lg text-center my-4'>🎄 Welcome back, <br/> {user.name} {user.lastname}!</h2>

      {user.currentSecretSanta ?
        <div>
          <p>You are <strong>Secret Santa for</strong>... 
            <span className='bg-green-100'> {secretSantaFor}</span>
          </p>
          <p>Make sure to buy something nice 🎁</p>
          <button
            className='bg-red-500 text-white text-sm px-2 py-2 rounded mt-4 cursor-pointer'
            onClick={cancelSecretSanta}
            >
              🚨 Cancel Secret Santa
          </button>
        </div> :
        <div>
          <p>You do not have a Secret Santa assigned yet.</p>
          <p>Check back later to see who you will be buying a gift for!</p>
          <button
            className='bg-green-500 text-white px-4 py-2 rounded mt-4 cursor-pointer'
            onClick={asignSecretSantas}
            >
              🎁 Or Asign Secret Santas For All Your Family Now!
          </button>
        </div>
      }

      <FamilyMembersList userFamilyInfo={userFamilyInfo} />

    </section>
  )
}
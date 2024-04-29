"use client"
import { useState } from 'react';
import UserLoginInput from './components/UserLoginInput'
import UserCard from './components/UserCard'

/**
 * The Home component serves as the entry point for the Secret Santa application.
 * It allows users to either log in or view their Secret Santa details based on their state.
 *
 * @returns {JSX.Element} The rendered component structure.
 */
export default function Home() {
  const [ userFamilyInfo, setUserFamilyInfo ] = useState(null);

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <h1 className="text-2xl font-medium text-center">🎅 Your Favorite Secret Santa App</h1>
      <p><em className="text-xl ml-4">🎶 Ho Ho Ho 🎶</em></p>

      {userFamilyInfo ?
        <UserCard userFamilyInfo={userFamilyInfo} setUserFamilyInfo={setUserFamilyInfo} /> :
        <UserLoginInput setUserFamilyInfo={setUserFamilyInfo}/>
      }
      
    </main>
  );
}

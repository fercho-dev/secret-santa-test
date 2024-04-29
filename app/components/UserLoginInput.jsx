"use client";
import { useState } from 'react';

/**
 * UserLoginInput component handles user login via username.
 * It provides an input for username and a button to submit the username.
 *
 * @param {function} setUserFamilyInfo - Function to set user family information in the parent component.
 * @returns {JSX.Element} The rendered user login input form.
 */
export default function UserLoginInput({ setUserFamilyInfo }) {
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  /**
   * Handles the submission of the username to fetch user information.
   * If the fetch is successful and returns data, it sets the user family info.
   * Otherwise, it alerts the user of any errors encountered.
   */
  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/users?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        alert(`Error: ${data.message}`);
      } else {
        setUserFamilyInfo(data);
      }
    } catch (error) {
      alert(`Error: ${error}`)
    }
  };

  return (
    <section className="flex flex-col my-12">
        <input
          className="p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Enter your username..."
          value={username}
          onChange={handleInputChange}
        />
        <p className='text-xs text-gray-500'>👀 Try: user123 or user234</p>
        <button
          className="p-2 mt-4 bg-blue-500 text-white rounded"
          onClick={handleSubmit}
          disabled={!username.trim()}
        >
          Log in
        </button>
      </section>
  )
}
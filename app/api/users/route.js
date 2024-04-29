/**
 * Handles requests for /api/users.
 */
import { NextResponse } from 'next/server';
import UsersService from '../services/Users.service';

/**
 * Handles GET requests for user data.
 * Retrieves the user information if the username is provided and exists.
 * 
 * @param {object} request - The incoming HTTP request.
 * @returns {NextResponse} JSON response with user data or error message.
 */
export async function GET(request) {
  const username = request.nextUrl.searchParams.get('username') || null;
  if (!username) {
    return NextResponse.json({ message: 'username not provided' }, { status: 400 });
  }

  const service = new UsersService(username);

  if(service.validUser()) {
    const user = service.getUserInfo();
    return NextResponse.json(user);
  }

  return NextResponse.json({ message: 'username not found' }, { status: 404 });
}

/**
 * Handles POST requests for performing actions on the user data.
 * Executes a user-specific action and returns the updated user information.
 * 
 * @param {object} request - The incoming HTTP request.
 * @returns {NextResponse} JSON response with updated user data or error message.
 */
export async function POST(request) {
  const username = request.nextUrl.searchParams.get('username') || null;
  const { action } = await request.json()

  if (!username) {
    return NextResponse.json({ message: 'username not provided' }, { status: 400 });
  }

  const service = new UsersService(username);

  if(service.validUser()) {
    const res = service.proccessAction(action);
    if(res.status === 200) {
      const user = service.getUserInfo();
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: res.message }, { status: res.status });
    }
  }

  return NextResponse.json({ message: 'username not found' }, { status: 404 });
}
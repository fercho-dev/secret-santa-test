import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserLoginInput from '../app/components/UserLoginInput'
 
describe('UserInput Component', () => {
  let placeholderText = 'Enter your username...'
  let invalidUser = 'user1'
  let validUser = 'user123'
  let urlTest = '/api/users?username=user123'

  // Mocking fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'Success' }),
    })
  );

  beforeEach(() => {
    render(<UserLoginInput />)
  });
  
  it('renders a Input', () => {
    const input = screen.getByPlaceholderText(placeholderText)
 
    expect(input).toBeInTheDocument()
  })
  it('renders a button', () => {
    const button = screen.getByRole('button', { name: /log in/i })
 
    expect(button).toBeInTheDocument()
  })
  it('button should be disabled when input is empty', () => {
    const button = screen.getByRole('button', { name: /log in/i });

    expect(button).toBeDisabled();
  });
  it('button should be enabled when input is not empty', () => {
    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(input, { target: { value: invalidUser } });
    const button = screen.getByRole('button', { name: /log in/i });
    expect(button).not.toBeDisabled();
  });
  it('should handle user input correctly', () => {
    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(input, { target: { value: validUser } });
    expect(input.value).toBe(validUser);
  });
  it('should submit data correctly', async () => {
    const input = screen.getByPlaceholderText(placeholderText);
    const button = screen.getByRole('button', { name: /log in/i });

    fireEvent.change(input, { target: { value: validUser } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(urlTest, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  });
})
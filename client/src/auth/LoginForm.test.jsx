import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { MemoryRouter } from 'react-router-dom';
import {UserProvider, mockLogin} from '../testUtils';


describe('LoginForm component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <LoginForm />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider >
          <LoginForm />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls login function with correct data when form is submitted', async () => {
    // Ensure mockLogin returns a successful login response
    mockLogin.mockResolvedValue({ success: true });

    render(
      <MemoryRouter>
        <UserProvider >
          <LoginForm />
        </UserProvider>
      </MemoryRouter>
    );

    // Find the input elements
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Find and click the submit button
    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    // Assert that login function is called with correct data
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });
  });

  it('displays errors when login fails', async () => {
    // Mock the login function to return an error
    mockLogin.mockResolvedValueOnce({
      success: false,
      errors: ['Invalid username or password'],
    });

    render(
      <MemoryRouter>
        <UserProvider >
          <LoginForm />
        </UserProvider>
      </MemoryRouter>
    );

    // Find the input elements
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    // Find and click the submit button
    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    // Assert that the error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });
});
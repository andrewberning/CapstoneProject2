import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupForm from "./SignupForm"
import { MemoryRouter } from 'react-router-dom';
import { UserProvider, mockSignup} from "../testUtils";


describe('SignupForm component', () => {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <UserProvider >
          <SignupForm />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider >
          <SignupForm />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls signup function with correct data when form is submitted', async () => {
    // Ensure mockSignup returns a successful signup response
    mockSignup.mockResolvedValue({ success: true});

    render(
      <MemoryRouter>
        <UserProvider >
          <SignupForm />
        </UserProvider>
      </MemoryRouter>
    );

    // Find the input elements
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'testuser123@test.net' } });

    // Find and click the submit button
    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    // Assert that signup function is called with correct data
    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser123@test.net',
      });
    });
  });
});

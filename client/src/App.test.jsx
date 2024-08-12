import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from './App';
import { UserProvider} from "./testUtils";

describe('App', () => {
  it("should render App component", () => {
    const mockUserContextValue = {
      infoLoaded: true,
      logout: vi.fn(),
    };

    render(
      <UserProvider>
        <MemoryRouter value={mockUserContextValue}>
          <App />
        </MemoryRouter>
      </UserProvider>
    );
    
    // Check if the loading message is rendered
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });  
})

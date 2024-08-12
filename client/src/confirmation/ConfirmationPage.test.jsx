import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ConfirmationPage from "./ConfirmationPage"
import { UserProvider } from "../testUtils";

describe('ConfirmationPage component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <ConfirmationPage />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <ConfirmationPage />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
})
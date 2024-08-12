import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserInfo from "./UserInfo";
import { UserProvider } from "../testUtils";

describe('UserInfo component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <UserInfo />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <UserInfo />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
})
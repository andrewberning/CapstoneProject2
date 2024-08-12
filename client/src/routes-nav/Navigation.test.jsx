import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";
import { UserProvider } from "../testUtils";


describe('Navigation component', () => {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <UserProvider >
          <Navigation />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider >
          <Navigation />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot when logged out", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider >
          <Navigation />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartList from "./CartList";
import { UserProvider } from "../testUtils";

describe('CategoriesBanner component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <CartList />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <CartList />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartCard from "./CartCard";
import { UserProvider } from "../testUtils";

describe('CategoriesBanner component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <CartCard />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <CartCard />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
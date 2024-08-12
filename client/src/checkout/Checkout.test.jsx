import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Checkout from "./Checkout";
import { UserProvider } from "../testUtils";

describe('Checkout component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <Checkout />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <Checkout />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
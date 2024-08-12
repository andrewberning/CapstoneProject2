import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductsCardList from "./ProductsCardList";
import { UserProvider } from "../testUtils";


describe('ProductsCardList component', () => {

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <ProductsCardList />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <ProductsCardList />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
})
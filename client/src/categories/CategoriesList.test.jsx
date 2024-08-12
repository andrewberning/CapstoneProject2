import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CategoriesList from "../categories/CategoriesList";
import { UserProvider } from "../testUtils";

describe('CategoriesList component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <CategoriesList />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <CategoriesList />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
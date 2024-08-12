import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CategoriesCardList from "../banner/CategoriesBannerList";
import { UserProvider } from "../testUtils";

describe('CategoriesCardList component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <CategoriesCardList />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <CategoriesCardList />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
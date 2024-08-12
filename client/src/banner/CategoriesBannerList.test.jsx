import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CategoriesBannerList from "./CategoriesBannerList"
import { UserProvider } from "../testUtils";

describe('CategoriesBanner component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <CategoriesBannerList />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <CategoriesBannerList />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
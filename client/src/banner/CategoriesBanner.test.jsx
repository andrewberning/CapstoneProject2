import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CategoriesBanner from "./CategoriesBanner";
import { UserProvider } from "../testUtils";

describe('CategoriesBanner component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <CategoriesBanner />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <CategoriesBanner />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
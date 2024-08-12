import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { UserProvider } from "../testUtils";

describe('CategoryCard component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <CategoryCard />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <CategoryCard />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
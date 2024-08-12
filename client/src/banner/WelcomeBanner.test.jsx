import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WelcomeBanner from "./WelcomeBanner";
import { UserProvider } from "../testUtils";

describe('CategoriesBanner component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <WelcomeBanner />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <WelcomeBanner />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
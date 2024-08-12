import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { UserProvider } from "../testUtils";
// import ShoplyApi from "../api/api";

// Mock the ShoplyApi module
vi.mock("../api/api", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getProduct: vi.fn().mockResolvedValue({
      id: '1',
      name: 'Sample Product',
      description: 'This is a sample product.',
      price: 19.99,
      image_url: 'http://example.com/sample-product.jpg',
    }),
  };
});

describe('ProductDetail component', () => {

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserProvider >
          <ProductDetail />
        </UserProvider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider>
          <ProductDetail />
        </UserProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
})
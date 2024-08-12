import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./auth/UserContext";
import App from "./App";

function AppWrapper() {
  return (
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  );
}

export default AppWrapper;

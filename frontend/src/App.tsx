import AuthContextProvider from "contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Routing from "routes";

/* Styles */
import "./App.css";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;

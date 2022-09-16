import { BrowserRouter } from "react-router-dom";
import Routing from "@routes/index";

/* Styles */
import "antd/dist/antd.less";
import "@fontsource/roboto";
import "@style/App.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};

export default App;

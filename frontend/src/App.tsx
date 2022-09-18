import { BrowserRouter } from "react-router-dom";
import Routing from "routes";

/* Styles */
import "antd/dist/antd.less";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};

export default App;

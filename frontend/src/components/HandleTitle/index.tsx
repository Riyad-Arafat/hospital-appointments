import { useLocation } from "react-router-dom";

export const HandleTitle: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const { pathname } = useLocation();

  const HandleWordShape = (string: string) => {
    var str = string;

    if (str.includes("/portal/")) {
      str = str.replace("/portal/", "");
    }

    let i = str.indexOf("/");

    str = str.replace(/-/g, " ").replace(str.charAt(i), "");
    str = str.replace(str.charAt(0), str.charAt(0).toUpperCase());

    return str;
  };

  let pageName = HandleWordShape(pathname);

  if (pageName === "") document.title = `Hospital`;
  else document.title = pageName + ` | Hospital`;

  return children;
};

export default HandleTitle;
